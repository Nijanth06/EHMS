package com.emocare.feedbackService.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class FeedbackRequestDto {
    @NotBlank(message = "mandatory field !!")
    private int doctorId;
    @NotBlank(message = "mandatory field !!")
    private int patientId;
    @NotBlank(message = "mandatory field !!")
    private int ratings;
    private String feedbacks;
}
