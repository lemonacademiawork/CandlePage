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
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(to);
            message.setSubject("Thank You for Your Interest");

            message.setText(
                    "Hi " + name +
                            ",\n\nThank you for your interest in our Candle Making Masterclass." +
                            "\nOur team will contact you shortly.\n\nRegards,\nLemon Academy"
            );

            mailSender.send(message);
            System.out.println("Lead confirmation email sent successfully  to: " + to);
        } catch (Exception e) {
            System.err.println("Failed to send lead confirmation email to " + to + ": " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendPaymentConfirmationEmail(String to, String name, String orderId, double amount) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(to);
            message.setSubject("Enrollment Confirmed - Lemon Academy");

            message.setText(
                    "Hi " + name +
                            ",\n\nYour payment of ₹" + amount + " for the Candle Making Course was successful!" +
                            "\nOrder ID: " + orderId +
                            "\n\nWelcome to Lemon Academy! Your course onboarding details and material lists will be shared with you shortly." +
                            "\n\nRegards,\nLemon Academy"
            );

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send payment confirmation email to " + to + ": " + e.getMessage());
        }
    }
}
