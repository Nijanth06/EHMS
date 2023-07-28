package com.emocare.feedbackService.service;

import com.emocare.feedbackService.dto.DoctorDto;
import com.emocare.feedbackService.dto.FeedbackDoctorAvgDto;
import com.emocare.feedbackService.dto.FeedbackRequestDto;
import com.emocare.feedbackService.dto.PatientDto;
import com.emocare.feedbackService.entity.FeedbackDoctorEntity;
import com.emocare.feedbackService.repository.FeedbackDoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.*;

@Service
public class FeedbackDoctorService {
    @Autowired
    private final FeedbackDoctorRepository feedbackDoctorRepository;
    private final RestTemplate restTemplate;

    public FeedbackDoctorService(FeedbackDoctorRepository feedbackRepository, RestTemplate restTemplate) {
        this.feedbackDoctorRepository = feedbackRepository;
        this.restTemplate = restTemplate;
    }

    public FeedbackDoctorEntity saveFeedback(FeedbackRequestDto feedbackRequestDto) {
        FeedbackDoctorEntity feedback = new FeedbackDoctorEntity();
        feedback.setPatientId(feedbackRequestDto.getPatientId());
        feedback.setDoctorId(feedbackRequestDto.getDoctorId());
        feedback.setRatings(feedbackRequestDto.getRatings());
        feedback.setFeedbacks(feedbackRequestDto.getFeedbacks());
        feedback.setDate(LocalDate.now());
        return feedbackDoctorRepository.save(feedback);
    }

    public List<Object> getAverageRatingsForAllDoctors() {
        List<FeedbackDoctorEntity> feedbackList = feedbackDoctorRepository.findAll();

        Map<Long, List<Integer>> ratingsMap = new HashMap<>();
        for (FeedbackDoctorEntity feedback : feedbackList) {
            ratingsMap.computeIfAbsent((long) feedback.getDoctorId(), k -> new ArrayList<>()).add(feedback.getRatings());
        }
        List<Object> averageRatings = new ArrayList<>();
        for (Map.Entry<Long, List<Integer>> entry : ratingsMap.entrySet()) {
            long doctorId = entry.getKey();
            String employeeDetailsUrl = "http://localhost:9896/admin/Employees?ids=" + doctorId;
            ResponseEntity<List<DoctorDto>> response = restTemplate.exchange(
                    employeeDetailsUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {
                    }
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                List<DoctorDto> doctorDetailsList = response.getBody();

                if (!doctorDetailsList.isEmpty()) {
                    DoctorDto doctorDetails = doctorDetailsList.get(0);
                    FeedbackDoctorAvgDto doctorDto = new FeedbackDoctorAvgDto();
                    List<Integer> ratings = entry.getValue();
                    double averageRating = ratings.stream().mapToInt(Integer::intValue).average().orElse(0.0);

                    doctorDto.setFirstName(doctorDetails.getFirstName());
                    doctorDto.setLastName(doctorDetails.getLastName());
                    doctorDto.setImageFile(doctorDetails.getImageFile());
                    doctorDto.setYearOfExp(doctorDetails.getYearOfExp());
                    doctorDto.setSpecialization(doctorDetails.getSpecialization());
                    doctorDto.setEmail(doctorDetails.getEmail());
                    doctorDto.setMobileNumber(doctorDetails.getMobileNumber());
                    doctorDto.setRates(averageRating);
                    averageRatings.add(doctorDto);
                }
            }
        }
        return averageRatings;
    }

    public List<DoctorDto> findByPatientId(long id) {
        List<FeedbackDoctorEntity> feedbackList = feedbackDoctorRepository.findByPatientId(id);
        Map<Long, List<List<Object>>> ratingsMap = new HashMap<>();
        for (FeedbackDoctorEntity feedback : feedbackList) {
            Long doctorId = (long) feedback.getDoctorId();
            List<Object> feedbackEntry = new ArrayList<>();
            feedbackEntry.add(feedback.getRatings());
            feedbackEntry.add(feedback.getFeedbacks());
            ratingsMap.computeIfAbsent(doctorId, k -> new ArrayList<>()).add(feedbackEntry);
        }
        List<DoctorDto> feedbackDoctorList = new ArrayList<>();
        for (Map.Entry<Long, List<List<Object>>> entry : ratingsMap.entrySet()) {
            long doctorId = Long.parseLong(String.valueOf(entry.getKey()));
            String employeeDetailsUrl = "http://localhost:9896/admin/Employees?ids=" + doctorId;
            ResponseEntity<List<DoctorDto>> response = restTemplate.exchange(
                    employeeDetailsUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {
                    }
            );
            if (response.getStatusCode() == HttpStatus.OK) {
                List<DoctorDto> doctorDetailsList = response.getBody();
                if (!doctorDetailsList.isEmpty()) {
                    DoctorDto doctorDetails = doctorDetailsList.get(0);
                    DoctorDto doctorDto = new DoctorDto();
                    doctorDto.setFirstName(doctorDetails.getFirstName());
                    doctorDto.setLastName(doctorDetails.getLastName());
                    doctorDto.setImageFile(doctorDetails.getImageFile());
                    doctorDto.setYearOfExp(doctorDetails.getYearOfExp());
                    doctorDto.setSpecialization(doctorDetails.getSpecialization());
                    doctorDto.setEmail(doctorDetails.getEmail());
                    doctorDto.setMobileNumber(doctorDetails.getMobileNumber());
                    doctorDto.setFeedback(ratingsMap.get(doctorId));
                    feedbackDoctorList.add(doctorDto);
                }
            }
        }
        return feedbackDoctorList;
    }

    public List<PatientDto> findByDoctorId(long id) {
        List<FeedbackDoctorEntity> feedbackList = feedbackDoctorRepository.findByDoctorId(id);
        Map<Long, List<List<Object>>> feedbacksMap = new HashMap<>();
        for (FeedbackDoctorEntity feedback : feedbackList) {
            Long patientId = (long) feedback.getPatientId();
            List<Object> feedbackEntry = new ArrayList<>();
            feedbackEntry.add(feedback.getRatings());
            feedbackEntry.add(feedback.getFeedbacks());
            feedbacksMap.computeIfAbsent(patientId, k -> new ArrayList<>()).add(feedbackEntry);
        }
        List<PatientDto> feedbackPatient = new ArrayList<>();
        for (Map.Entry<Long, List<List<Object>>> entry : feedbacksMap.entrySet()) {
            long patientId = Long.parseLong(String.valueOf(entry.getKey()));
            String employeeDetailsUrl = "http://localhost:9897/auth/patient?ids=" + patientId;
            ResponseEntity<List<PatientDto>> response = restTemplate.exchange(
                    employeeDetailsUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {
                    }
            );
            if (response.getStatusCode() == HttpStatus.OK) {
                List<PatientDto> patientDetailsList = response.getBody();
                if (!patientDetailsList.isEmpty()) {
                    PatientDto patientDetails = patientDetailsList.get(0);
                    PatientDto patientDto = new PatientDto();
                    patientDto.setFirstName(patientDetails.getFirstName());
                    patientDto.setLastName(patientDetails.getLastName());
                    patientDto.setTitle(patientDetails.getTitle());
                    patientDto.setId(patientDetails.getId());
                    patientDto.setFeedback(feedbacksMap.get(patientId));
                    feedbackPatient.add(patientDto);
                }
            }
        }
        return feedbackPatient;
    }

}