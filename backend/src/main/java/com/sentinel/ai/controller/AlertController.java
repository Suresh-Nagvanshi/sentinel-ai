package com.sentinel.ai.controller;

import com.sentinel.ai.common.ApiResponse;
import com.sentinel.ai.dto.AlertDto;
import com.sentinel.ai.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AlertDto>>> getUnacknowledgedAlerts() {
        return ResponseEntity.ok(ApiResponse.success(alertService.getUnacknowledgedAlerts()));
    }

    @PutMapping("/{id}/acknowledge")
    public ResponseEntity<ApiResponse<AlertDto>> acknowledgeAlert(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Alert acknowledged", alertService.acknowledgeAlert(id)));
    }
}
