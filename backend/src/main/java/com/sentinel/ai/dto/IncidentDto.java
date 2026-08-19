package com.sentinel.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncidentDto {
    private UUID id;
    private String title;
    private String description;
    private String severity;
    private String status;
    private Double riskScore;
    private String targetedUser;
    private String detectedByEngine;
    private LocalDateTime detectedAt;
    private List<EvidenceDto> evidences;
    private LocalDateTime createdAt;
}
