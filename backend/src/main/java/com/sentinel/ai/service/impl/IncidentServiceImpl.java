package com.sentinel.ai.service.impl;

import com.sentinel.ai.common.PageResponse;
import com.sentinel.ai.dto.EvidenceDto;
import com.sentinel.ai.dto.IncidentDto;
import com.sentinel.ai.service.IncidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IncidentServiceImpl implements IncidentService {

    @Override
    public PageResponse<IncidentDto> getIncidents(int page, int size, String severity, String status) {
        List<IncidentDto> sampleList = List.of(
                IncidentDto.builder()
                        .id(UUID.randomUUID())
                        .title("Unauthorized Screen Recording (OBS Detected)")
                        .description("OBS Studio executable detected while user accessed classified financial report.")
                        .severity("CRITICAL")
                        .status("OPEN")
                        .riskScore(94.5)
                        .targetedUser("john.doe")
                        .detectedByEngine("ProcessMonitorEngine")
                        .detectedAt(LocalDateTime.now().minusMinutes(12))
                        .evidences(List.of(
                                EvidenceDto.builder()
                                        .id(UUID.randomUUID())
                                        .fileType("SCREENSHOT")
                                        .fileUrl("/evidences/scr_9912.png")
                                        .fileHash("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
                                        .createdAt(LocalDateTime.now().minusMinutes(12))
                                        .build()
                        ))
                        .createdAt(LocalDateTime.now().minusMinutes(12))
                        .build(),
                IncidentDto.builder()
                        .id(UUID.randomUUID())
                        .title("External Camera / Mobile Device in Frame")
                        .description("YOLOv8 detected smartphone camera lens pointed at workstation display.")
                        .severity("HIGH")
                        .status("UNDER_INVESTIGATION")
                        .riskScore(82.0)
                        .targetedUser("alice.smith")
                        .detectedByEngine("YoloObjectDetectionEngine")
                        .detectedAt(LocalDateTime.now().minusHours(2))
                        .evidences(List.of())
                        .createdAt(LocalDateTime.now().minusHours(2))
                        .build()
        );

        return PageResponse.<IncidentDto>builder()
                .content(sampleList)
                .pageNumber(page)
                .pageSize(size)
                .totalElements(2)
                .totalPages(1)
                .last(true)
                .build();
    }

    @Override
    public IncidentDto getIncidentById(UUID id) {
        return IncidentDto.builder()
                .id(id)
                .title("Unauthorized Screen Recording (OBS Detected)")
                .description("OBS Studio executable detected while user accessed classified financial report.")
                .severity("CRITICAL")
                .status("OPEN")
                .riskScore(94.5)
                .targetedUser("john.doe")
                .detectedByEngine("ProcessMonitorEngine")
                .detectedAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Override
    public IncidentDto createIncident(IncidentDto incidentDto) {
        incidentDto.setId(UUID.randomUUID());
        incidentDto.setCreatedAt(LocalDateTime.now());
        return incidentDto;
    }
}
