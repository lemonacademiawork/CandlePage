package com.lemonacademy.candlelanding.service.impl;

import com.lemonacademy.candlelanding.dto.PaymentOrderRequestDto;
import com.lemonacademy.candlelanding.dto.PaymentOrderResponseDto;
import com.lemonacademy.candlelanding.dto.PaymentVerificationDto;
import com.lemonacademy.candlelanding.exception.ResourceNotFoundException;
import com.lemonacademy.candlelanding.model.Payment;
import com.lemonacademy.candlelanding.repository.PaymentRepository;
import com.lemonacademy.candlelanding.service.EmailService;
import com.lemonacademy.candlelanding.service.PaymentService;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final RazorpayClient razorpayClient;
    private final EmailService emailService;

    public PaymentServiceImpl(PaymentRepository paymentRepository, RazorpayClient razorpayClient, EmailService emailService){
        this.paymentRepository = paymentRepository;
        this.razorpayClient = razorpayClient;
        this.emailService = emailService;
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

        if ("SUCCESS".equals(payment.getStatus())) {
            return;
        }

        boolean isValidSignature = verifySignature(
                verificationDto.getOrderId(),
                verificationDto.getPaymentId(),
                verificationDto.getSignature());

        if (!isValidSignature) {
            throw new RuntimeException(
                    "Invalid Razorpay payment signature");
        }

        payment.setPaymentId(
                verificationDto.getPaymentId());

        payment.setStatus("SUCCESS");

        paymentRepository.save(payment);


        payment.setStatus("SUCCESS");
        paymentRepository.save(payment);

// Zoepact webhook call
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("phone", payment.getPhone());
        requestBody.put("name", payment.getName());
        requestBody.put("course", "Candle Making Masterclass");

        restTemplate.postForObject(
        "https://app.zoepact.in/webhook/whatsapp-workflow/234476.302199.298711.1781248905",
        requestBody,
        String.class
);
    }
}
