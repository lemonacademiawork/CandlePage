package com.lemonacademy.candlelanding.service;

import com.lemonacademy.candlelanding.dto.PaymentOrderRequestDto;
import com.lemonacademy.candlelanding.dto.PaymentOrderResponseDto;
import com.lemonacademy.candlelanding.dto.PaymentVerificationDto;
import org.springframework.stereotype.Service;


public interface PaymentService {
    PaymentOrderResponseDto createOrder(
            PaymentOrderRequestDto requestDto);

    void verifyPayment(
            PaymentVerificationDto verificationDto);
}
