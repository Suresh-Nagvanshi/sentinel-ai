package com.sentinel.ai.service.impl;

import com.sentinel.ai.service.MonitoringService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MonitoringServiceImpl implements MonitoringService {

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public Map<String, Object> getLiveSystemMetrics() {
        return Map.of(
                "activeEndpointsMonitored", 1280,
                "screenRecordingThreatsBlocked", 42,
                "mobileDevicesDetected", 19,
                "currentOverallRiskIndex", 14.8,
                "status", "ACTIVE_PROTECTION"
        );
    }

    @Override
    public void processTelemetryStream(Map<String, Object> telemetry) {
        // Broadcast telemetry to websocket connected clients
        messagingTemplate.convertAndSend("/topic/telemetry", telemetry);
    }
}
