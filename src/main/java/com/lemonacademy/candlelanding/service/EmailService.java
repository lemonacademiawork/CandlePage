package com.lemonacademy.candlelanding.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendLeadConfirmationEmail(String to, String name) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("Thank You for Your Interest");

        message.setText(
                "Hi " + name +
                        ",\n\nThank you for your interest in our Candle Making Masterclass." +
                        "\nOur team will contact you shortly.\n\nRegards,\nLemon Academy"
        );

        mailSender.send(message);
    }
}
