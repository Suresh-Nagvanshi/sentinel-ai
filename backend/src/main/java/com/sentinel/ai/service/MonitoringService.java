package com.sentinel.ai.service;

import java.util.Map;

public interface MonitoringService {
    Map<String, Object> getLiveSystemMetrics();
    void processTelemetryStream(Map<String, Object> telemetry);
}
