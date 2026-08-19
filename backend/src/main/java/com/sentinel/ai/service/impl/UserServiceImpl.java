package com.sentinel.ai.service.impl;

import com.sentinel.ai.dto.UserDto;
import com.sentinel.ai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Override
    public List<UserDto> getAllUsers() {
        return List.of(
                UserDto.builder()
                        .id(UUID.randomUUID())
                        .username("security_admin")
                        .email("admin@sentinel.ai")
                        .fullName("Security Administrator")
                        .department("Cyber Security")
                        .active(true)
                        .roles(Set.of("ROLE_ADMIN"))
                        .createdAt(LocalDateTime.now().minusDays(30))
                        .build(),
                UserDto.builder()
                        .id(UUID.randomUUID())
                        .username("threat_analyst")
                        .email("analyst@sentinel.ai")
                        .fullName("SOC Analyst")
                        .department("Threat Intelligence")
                        .active(true)
                        .roles(Set.of("ROLE_ANALYST"))
                        .createdAt(LocalDateTime.now().minusDays(15))
                        .build()
        );
    }

    @Override
    public UserDto getUserById(UUID id) {
        return UserDto.builder()
                .id(id)
                .username("security_admin")
                .email("admin@sentinel.ai")
                .fullName("Security Administrator")
                .department("Cyber Security")
                .active(true)
                .roles(Set.of("ROLE_ADMIN"))
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        userDto.setId(UUID.randomUUID());
        userDto.setCreatedAt(LocalDateTime.now());
        return userDto;
    }
}
