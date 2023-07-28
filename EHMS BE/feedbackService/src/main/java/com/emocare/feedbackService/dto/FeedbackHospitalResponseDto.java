package com.emocare.feedbackService.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FeedbackHospitalResponseDto {
    private long id;
    private int doctorId;
    private int patientId;
    private int ratings;
    private  List<List<Object>> feedbacks;
    private Date date;
}
