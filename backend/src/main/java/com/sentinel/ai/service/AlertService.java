package com.sentinel.ai.service;

import com.sentinel.ai.dto.AlertDto;

import java.util.List;
import java.util.UUID;

public interface AlertService {
    List<AlertDto> getUnacknowledgedAlerts();
    AlertDto acknowledgeAlert(UUID id);
}
