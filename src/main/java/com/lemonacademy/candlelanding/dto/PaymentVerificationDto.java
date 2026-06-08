package com.lemonacademy.candlelanding.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PaymentVerificationDto {
    private String orderId;

    private String paymentId;
}
