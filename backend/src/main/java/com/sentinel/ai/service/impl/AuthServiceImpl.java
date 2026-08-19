package com.sentinel.ai.service.impl;

import com.sentinel.ai.dto.*;
import com.sentinel.ai.entity.ActivityLog;
import com.sentinel.ai.entity.RefreshToken;
import com.sentinel.ai.entity.Role;
import com.sentinel.ai.entity.User;
import com.sentinel.ai.exception.UnauthorizedException;
import com.sentinel.ai.repository.ActivityLogRepository;
import com.sentinel.ai.repository.RefreshTokenRepository;
import com.sentinel.ai.repository.UserRepository;
import com.sentinel.ai.security.JwtTokenProvider;
import com.sentinel.ai.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HexFormat;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final ActivityLogRepository activityLogRepository;
    private final JwtTokenProvider tokenProvider;

    @Value("${jwt.refresh-expiration:604800000}")
    private long refreshExpirationMs;

    @Override
    @Transactional
    public AuthResponse authenticateUser(AuthRequest request, HttpServletRequest httpRequest) {
        User candidate = userRepository.findByEmail(request.getEmail()).orElse(null);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException exception) {
                record(candidate, candidate != null && !candidate.isActive() ? "ACCOUNT_DISABLED" : "LOGIN_FAILURE", false, httpRequest,
                    candidate != null && !candidate.isActive() ? "Account is disabled" : "Invalid email or password");
            throw new BadCredentialsException("Invalid email or password");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        String refreshToken = createRefreshToken(user);
        record(user, "LOGIN_SUCCESS", true, httpRequest, null);
        return response(user, refreshToken);
    }

    @Override
    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request, HttpServletRequest httpRequest) {
        RefreshToken stored = refreshTokenRepository.findByTokenHash(hash(request.getRefreshToken()))
                .filter(token -> !token.isRevoked())
                .filter(token -> token.getExpiresAt().isAfter(LocalDateTime.now()))
                .orElseThrow(() -> new UnauthorizedException("Invalid or expired refresh token"));
        User user = stored.getUser();
        if (!user.isActive()) {
            record(user, "ACCOUNT_DISABLED", false, httpRequest, "Account is disabled");
            throw new UnauthorizedException("Account is disabled");
        }
        stored.setRevoked(true);
        refreshTokenRepository.save(stored);
        String replacement = createRefreshToken(user);
        record(user, "TOKEN_REFRESH", true, httpRequest, null);
        return response(user, replacement);
    }

    @Override
    @Transactional
    public void logout(LogoutRequest request, HttpServletRequest httpRequest) {
        refreshTokenRepository.findByTokenHash(hash(request.getRefreshToken())).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
            record(token.getUser(), "LOGOUT", true, httpRequest, null);
        });
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileDto getCurrentUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));
        return profile(user);
    }

    private String createRefreshToken(User user) {
        String raw = UUID.randomUUID() + "." + UUID.randomUUID();
        refreshTokenRepository.save(RefreshToken.builder()
                .tokenHash(hash(raw))
                .user(user)
                .expiresAt(LocalDateTime.now().plusNanos(refreshExpirationMs * 1_000_000))
                .build());
        return raw;
    }

    private AuthResponse response(User user, String refreshToken) {
        return AuthResponse.builder()
                .accessToken(tokenProvider.generateAccessToken(user))
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(tokenProvider.getAccessExpirationSeconds())
                .user(profile(user))
                .build();
    }

    private UserProfileDto profile(User user) {
        return UserProfileDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRoles().stream().findFirst().map(Role::getName).orElse("EMPLOYEE"))
                .active(user.isActive())
                .build();
    }

    private void record(User user, String eventType, boolean success, HttpServletRequest request, String reason) {
        activityLogRepository.save(ActivityLog.builder()
                .userId(user == null ? null : user.getId().toString())
                .action(eventType)
                .eventType(eventType)
                .success(success)
                .ipAddress(request == null ? null : request.getRemoteAddr())
                .userAgent(request == null ? null : request.getHeader("User-Agent"))
                .reason(reason)
                .resource("AUTHENTICATION")
                .details(reason)
                .build());
    }

    private String hash(String value) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 is unavailable", exception);
        }
    }
}
