package com.lemonacademy.candlelanding.dto;

import lombok.Data;

@Data
public class PaymentVerificationDto {
    private String orderId;

    private String paymentId;
}
