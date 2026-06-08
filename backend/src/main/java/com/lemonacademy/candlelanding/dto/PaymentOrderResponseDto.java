package com.lemonacademy.candlelanding.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentOrderResponseDto {

    private String orderId;

    private Double amount;

    private String currency;

    private String status;
}
