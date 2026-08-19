package com.sentinel.ai.controller;

import com.sentinel.ai.common.ApiResponse;
import com.sentinel.ai.dto.AuthRequest;
import com.sentinel.ai.dto.AuthResponse;
import com.sentinel.ai.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.authenticateUser(request);
        return ResponseEntity.ok(ApiResponse.success("Authentication successful", response));
    }
}
