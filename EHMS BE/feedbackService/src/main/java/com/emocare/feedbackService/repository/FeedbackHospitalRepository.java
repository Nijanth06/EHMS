package com.emocare.feedbackService.repository;

import com.emocare.feedbackService.entity.FeedbackHospitalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FeedbackHospitalRepository extends JpaRepository<FeedbackHospitalEntity,Long> {

    boolean existsByPatientIdAndDate(int patientId, LocalDate date);

    List<FeedbackHospitalEntity> findByHospitalId(long id);
}
