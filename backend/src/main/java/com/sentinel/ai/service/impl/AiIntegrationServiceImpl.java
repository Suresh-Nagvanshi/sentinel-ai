package com.sentinel.ai.service.impl;

import com.sentinel.ai.service.AiIntegrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiIntegrationServiceImpl implements AiIntegrationService {

    @Value("${ai-engine.url}")
    private String aiEngineUrl;

    @Override
    public Map<String, Object> analyzeTelemetryWithAi(Map<String, Object> requestData) {
        // Placeholder REST communication with Python FastAPI AI Engine
        return Map.of(
                "aiEngineStatus", "CONNECTED",
                "targetUrl", aiEngineUrl + "/risk-score",
                "evaluatedRiskScore", 88.5,
                "recommendation", "ISOLATE_SESSION"
        );
    }
}
