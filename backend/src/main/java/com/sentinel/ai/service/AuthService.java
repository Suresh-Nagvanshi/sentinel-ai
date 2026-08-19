package com.sentinel.ai.service;

import com.sentinel.ai.dto.AuthRequest;
import com.sentinel.ai.dto.AuthResponse;
import com.sentinel.ai.dto.LogoutRequest;
import com.sentinel.ai.dto.RefreshTokenRequest;
import com.sentinel.ai.dto.UserProfileDto;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {
    AuthResponse authenticateUser(AuthRequest request, HttpServletRequest httpRequest);
    AuthResponse refreshToken(RefreshTokenRequest request, HttpServletRequest httpRequest);
    void logout(LogoutRequest request, HttpServletRequest httpRequest);
    UserProfileDto getCurrentUser(String username);
}
