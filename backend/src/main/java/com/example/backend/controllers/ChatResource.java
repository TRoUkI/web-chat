package com.example.backend.controllers;

import com.example.backend.DTO.ChatMessageDTO;
import com.example.backend.model.User;
import com.example.backend.service.ChatService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ChatResource {
    private final ChatService chatService;

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/allMessages")
    public ResponseEntity<List<ChatMessageDTO>> getAllChatMessages() {
        return ResponseEntity.ok(chatService.getAllMessages());
    }

    @MessageMapping("/sendMessage") // Endpoint for receiving messages
    @SendTo("/messages")
    public ChatMessageDTO sendMessage(@RequestBody ChatMessageDTO chatMessageDTO) {
        return chatService.sendMessage(chatMessageDTO);
    }
}
