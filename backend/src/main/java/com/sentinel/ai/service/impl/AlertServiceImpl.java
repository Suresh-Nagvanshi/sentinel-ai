package com.sentinel.ai.service.impl;

import com.sentinel.ai.dto.AlertDto;
import com.sentinel.ai.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService {

    @Override
    public List<AlertDto> getUnacknowledgedAlerts() {
        return List.of(
                AlertDto.builder()
                        .id(UUID.randomUUID())
                        .alertType("SCREEN_RECORDING")
                        .severity("CRITICAL")
                        .source("AI Engine v1.0")
                        .message("High risk: Active Camtasia screen recorder process hooked into display driver.")
                        .acknowledged(false)
                        .username("john.doe")
                        .createdAt(LocalDateTime.now().minusMinutes(3))
                        .build(),
                AlertDto.builder()
                        .alertType("MULTIPLE_FACES")
                        .severity("MEDIUM")
                        .source("MediaPipe Observer Monitor")
                        .message("Secondary face identified behind workstation seat.")
                        .acknowledged(false)
                        .username("alice.smith")
                        .createdAt(LocalDateTime.now().minusMinutes(15))
                        .build()
        );
    }

    @Override
    public AlertDto acknowledgeAlert(UUID id) {
        return AlertDto.builder()
                .id(id)
                .alertType("SCREEN_RECORDING")
                .severity("CRITICAL")
                .source("AI Engine v1.0")
                .message("High risk: Active Camtasia screen recorder process hooked into display driver.")
                .acknowledged(true)
                .username("john.doe")
                .createdAt(LocalDateTime.now())
                .build();
    }
}
