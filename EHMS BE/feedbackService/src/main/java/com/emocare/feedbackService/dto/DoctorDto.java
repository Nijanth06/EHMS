package com.emocare.feedbackService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDto {
    private String email;
    private String title;
    private String firstName;
    private String lastName;
    private int mobileNumber;
    private String imageFile;
    private String specialization;
    private int yearOfExp;
    private int id;
    private List<List<Object>> feedback;
}