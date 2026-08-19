package com.sentinel.ai.controller;

import com.sentinel.ai.common.ApiResponse;
import com.sentinel.ai.service.MonitoringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/monitoring")
@RequiredArgsConstructor
public class MonitoringController {

    private final MonitoringService monitoringService;

    @GetMapping("/live-metrics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getLiveSystemMetrics() {
        return ResponseEntity.ok(ApiResponse.success(monitoringService.getLiveSystemMetrics()));
    }

    @PostMapping("/telemetry")
    public ResponseEntity<ApiResponse<String>> ingestTelemetry(@RequestBody Map<String, Object> telemetry) {
        monitoringService.processTelemetryStream(telemetry);
        return ResponseEntity.ok(ApiResponse.success("Telemetry processed", "OK"));
    }
}
