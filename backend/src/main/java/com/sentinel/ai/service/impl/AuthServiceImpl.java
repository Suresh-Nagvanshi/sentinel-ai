package com.sentinel.ai.service.impl;

import com.sentinel.ai.dto.AuthRequest;
import com.sentinel.ai.dto.AuthResponse;
import com.sentinel.ai.security.JwtTokenProvider;
import com.sentinel.ai.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtTokenProvider tokenProvider;

    @Override
    public AuthResponse authenticateUser(AuthRequest request) {
        // Placeholder authentication logic returning JWT token
        String token = tokenProvider.generateToken(request.getUsername());
        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .username(request.getUsername())
                .email(request.getUsername() + "@sentinel.ai")
                .roles(Set.of("ROLE_ADMIN", "ROLE_ANALYST"))
                .build();
    }
}
