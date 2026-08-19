package com.sentinel.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PolicyDto {
    private UUID id;
    private String name;
    private String description;
    private String category;
    private boolean enabled;
    private String ruleConfigJson;
    private LocalDateTime createdAt;
}
