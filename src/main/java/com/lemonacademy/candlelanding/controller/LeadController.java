package com.lemonacademy.candlelanding.controller;

import com.lemonacademy.candlelanding.dto.LeadRequestDto;
import com.lemonacademy.candlelanding.dto.LeadResponseDto;
import com.lemonacademy.candlelanding.model.Lead;
import com.lemonacademy.candlelanding.service.LeadService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping
    public LeadResponseDto saveLead(
            @Valid @RequestBody LeadRequestDto request) {

        return leadService.saveLead(request);
    }
}