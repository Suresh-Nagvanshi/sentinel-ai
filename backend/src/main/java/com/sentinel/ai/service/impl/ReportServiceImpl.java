package com.sentinel.ai.service.impl;

import com.sentinel.ai.dto.ReportDto;
import com.sentinel.ai.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    @Override
    public List<ReportDto> getAllReports() {
        return List.of(
                ReportDto.builder()
                        .id(UUID.randomUUID())
                        .title("Weekly Insider Threat Audit Report")
                        .type("EXECUTIVE_SUMMARY")
                        .generatedBy("System Audit Scheduler")
                        .downloadUrl("/api/v1/reports/downloads/rpt_weekly_01.pdf")
                        .summaryText("Total 14 incidents recorded. 2 critical process recording attempts blocked.")
                        .createdAt(LocalDateTime.now().minusDays(2))
                        .build()
        );
    }

    @Override
    public ReportDto generateReport(String type) {
        return ReportDto.builder()
                .id(UUID.randomUUID())
                .title("On-Demand " + type + " Security Assessment")
                .type(type)
                .generatedBy("Current User")
                .downloadUrl("/api/v1/reports/downloads/rpt_ondemand.pdf")
                .summaryText("On-demand report generated successfully.")
                .createdAt(LocalDateTime.now())
                .build();
    }
}
