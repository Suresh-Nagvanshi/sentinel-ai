package com.sentinel.ai.controller;

import com.sentinel.ai.common.ApiResponse;
import com.sentinel.ai.dto.ReportDto;
import com.sentinel.ai.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ReportDto>>> getAllReports() {
        return ResponseEntity.ok(ApiResponse.success(reportService.getAllReports()));
    }

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<ReportDto>> generateReport(@RequestParam(defaultValue = "EXECUTIVE_SUMMARY") String type) {
        return ResponseEntity.ok(ApiResponse.success("Report generated", reportService.generateReport(type)));
    }
}
