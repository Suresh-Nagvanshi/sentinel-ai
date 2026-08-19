package com.sentinel.ai.controller;

import com.sentinel.ai.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    @GetMapping("/incident-trends")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getIncidentTrends() {
        List<Map<String, Object>> trends = List.of(
                Map.of("day", "Mon", "critical", 4, "high", 8, "medium", 12),
                Map.of("day", "Tue", "critical", 2, "high", 5, "medium", 9),
                Map.of("day", "Wed", "critical", 7, "high", 11, "medium", 14),
                Map.of("day", "Thu", "critical", 3, "high", 6, "medium", 10),
                Map.of("day", "Fri", "critical", 9, "high", 15, "medium", 20),
                Map.of("day", "Sat", "critical", 1, "high", 2, "medium", 4),
                Map.of("day", "Sun", "critical", 0, "high", 1, "medium", 3)
        );
        return ResponseEntity.ok(ApiResponse.success(trends));
    }

    @GetMapping("/risk-distribution")
    public ResponseEntity<ApiResponse<Map<String, Integer>>> getRiskDistribution() {
        return ResponseEntity.ok(ApiResponse.success(Map.of(
                "CRITICAL", 8,
                "HIGH", 24,
                "MEDIUM", 45,
                "LOW", 120
        )));
    }
}
