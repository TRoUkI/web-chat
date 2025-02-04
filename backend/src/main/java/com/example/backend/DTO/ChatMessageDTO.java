package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class ChatMessageDTO {
    private Long id;
    private Long userId;
    private String content;
    private Date timestamp;
}
