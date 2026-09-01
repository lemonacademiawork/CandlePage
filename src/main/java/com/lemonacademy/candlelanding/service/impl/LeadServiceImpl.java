package com.lemonacademy.candlelanding.service.impl;

import com.lemonacademy.candlelanding.dto.LeadRequestDto;
import com.lemonacademy.candlelanding.dto.LeadResponseDto;
import com.lemonacademy.candlelanding.model.Lead;
import com.lemonacademy.candlelanding.repository.LeadRepository;
import com.lemonacademy.candlelanding.service.EmailService;
import com.lemonacademy.candlelanding.service.LeadService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.time.LocalDateTime;
import java.util.HashMap;

@Service
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;
    private final EmailService emailService;

    public LeadServiceImpl(LeadRepository leadRepository, EmailService emailService){
        this.leadRepository=leadRepository;
        this.emailService= emailService;
    }

    @Override
    public LeadResponseDto saveLead(
            LeadRequestDto requestDto) {

        Lead lead = Lead.builder()
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .phone(requestDto.getPhone())
                .createdAt(LocalDateTime.now())
                .build();

        Lead savedLead =
                leadRepository.save(lead);

        //emailService.sendLeadConfirmationEmail(savedLead.getEmail(), savedLead.getName());

        return LeadResponseDto.builder()
                .id(savedLead.getId())
                .name(savedLead.getName())
                .email(savedLead.getEmail())
                .phone(savedLead.getPhone())
                .createdAt(savedLead.getCreatedAt())
                .build();

         RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("phone", savedLead.getPhone());
        requestBody.put("name", savedLead.getName());
        

        restTemplate.postForObject(
        "https://app.zoepact.in/webhook/whatsapp-workflow/234476.302199.298711.1781248905",
        requestBody,
        String.class
);
    }
}
