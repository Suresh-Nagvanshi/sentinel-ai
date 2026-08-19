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
public class AlertDto {
    private UUID id;
    private String alertType;
    private String severity;
    private String source;
    private String message;
    private boolean acknowledged;
    private String username;
    private LocalDateTime createdAt;
}
