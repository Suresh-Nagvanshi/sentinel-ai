package com.sentinel.ai.service.impl;

import com.sentinel.ai.dto.EvidenceDto;
import com.sentinel.ai.service.EvidenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EvidenceServiceImpl implements EvidenceService {

    @Override
    public List<EvidenceDto> getEvidencesByIncidentId(UUID incidentId) {
        return List.of(
                EvidenceDto.builder()
                        .id(UUID.randomUUID())
                        .fileType("SCREENSHOT")
                        .fileUrl("/storage/evidences/scr_frame_1.png")
                        .fileHash("a1b2c3d4e5f67890")
                        .metadataJson("{\"resolution\": \"1920x1080\", \"activeProcess\": \"obs.exe\"}")
                        .incidentId(incidentId)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
    }

    @Override
    public EvidenceDto uploadEvidence(EvidenceDto evidenceDto) {
        evidenceDto.setId(UUID.randomUUID());
        evidenceDto.setCreatedAt(LocalDateTime.now());
        return evidenceDto;
    }
}
