package com.sentinel.ai.service;

import java.util.Map;

public interface AiIntegrationService {
    Map<String, Object> analyzeTelemetryWithAi(Map<String, Object> requestData);
}
