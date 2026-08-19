package com.sentinel.ai.service;

import com.sentinel.ai.dto.ReportDto;

import java.util.List;
import java.util.UUID;

public interface ReportService {
    List<ReportDto> getAllReports();
    ReportDto generateReport(String type);
}
