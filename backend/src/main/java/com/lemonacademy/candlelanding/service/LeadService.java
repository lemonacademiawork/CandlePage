package com.lemonacademy.candlelanding.service;

import com.lemonacademy.candlelanding.dto.LeadRequestDto;
import com.lemonacademy.candlelanding.dto.LeadResponseDto;

public interface LeadService {

    LeadResponseDto saveLead(
            LeadRequestDto requestDto);
}
