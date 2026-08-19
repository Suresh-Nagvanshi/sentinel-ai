package com.sentinel.ai.entity;

import com.sentinel.ai.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "activity_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLog extends BaseEntity {

    private String userId;

    private String action;

    private String eventType;

    private boolean success;

    private String resource;

    private String ipAddress;

    private String userAgent;

    private String reason;

    @Column(columnDefinition = "TEXT")
    private String details;
}
