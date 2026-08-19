package com.sentinel.ai.entity;

import com.sentinel.ai.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "policies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Policy extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String category; // SCREEN_SECURITY, PROCESS_BLACK_LIST, WEBCAM_RULES, OCR_RULES

    @Builder.Default
    private boolean enabled = true;

    @Column(columnDefinition = "TEXT")
    private String ruleConfigJson;
}
