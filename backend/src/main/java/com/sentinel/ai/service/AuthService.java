package com.sentinel.ai.service;

import com.sentinel.ai.dto.AuthRequest;
import com.sentinel.ai.dto.AuthResponse;

public interface AuthService {
    AuthResponse authenticateUser(AuthRequest request);
}
