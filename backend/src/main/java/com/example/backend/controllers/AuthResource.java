package com.example.backend.controllers;

import com.example.backend.DTO.AuthUserDTO;
import com.example.backend.model.LoginResponse;
import com.example.backend.model.User;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.ChatService;
import com.example.backend.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthResource {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final ChatService chatService;

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody AuthUserDTO registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        chatService.sendSystemMessage(registerUserDto.getUsername() + " registered in the chat");

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody AuthUserDTO authUserDto) {
        User authenticatedUser = authenticationService.authenticate(authUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setId(authenticatedUser.getId());

        chatService.sendSystemMessage(authenticatedUser.getUsername() + " has joined the chat");

        return ResponseEntity.ok(loginResponse);
    }
}
