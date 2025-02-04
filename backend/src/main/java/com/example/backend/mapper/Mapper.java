package com.example.backend.mapper;

import com.example.backend.DTO.ChatMessageDTO;
import com.example.backend.model.ChatMessage;
import org.springframework.stereotype.Component;

@Component
public class Mapper {
    public ChatMessageDTO toDto(ChatMessage chatMessage) {
        return new ChatMessageDTO(chatMessage.getId(), chatMessage.getUserId(), chatMessage.getContent(), chatMessage.getTimestamp());
    }

    public ChatMessage toChatMessage(ChatMessageDTO chatMessageDTO) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setId(chatMessageDTO.getId());
        chatMessage.setContent(chatMessageDTO.getContent());
        chatMessage.setUserId(chatMessageDTO.getUserId());
        chatMessage.setTimestamp(chatMessageDTO.getTimestamp());
        return chatMessage;
    }
}