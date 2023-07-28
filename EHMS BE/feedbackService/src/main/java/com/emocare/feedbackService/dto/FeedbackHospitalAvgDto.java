package com.emocare.feedbackService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackHospitalAvgDto {
    private String name;
    private String  branch;
    private int mobileNumber;
    private double rates;
}