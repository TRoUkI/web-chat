package com.example.backend.controllers;

import com.example.backend.DTO.ChatMessageDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.service.ChatService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@RestController
public class ChatResource {
    private final ChatService chatService;

    private final UserService userService;


    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> allUsers() {
        return ResponseEntity.ok(userService.allUsers());
    }

    @GetMapping("/history")
    public ResponseEntity<List<ChatMessageDTO>> getAllChatMessages() {
        return ResponseEntity.ok(chatService.getHistory());
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessageDTO sendMessage(@RequestBody ChatMessageDTO chatMessageDTO) {
        return chatService.sendMessage(chatMessageDTO);
    }
}
