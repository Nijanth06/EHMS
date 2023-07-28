package com.emocare.feedbackService.service;

import com.emocare.feedbackService.dto.*;
import com.emocare.feedbackService.entity.FeedbackDoctorEntity;
import com.emocare.feedbackService.entity.FeedbackHospitalEntity;
import com.emocare.feedbackService.repository.FeedbackHospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackHospitalService {
    @Autowired
    private FeedbackHospitalRepository feedbackHospitalRepository;
    @Autowired
    private RestTemplate restTemplate;

    public FeedbackHospitalEntity saveFeedbackHospital(FeedbackHospitalRequestDto feedbackHospitalRequestDto){
        FeedbackHospitalEntity feedback = new FeedbackHospitalEntity();
        feedback.setPatientId(feedbackHospitalRequestDto.getPatientId());
        feedback.setHospitalId(feedbackHospitalRequestDto.getHospitalId());
        feedback.setRatings(feedbackHospitalRequestDto.getRatings());
        feedback.setFeedbacks(feedbackHospitalRequestDto.getFeedbacks());
        feedback.setDate(LocalDate.now());
        return feedbackHospitalRepository.save(feedback);
    }

    public List<HospitalDto> findByHospitalId(long id) {
        List<FeedbackHospitalEntity> feedbackList = feedbackHospitalRepository.findByHospitalId(id);
        Map<Long, List<List<Object>>> feedbacksMap = new HashMap<>();
        for (FeedbackHospitalEntity feedback : feedbackList) {
            Long hospitalId = (long) feedback.getHospitalId();
            List<Object> feedbackEntry = new ArrayList<>();
            feedbackEntry.add(feedback.getRatings());
            feedbackEntry.add(feedback.getFeedbacks());
            feedbacksMap.computeIfAbsent(hospitalId, k -> new ArrayList<>()).add(feedbackEntry);
        }
        List<HospitalDto> feedbackHospital = new ArrayList<>();
        for (Map.Entry<Long, List<List<Object>>> entry : feedbacksMap.entrySet()) {
            long hospitalId = Long.parseLong(String.valueOf(entry.getKey()));
            String employeeDetailsUrl = "http://localhost:9896/admin/hospitals?ids=" + hospitalId;
            ResponseEntity<List<HospitalDto>> response = restTemplate.exchange(
                    employeeDetailsUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {
                    }
            );
            if (response.getStatusCode() == HttpStatus.OK) {
                List<HospitalDto> hospitalDetailsList = response.getBody();
                if (!hospitalDetailsList.isEmpty()) {
                    HospitalDto hospitalDetails = hospitalDetailsList.get(0);
                    HospitalDto hospitalDto = new HospitalDto();
                    hospitalDto.setName(hospitalDetails.getName());
                    hospitalDto.setBranch(hospitalDetails.getBranch());
                    hospitalDto.setId(hospitalDetails.getId());
                    hospitalDto.setMobileNumber(hospitalDetails.getMobileNumber());
                    hospitalDto.setFeedback(feedbacksMap.get(hospitalId));
                    feedbackHospital.add(hospitalDto);
                }
            }
        }
        return feedbackHospital;
    }

    public List<HospitalDto> findByPatientId(long id) {
        List<FeedbackHospitalEntity> feedbackList = feedbackHospitalRepository.findByHospitalId(id);
        Map<Long, List<List<Object>>> feedbacksMap = new HashMap<>();
        for (FeedbackHospitalEntity feedback : feedbackList) {
            Long hospitalId = (long) feedback.getHospitalId();
            List<Object> feedbackEntry = new ArrayList<>();
            feedbackEntry.add(feedback.getRatings());
            feedbackEntry.add(feedback.getFeedbacks());
            feedbacksMap.computeIfAbsent(hospitalId, k -> new ArrayList<>()).add(feedbackEntry);
        }
        List<HospitalDto> feedbackHospital = new ArrayList<>();
        for (Map.Entry<Long, List<List<Object>>> entry : feedbacksMap.entrySet()) {
            long hospitalId = Long.parseLong(String.valueOf(entry.getKey()));
            String employeeDetailsUrl = "http://localhost:9896/admin/hospitals?ids=" + hospitalId;
            ResponseEntity<List<HospitalDto>> response = restTemplate.exchange(
                    employeeDetailsUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {
                    }
            );
            if (response.getStatusCode() == HttpStatus.OK) {
                List<HospitalDto> hospitalDetailsList = response.getBody();
                if (!hospitalDetailsList.isEmpty()) {
                    HospitalDto hospitalDetails = hospitalDetailsList.get(0);
                    HospitalDto hospitalDto = new HospitalDto();
                    hospitalDto.setName(hospitalDetails.getName());
                    hospitalDto.setBranch(hospitalDetails.getBranch());
                    hospitalDto.setId(hospitalDetails.getId());
                    hospitalDto.setMobileNumber(hospitalDetails.getMobileNumber());
                    hospitalDto.setFeedback(feedbacksMap.get(hospitalId));
                    feedbackHospital.add(hospitalDto);
                }
            }
        }
        return feedbackHospital;
    }


    public  List<Object> getAverageRatingsForAllHospital() {

            List<FeedbackHospitalEntity> feedbackList = feedbackHospitalRepository.findAll();

            Map<Long, List<Integer>> ratingsMap = new HashMap<>();
            for (FeedbackHospitalEntity feedback : feedbackList) {
                ratingsMap.computeIfAbsent((long) feedback.getHospitalId(), k -> new ArrayList<>()).add(feedback.getRatings());
            }
            List<Object> averageRatings = new ArrayList<>();
            for (Map.Entry<Long, List<Integer>> entry : ratingsMap.entrySet()) {
                long hospitalId = entry.getKey();
                String employeeDetailsUrl = "http://localhost:9896/admin/hospitals?ids=" + hospitalId;
                ResponseEntity<List<HospitalDto>> response = restTemplate.exchange(
                        employeeDetailsUrl,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<>() {
                        }
                );

                if (response.getStatusCode() == HttpStatus.OK) {
                    List<HospitalDto> hospitalDetailsList = response.getBody();

                    if (!hospitalDetailsList.isEmpty()) {
                        HospitalDto hospitalDetails = hospitalDetailsList.get(0);
                        FeedbackHospitalAvgDto hospitalAvgDto = new FeedbackHospitalAvgDto();
                        List<Integer> ratings = entry.getValue();
                        double averageRating = ratings.stream().mapToInt(Integer::intValue).average().orElse(0.0);

                        hospitalAvgDto.setName(hospitalDetails.getName());
                        hospitalAvgDto.setBranch(hospitalDetails.getBranch());
                        hospitalAvgDto.setMobileNumber(hospitalDetails.getMobileNumber());
                        hospitalAvgDto.setRates(averageRating);
                        averageRatings.add(hospitalAvgDto);
                    }
                }
            }
            return (List<Object>) averageRatings;
        }

}
