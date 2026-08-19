package com.sentinel.ai.entity;

import com.sentinel.ai.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "alerts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alert extends BaseEntity {

    @Column(nullable = false)
    private String alertType; // SCREEN_RECORDING, PHONE_DETECTED, MULTIPLE_FACES, SUSPICIOUS_PROCESS

    @Column(nullable = false)
    private String severity;

    private String source;

    @Column(columnDefinition = "TEXT")
    private String message;

    private boolean acknowledged;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
