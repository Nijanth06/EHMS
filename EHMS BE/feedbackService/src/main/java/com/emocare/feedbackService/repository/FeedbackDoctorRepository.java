package com.emocare.feedbackService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.emocare.feedbackService.entity.FeedbackDoctorEntity;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FeedbackDoctorRepository extends JpaRepository<FeedbackDoctorEntity,Long>{
    List<FeedbackDoctorEntity> findByPatientId(long id);

    boolean existsByPatientIdAndDate(int patientId, LocalDate date);

    List<FeedbackDoctorEntity> findByDoctorId(long id);
}
