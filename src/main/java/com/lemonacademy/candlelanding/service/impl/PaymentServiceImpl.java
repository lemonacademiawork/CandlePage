package com.lemonacademy.candlelanding.service.impl;

import com.lemonacademy.candlelanding.dto.PaymentOrderRequestDto;
import com.lemonacademy.candlelanding.dto.PaymentOrderResponseDto;
import com.lemonacademy.candlelanding.dto.PaymentVerificationDto;
import com.lemonacademy.candlelanding.exception.ResourceNotFoundException;
import com.lemonacademy.candlelanding.model.Payment;
import com.lemonacademy.candlelanding.repository.PaymentRepository;
import com.lemonacademy.candlelanding.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;


@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository){
        this.paymentRepository= paymentRepository;
    }

    @Override
    public PaymentOrderResponseDto createOrder(PaymentOrderRequestDto requestDto){
        String orderId= "ORD-"+ UUID.randomUUID()
                .toString()
                .substring(0,8)
                .toUpperCase();

        Payment payment= new Payment();

        payment.setOrderId(orderId);
        payment.setName(requestDto.getName());
        payment.setEmail(requestDto.getEmail());
        payment.setPhone(requestDto.getPhone());
        payment.setAmount(requestDto.getAmount());
        payment.setStatus("PENDING");
        payment.setCreatedAt(LocalDateTime.now());

        paymentRepository.save(payment);

        return PaymentOrderResponseDto.builder()
                .orderId(orderId)
                .amount(requestDto.getAmount())
                .currency("INR")
                .status("PENDING")
                .build();
    }

    @Override
    public void verifyPayment(
            PaymentVerificationDto verificationDto) {

        Payment payment = paymentRepository
                .findByOrderId(
                        verificationDto.getOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found"));

        payment.setPaymentId(
                verificationDto.getPaymentId());

        payment.setStatus("SUCCESS");

        paymentRepository.save(payment);

    }
}
