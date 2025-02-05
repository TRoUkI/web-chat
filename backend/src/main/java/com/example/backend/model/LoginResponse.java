package com.example.backend.model;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private long expiresIn;
    private Integer id;
}
