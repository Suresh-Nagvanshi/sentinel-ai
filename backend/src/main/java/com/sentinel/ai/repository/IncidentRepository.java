package com.sentinel.ai.repository;

import com.sentinel.ai.entity.Incident;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, UUID> {
    Page<Incident> findByStatus(String status, Pageable pageable);
    Page<Incident> findBySeverity(String severity, Pageable pageable);
}
