package com.example.backend.service;

import com.example.backend.DTO.ChatMessageDTO;
import com.example.backend.mapper.Mapper;
import com.example.backend.model.ChatMessage;
import com.example.backend.repository.ChatMessageRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final Mapper mapper;
    private final SimpMessagingTemplate messagingTemplate;

    public List<ChatMessageDTO> getHistory(){
        List<ChatMessage> messages = chatMessageRepository.findLast50Messages();
        log.info("getAllMessages:: messages retrieved: {}", messages.size());
        return messages.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    public ChatMessageDTO sendMessage(ChatMessageDTO chatMessageDTO){
        return mapper.toDto(chatMessageRepository.save(mapper.toChatMessage(chatMessageDTO)));
    }

    public void sendSystemMessage(String str){
        messagingTemplate.convertAndSend("/topic/systemMessage", new ChatMessageDTO(str, new Date()));
    }
}
