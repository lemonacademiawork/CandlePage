package com.lemonacademy.candlelanding.service.impl;

import com.lemonacademy.candlelanding.dto.LeadRequestDto;
import com.lemonacademy.candlelanding.dto.LeadResponseDto;
import com.lemonacademy.candlelanding.model.Lead;
import com.lemonacademy.candlelanding.repository.LeadRepository;
import com.lemonacademy.candlelanding.service.LeadService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;

    public LeadServiceImpl(LeadRepository leadRepository){
        this.leadRepository=leadRepository;
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

        return LeadResponseDto.builder()
                .id(savedLead.getId())
                .name(savedLead.getName())
                .email(savedLead.getEmail())
                .phone(savedLead.getPhone())
                .build();
    }
}
