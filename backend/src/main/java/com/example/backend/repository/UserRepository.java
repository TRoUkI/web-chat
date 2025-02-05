package com.example.backend.repository;

import com.example.backend.DTO.UserDTO;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> getByUsername(String username);

    @Query("SELECT new com.example.backend.DTO.UserDTO(u.id, u.username) FROM User u")
    List<UserDTO> getUserWithoutPassword();
}
