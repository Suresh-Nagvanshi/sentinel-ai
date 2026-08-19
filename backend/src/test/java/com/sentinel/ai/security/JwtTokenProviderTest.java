package com.sentinel.ai.security;

import com.sentinel.ai.entity.Role;
import com.sentinel.ai.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class JwtTokenProviderTest {

    private JwtTokenProvider tokenProvider;

    @BeforeEach
    void setUp() {
        tokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(tokenProvider, "jwtSecret", "a-long-development-secret-that-is-at-least-256-bits-long");
        ReflectionTestUtils.setField(tokenProvider, "accessExpirationMs", 900000L);
    }

    @Test
    void generatesAndValidatesAccessTokenWithUserClaims() {
        User user = User.builder()
                .username("admin")
                .email("admin@sentinelai.local")
                .roles(Set.of(Role.builder().name("ADMIN").build()))
                .build();
        user.setId(UUID.randomUUID());

        String token = tokenProvider.generateAccessToken(user);

        assertThat(tokenProvider.validateToken(token)).isTrue();
        assertThat(tokenProvider.getUsernameFromJWT(token)).isEqualTo("admin");
        assertThat(tokenProvider.getAccessExpirationSeconds()).isEqualTo(900);
    }

    @Test
    void rejectsMalformedToken() {
        assertThat(tokenProvider.validateToken("not-a-jwt")).isFalse();
    }
}
