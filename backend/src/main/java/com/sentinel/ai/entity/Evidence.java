package com.sentinel.ai.entity;

import com.sentinel.ai.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "evidences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Evidence extends BaseEntity {

    @Column(nullable = false)
    private String fileType; // SCREENSHOT, WEBCAM_FRAME, PROCESS_LOG, OCR_TEXT

    @Column(nullable = false)
    private String fileUrl;

    private String fileHash;

    @Column(columnDefinition = "TEXT")
    private String metadataJson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "incident_id")
    private Incident incident;
}
