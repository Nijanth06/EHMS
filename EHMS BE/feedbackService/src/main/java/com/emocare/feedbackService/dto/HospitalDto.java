package com.emocare.feedbackService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospitalDto {
    private long id;
    private String name;
    private String branch;
    private int mobileNumber;
    private List<List<Object>> feedback;
}