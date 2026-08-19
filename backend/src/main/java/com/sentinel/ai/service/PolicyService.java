package com.sentinel.ai.service;

import com.sentinel.ai.dto.PolicyDto;

import java.util.List;
import java.util.UUID;

public interface PolicyService {
    List<PolicyDto> getAllPolicies();
    PolicyDto getPolicyById(UUID id);
    PolicyDto togglePolicy(UUID id, boolean enabled);
}
