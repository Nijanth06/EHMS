package com.emocare.feedbackService.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FeedbackDoctorResponseDto {
    private long id;
    private int doctorId;
    private int patientId;
    private int ratings;
    private String feedbacks;
    private LocalDate date;

}
