package com.sentinel.ai.entity;

import com.sentinel.ai.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report extends BaseEntity {

    @Column(nullable = false)
    private String title;

    private String type; // EXECUTIVE_SUMMARY, INCIDENT_DENSITY, USER_RISK_AUDIT

    private String generatedBy;

    private String downloadUrl;

    @Column(columnDefinition = "TEXT")
    private String summaryText;
}
