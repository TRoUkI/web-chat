package com.example.backend.service;

import com.example.backend.DTO.ChatMessageDTO;
import com.example.backend.mapper.Mapper;
import com.example.backend.model.ChatMessage;
import com.example.backend.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final Mapper mapper;

    public List<ChatMessageDTO> getAllMessages(){
        List<ChatMessage> messages = chatMessageRepository.findAll();
        log.info("getAllMessages:: messages retrieved: {}", messages.size());
        return messages.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    public void deleteById(Long id){
        chatMessageRepository.deleteById(id);
    }

    public ChatMessageDTO sendMessage(ChatMessageDTO chatMessageDTO){
        return mapper.toDto(chatMessageRepository.save(mapper.toChatMessage(chatMessageDTO)));
    }
}
