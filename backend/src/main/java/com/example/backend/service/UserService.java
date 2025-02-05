package com.example.backend.service;

import com.example.backend.DTO.UserDTO;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public List<UserDTO> allUsers() {
        return userRepository.getUserWithoutPassword();
    }
}