package com.lemonacademy.candlelanding.controller;

import com.lemonacademy.candlelanding.dto.PaymentOrderRequestDto;
import com.lemonacademy.candlelanding.dto.PaymentOrderResponseDto;
import com.lemonacademy.candlelanding.dto.PaymentVerificationDto;
import com.lemonacademy.candlelanding.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService){
        this.paymentService=paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<PaymentOrderResponseDto> createOrder
            (@RequestBody PaymentOrderRequestDto requestDto){

        PaymentOrderResponseDto response= paymentService.createOrder(requestDto);

        return ResponseEntity.ok(response);

    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyPayment(
            @RequestBody PaymentVerificationDto dto) {

        paymentService.verifyPayment(dto);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Payment verified successfully");

        return ResponseEntity.ok(response);
    }
}
