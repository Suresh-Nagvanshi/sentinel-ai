package com.sentinel.ai.controller;

import com.sentinel.ai.common.ApiResponse;
import com.sentinel.ai.dto.PolicyDto;
import com.sentinel.ai.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/policies")
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PolicyDto>>> getAllPolicies() {
        return ResponseEntity.ok(ApiResponse.success(policyService.getAllPolicies()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PolicyDto>> getPolicyById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(policyService.getPolicyById(id)));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<ApiResponse<PolicyDto>> togglePolicy(
            @PathVariable UUID id,
            @RequestParam boolean enabled) {
        return ResponseEntity.ok(ApiResponse.success("Policy state updated", policyService.togglePolicy(id, enabled)));
    }
}
