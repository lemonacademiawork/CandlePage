package com.lemonacademy.candlelanding.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "leads")
public class Lead {

    @Id
    private String id;
    private String name;
    private String phone;
    private String email;
    private String source;
    private LocalDateTime createdAt;
}
