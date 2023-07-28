package com.emocare.feedbackService.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FeedbackHospitalRequestDto {
    @NotBlank(message = "mandatory field !!")
    private int hospitalId;
    @NotBlank(message = "mandatory field !!")
    private int patientId;
    @NotBlank(message = "mandatory field !!")
    private int ratings;
    private String feedbacks;
}
