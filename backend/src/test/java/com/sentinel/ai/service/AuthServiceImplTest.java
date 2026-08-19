package com.sentinel.ai.service;

import com.sentinel.ai.dto.AuthRequest;
import com.sentinel.ai.dto.AuthResponse;
import com.sentinel.ai.dto.LogoutRequest;
import com.sentinel.ai.dto.RefreshTokenRequest;
import com.sentinel.ai.entity.RefreshToken;
import com.sentinel.ai.entity.Role;
import com.sentinel.ai.entity.User;
import com.sentinel.ai.repository.ActivityLogRepository;
import com.sentinel.ai.repository.RefreshTokenRepository;
import com.sentinel.ai.repository.UserRepository;
import com.sentinel.ai.security.JwtTokenProvider;
import com.sentinel.ai.service.impl.AuthServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock AuthenticationManager authenticationManager;
    @Mock UserRepository userRepository;
    @Mock RefreshTokenRepository refreshTokenRepository;
    @Mock ActivityLogRepository activityLogRepository;
    @Mock JwtTokenProvider tokenProvider;
    @Mock HttpServletRequest httpRequest;
    @InjectMocks AuthServiceImpl authService;

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .username("admin")
                .email("admin@sentinelai.local")
                .passwordHash("$2a$10$hash")
                .firstName("Sentinel")
                .lastName("Admin")
                .roles(Set.of(Role.builder().name("ADMIN").build()))
                .active(true)
                .build();
        user.setId(UUID.randomUUID());
    }

    @Test
    void successfulLoginUpdatesLastLoginAndReturnsBothTokens() {
        AuthRequest request = new AuthRequest(user.getEmail(), "correct-password");
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(tokenProvider.generateAccessToken(user)).thenReturn("access-token");
        when(tokenProvider.getAccessExpirationSeconds()).thenReturn(900L);
        when(refreshTokenRepository.save(any(RefreshToken.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AuthResponse response = authService.authenticateUser(request, httpRequest);

        assertThat(response.getAccessToken()).isEqualTo("access-token");
        assertThat(response.getRefreshToken()).isNotBlank();
        assertThat(response.getExpiresIn()).isEqualTo(900);
        assertThat(user.getLastLogin()).isNotNull();
        verify(activityLogRepository, atLeastOnce()).save(any());
    }

    @Test
    void invalidPasswordUsesGenericUnauthorizedErrorAndRecordsFailure() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        doThrow(new BadCredentialsException("bad")).when(authenticationManager).authenticate(any());

        assertThatThrownBy(() -> authService.authenticateUser(new AuthRequest(user.getEmail(), "wrong"), httpRequest))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("Invalid email or password");
        verify(activityLogRepository).save(argThat(log -> "LOGIN_FAILURE".equals(log.getEventType()) && !log.isSuccess()));
    }

    @Test
    void unknownUserUsesTheSameGenericUnauthorizedError() {
        when(userRepository.findByEmail("unknown@sentinelai.local")).thenReturn(Optional.empty());
        doThrow(new BadCredentialsException("bad")).when(authenticationManager).authenticate(any());

        assertThatThrownBy(() -> authService.authenticateUser(new AuthRequest("unknown@sentinelai.local", "wrong"), httpRequest))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("Invalid email or password");
        verify(activityLogRepository).save(argThat(log -> "LOGIN_FAILURE".equals(log.getEventType()) && !log.isSuccess()));
    }

    @Test
    void disabledUserUsesGenericUnauthorizedErrorAndRecordsAccountDisabled() {
        user.setActive(false);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        doThrow(new BadCredentialsException("disabled")).when(authenticationManager).authenticate(any());

        assertThatThrownBy(() -> authService.authenticateUser(new AuthRequest(user.getEmail(), "correct"), httpRequest))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("Invalid email or password");
        verify(activityLogRepository).save(argThat(log -> "ACCOUNT_DISABLED".equals(log.getEventType()) && !log.isSuccess()));
    }

    @Test
    void currentUserReturnsSafeProfile() {
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));

        var profile = authService.getCurrentUser(user.getUsername());

        assertThat(profile.getId()).isEqualTo(user.getId());
        assertThat(profile.getEmail()).isEqualTo(user.getEmail());
        assertThat(profile.getRole()).isEqualTo("ADMIN");
    }

    @Test
    void refreshRotatesAndRevokesStoredToken() {
        RefreshToken stored = RefreshToken.builder()
                .tokenHash("hash")
                .user(user)
                .expiresAt(LocalDateTime.now().plusDays(1))
                .revoked(false)
                .build();
        RefreshTokenRequest request = new RefreshTokenRequest();
        request.setRefreshToken("refresh-token");
        when(refreshTokenRepository.findByTokenHash(any())).thenReturn(Optional.of(stored));
        when(refreshTokenRepository.save(any(RefreshToken.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AuthResponse response = authService.refreshToken(request, httpRequest);

        assertThat(stored.isRevoked()).isTrue();
        assertThat(response.getRefreshToken()).isNotBlank();
        verify(activityLogRepository).save(argThat(log -> "TOKEN_REFRESH".equals(log.getEventType()) && log.isSuccess()));
    }

    @Test
    void logoutRevokesStoredToken() {
        RefreshToken stored = RefreshToken.builder().user(user).revoked(false).build();
        LogoutRequest request = new LogoutRequest();
        request.setRefreshToken("refresh-token");
        when(refreshTokenRepository.findByTokenHash(any())).thenReturn(Optional.of(stored));
        when(refreshTokenRepository.save(any(RefreshToken.class))).thenAnswer(invocation -> invocation.getArgument(0));

        authService.logout(request, httpRequest);

        assertThat(stored.isRevoked()).isTrue();
        verify(activityLogRepository).save(argThat(log -> "LOGOUT".equals(log.getEventType())));
    }
}
