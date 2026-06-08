package com.lemonacademy.candlelanding.service;

import com.lemonacademy.candlelanding.dto.LeadRequestDto;
import com.lemonacademy.candlelanding.dto.LeadResponseDto;
import com.lemonacademy.candlelanding.model.Lead;
import com.lemonacademy.candlelanding.repository.LeadRepository;
import org.springframework.stereotype.Service;

import java.security.cert.Extension;
import java.time.LocalDateTime;

@Service
public interface LeadService {

    LeadResponseDto saveLead(
            LeadRequestDto requestDto);
}
