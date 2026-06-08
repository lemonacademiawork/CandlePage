package com.lemonacademy.candlelanding.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "payments")
public class Payment {
    @Id
    private String id;

    private String name;
    private String email;
    private String phone;

    private double amount;

    private String orderId;
    private String paymentId;
    private String status;
    private LocalDateTime createdAt;
}
