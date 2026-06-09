package com.lemonacademy.candlelanding.service.impl;

import com.lemonacademy.candlelanding.dto.LeadRequestDto;
import com.lemonacademy.candlelanding.dto.LeadResponseDto;
import com.lemonacademy.candlelanding.model.Lead;
import com.lemonacademy.candlelanding.repository.LeadRepository;
import com.lemonacademy.candlelanding.service.EmailService;
import com.lemonacademy.candlelanding.service.LeadService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;
    private final EmailService emailService;

    public LeadServiceImpl(LeadRepository leadRepository, EmailService emailService){
        this.leadRepository = leadRepository;
        this.emailService = emailService;
    }

    @Override
    public LeadResponseDto saveLead(LeadRequestDto requestDto) {
        Lead lead = Lead.builder()
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .phone(requestDto.getPhone())
                .source(requestDto.getSource())
                .createdAt(LocalDateTime.now())
                .build();

        

        Lead savedLead = leadRepository.save(lead);
        


        emailService.sendLeadConfirmationEmail(savedLead.getEmail(), savedLead.getName());

        return LeadResponseDto.builder()
                .id(savedLead.getId())
                .name(savedLead.getName())
                .email(savedLead.getEmail())
                .phone(savedLead.getPhone())
                .source(savedLead.getSource())
                .createdAt(savedLead.getCreatedAt())
                .build();
    }
}
