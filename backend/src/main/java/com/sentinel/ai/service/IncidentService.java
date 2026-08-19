package com.sentinel.ai.service;

import com.sentinel.ai.dto.IncidentDto;
import com.sentinel.ai.common.PageResponse;

import java.util.UUID;

public interface IncidentService {
    PageResponse<IncidentDto> getIncidents(int page, int size, String severity, String status);
    IncidentDto getIncidentById(UUID id);
    IncidentDto createIncident(IncidentDto incidentDto);
}
