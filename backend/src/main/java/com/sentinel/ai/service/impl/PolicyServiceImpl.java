package com.sentinel.ai.service.impl;

import com.sentinel.ai.dto.PolicyDto;
import com.sentinel.ai.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PolicyServiceImpl implements PolicyService {

    @Override
    public List<PolicyDto> getAllPolicies() {
        return List.of(
                PolicyDto.builder()
                        .id(UUID.randomUUID())
                        .name("Zero Screen Recording Enforcement")
                        .description("Block and report any screen recording software process execution.")
                        .category("SCREEN_SECURITY")
                        .enabled(true)
                        .ruleConfigJson("{\"blockOnDetect\": true, \"terminateProcess\": true}")
                        .createdAt(LocalDateTime.now().minusDays(10))
                        .build(),
                PolicyDto.builder()
                        .id(UUID.randomUUID())
                        .name("Mobile Camera Frame Detection")
                        .description("Flag any smartphone optical lens pointing at active monitor.")
                        .category("WEBCAM_RULES")
                        .enabled(true)
                        .ruleConfigJson("{\"yoloConfidenceThreshold\": 0.80}")
                        .createdAt(LocalDateTime.now().minusDays(5))
                        .build()
        );
    }

    @Override
    public PolicyDto getPolicyById(UUID id) {
        return PolicyDto.builder()
                .id(id)
                .name("Zero Screen Recording Enforcement")
                .description("Block and report any screen recording software process execution.")
                .category("SCREEN_SECURITY")
                .enabled(true)
                .ruleConfigJson("{\"blockOnDetect\": true}")
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Override
    public PolicyDto togglePolicy(UUID id, boolean enabled) {
        return PolicyDto.builder()
                .id(id)
                .name("Zero Screen Recording Enforcement")
                .description("Block and report any screen recording software process execution.")
                .category("SCREEN_SECURITY")
                .enabled(enabled)
                .ruleConfigJson("{\"blockOnDetect\": true}")
                .createdAt(LocalDateTime.now())
                .build();
    }
}
