package com.emocare.feedbackService.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;

import static jakarta.persistence.GenerationType.IDENTITY;
@Entity
@Table(name = "Doctor")
@Data
public class FeedbackDoctorEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private long id;
    private int doctorId;
    private int patientId;
    private int ratings;
    private String feedbacks;
    private LocalDate date;
}
