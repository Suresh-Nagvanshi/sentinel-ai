package com.sentinel.ai.service;

import com.sentinel.ai.dto.EvidenceDto;

import java.util.List;
import java.util.UUID;

public interface EvidenceService {
    List<EvidenceDto> getEvidencesByIncidentId(UUID incidentId);
    EvidenceDto uploadEvidence(EvidenceDto evidenceDto);
}
