package com.sentinel.ai.config;

import com.sentinel.ai.entity.Role;
import com.sentinel.ai.entity.User;
import com.sentinel.ai.repository.RoleRepository;
import com.sentinel.ai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataSeederConfig {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${default-admin.email:}")
    private String adminEmail;

    @Value("${default-admin.password:}")
    private String adminPassword;

    @Bean
    CommandLineRunner seedAuthenticationData() {
        return args -> {
            Role admin = role("ADMIN", "Full system access");
            role("SECURITY_OFFICER", "Security monitoring and incident operations");
            role("EMPLOYEE", "Dashboard and own activity access");

            if (adminEmail != null && !adminEmail.isBlank() && adminPassword != null && !adminPassword.isBlank()
                    && userRepository.findByEmail(adminEmail).isEmpty()) {
                String username = adminEmail.substring(0, adminEmail.indexOf('@'));
                userRepository.save(User.builder()
                        .username(username)
                        .email(adminEmail)
                        .passwordHash(passwordEncoder.encode(adminPassword))
                        .firstName("Sentinel")
                        .lastName("Administrator")
                        .active(true)
                        .roles(Set.of(admin))
                        .build());
            }
        };
    }

    private Role role(String name, String description) {
        return roleRepository.findByName(name).orElseGet(() -> roleRepository.save(Role.builder()
                .name(name)
                .description(description)
                .build()));
    }
}