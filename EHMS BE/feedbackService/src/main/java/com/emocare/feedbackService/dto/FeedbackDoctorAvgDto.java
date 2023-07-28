package com.emocare.feedbackService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDoctorAvgDto {
    private String email;
    private String firstName;
    private String lastName;
    private int mobileNumber;
    private String imageFile;
    private String specialization;
    private int yearOfExp;
    private double rates;
}