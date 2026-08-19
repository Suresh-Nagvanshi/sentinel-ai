package com.sentinel.ai.controller;

import com.sentinel.ai.common.ApiResponse;
import com.sentinel.ai.dto.EvidenceDto;
import com.sentinel.ai.service.EvidenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/evidences")
@RequiredArgsConstructor
public class EvidenceController {

    private final EvidenceService evidenceService;

    @GetMapping("/incident/{incidentId}")
    public ResponseEntity<ApiResponse<List<EvidenceDto>>> getEvidencesByIncident(@PathVariable UUID incidentId) {
        return ResponseEntity.ok(ApiResponse.success(evidenceService.getEvidencesByIncidentId(incidentId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EvidenceDto>> uploadEvidence(@RequestBody EvidenceDto evidenceDto) {
        return ResponseEntity.ok(ApiResponse.success("Evidence logged", evidenceService.uploadEvidence(evidenceDto)));
    }
}
