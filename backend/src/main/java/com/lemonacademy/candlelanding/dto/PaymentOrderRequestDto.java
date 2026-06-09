package com.lemonacademy.candlelanding.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentOrderRequestDto {
    @NotBlank(message = "Name is required")
    private String name;

    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotNull(message = "Amount is required")
    private Double amount;
}
