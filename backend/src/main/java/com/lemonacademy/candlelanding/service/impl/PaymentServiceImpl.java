package com.lemonacademy.candlelanding.service.impl;

import com.lemonacademy.candlelanding.dto.PaymentOrderRequestDto;
import com.lemonacademy.candlelanding.dto.PaymentOrderResponseDto;
import com.lemonacademy.candlelanding.dto.PaymentVerificationDto;
import com.lemonacademy.candlelanding.exception.ResourceNotFoundException;
import com.lemonacademy.candlelanding.model.Payment;
import com.lemonacademy.candlelanding.repository.PaymentRepository;
import com.lemonacademy.candlelanding.service.PaymentService;
import com.lemonacademy.candlelanding.service.EmailService;
import org.springframework.stereotype.Service;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import java.time.LocalDateTime;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;


@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final RazorpayClient razorpayClient;
    private final EmailService emailService;

    @Value("${razorpay.key.secret}")
private String razorpaySecret;

    public PaymentServiceImpl(PaymentRepository paymentRepository, RazorpayClient razorpayClient, EmailService emailService){
        this.paymentRepository = paymentRepository;
        this.razorpayClient = razorpayClient;
        this.emailService = emailService;
    }

    @Override
    public PaymentOrderResponseDto createOrder(PaymentOrderRequestDto requestDto){
        try {
            int amountInPaise = (int) Math.round(requestDto.getAmount() * 100);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

            Order razorpayOrder = razorpayClient.orders.create(orderRequest);
            String orderId = razorpayOrder.get("id");

            Payment payment = new Payment();
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
        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create Razorpay order: " + e.getMessage(), e);
        }
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
}

private boolean verifySignature(
        String orderId,
        String paymentId,
        String razorpaySignature) {

    try {

        String payload = orderId + "|" + paymentId;

        Mac sha256Hmac = Mac.getInstance("HmacSHA256");

        SecretKeySpec secretKey =
                new SecretKeySpec(
                        razorpaySecret.getBytes(),
                        "HmacSHA256");

        sha256Hmac.init(secretKey);

        byte[] hash =
                sha256Hmac.doFinal(
                        payload.getBytes());

        String generatedSignature =
                bytesToHex(hash);

        return generatedSignature
                .equals(razorpaySignature);

    } catch (Exception e) {

        throw new RuntimeException(
                "Signature verification failed", e);
    }
}

private String bytesToHex(
        byte[] bytes) {

    StringBuilder sb =
            new StringBuilder();

    for (byte b : bytes) {
        sb.append(
                String.format(
                        "%02x",
                        b));
    }

    return sb.toString();
}
}
