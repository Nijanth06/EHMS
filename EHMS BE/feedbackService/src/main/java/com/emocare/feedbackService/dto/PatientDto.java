package com.emocare.feedbackService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDto {
    private String title;
    private String firstName;
    private String lastName;
    private int id;
    private  List<List<Object>>  feedback;
}