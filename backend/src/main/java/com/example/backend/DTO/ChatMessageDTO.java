package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDTO {
    private Long id;
    private Long userId;
    private String content;
    private Date timestamp;

    public ChatMessageDTO(String content, Date timestamp) {
        this.content = content;
        this.timestamp = timestamp;
    }
}
