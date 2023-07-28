package com.emocare.feedbackService.controller;
import com.emocare.feedbackService.dto.*;
import com.emocare.feedbackService.entity.FeedbackDoctorEntity;
import com.emocare.feedbackService.entity.FeedbackHospitalEntity;
import com.emocare.feedbackService.repository.FeedbackDoctorRepository;
import com.emocare.feedbackService.repository.FeedbackHospitalRepository;
import com.emocare.feedbackService.service.FeedbackDoctorService;
import com.emocare.feedbackService.service.FeedbackHospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackDoctorService feedbackDoctorService;
    @Autowired
    private FeedbackHospitalService feedbackHospitalService;
    @Autowired
    private FeedbackDoctorRepository feedbackDoctorRepository;
    @Autowired
    private FeedbackHospitalRepository feedbackHospitalRepository;

    @PostMapping("/doctor")
    public ResponseEntity<Object> save(@RequestBody FeedbackRequestDto feedbackDto) {
        if (feedbackDoctorRepository.existsByPatientIdAndDate(feedbackDto.getPatientId(), LocalDate.now())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        FeedbackDoctorEntity feedback = feedbackDoctorService.saveFeedback(feedbackDto);
        FeedbackDoctorResponseDto feedbackDoctorResponseDto = new FeedbackDoctorResponseDto();
        feedbackDoctorResponseDto.setFeedbacks(feedback.getFeedbacks());
        feedbackDoctorResponseDto.setDoctorId(feedback.getDoctorId());
        feedbackDoctorResponseDto.setId(feedback.getId());
        feedbackDoctorResponseDto.setPatientId(feedback.getPatientId());
        feedbackDoctorResponseDto.setDate(feedback.getDate());
        feedbackDoctorResponseDto.setRatings(feedback.getRatings());
        return new ResponseEntity<>(feedbackDoctorResponseDto, HttpStatus.CREATED);
    }

    @PostMapping("/hospital")
    public ResponseEntity<Object> saveHos(@RequestBody FeedbackHospitalRequestDto feedbackHospitalRequestDto) {
        if (feedbackHospitalRepository.existsByPatientIdAndDate(feedbackHospitalRequestDto.getPatientId(), LocalDate.now())) {
            return new ResponseEntity<>("Submit later", HttpStatus.BAD_REQUEST);
        }
        FeedbackHospitalEntity feedback = feedbackHospitalService.saveFeedbackHospital(feedbackHospitalRequestDto);
        return new ResponseEntity<>(feedback, HttpStatus.CREATED);
    }

    @DeleteMapping("/view/doctor/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") long id) {
        if (feedbackDoctorRepository.existsById(id)) {
            feedbackDoctorRepository.deleteById(id);
            return new ResponseEntity<>("Feedback Removed", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/view/hospital/{id}")
    public ResponseEntity<Object> deleteHos(@PathVariable("id") long id) {
        if (feedbackHospitalRepository.existsById(id)) {
            feedbackHospitalRepository.deleteById(id);
            return new ResponseEntity<>("Feedback Removed", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/view/{id}/doctor")
    public List<DoctorDto> listDoctorFeedbacksByUser(@PathVariable("id") long id) {
        List<DoctorDto> responseEntity = feedbackDoctorService.findByPatientId(id);
        return ResponseEntity.ok(responseEntity).getBody();
    }
    @GetMapping("/view/{id}/hospital")
    public List<HospitalDto> listHospitalFeedbacksByUser(@PathVariable("id") long id) {
        List<HospitalDto> responseEntity = feedbackHospitalService.findByPatientId(id);
        return ResponseEntity.ok(responseEntity).getBody();
    }
    @GetMapping("/view/doctor/{id}")
    public List<PatientDto> listDoctorFeedbacksByDoctor(@PathVariable("id") long id) {
        List<PatientDto> responseEntity = feedbackDoctorService.findByDoctorId(id);
        return ResponseEntity.ok(responseEntity).getBody();
    }
    @GetMapping("/view/hospital/{id}")
    public List<HospitalDto> listHospitalFeedbacksByHospital(@PathVariable("id") long id) {
        List<HospitalDto> responseEntity = feedbackHospitalService.findByHospitalId(id);
        return ResponseEntity.ok(responseEntity).getBody();
    }
    @GetMapping("/view/average-ratings-doctors")
    public ResponseEntity<List<Object>> getAverageRatingsForAllDoctors() {
        List<Object> averageRatings = feedbackDoctorService.getAverageRatingsForAllDoctors();
        return ResponseEntity.ok(averageRatings);
    }

    @GetMapping("/view/average-ratings-hospitals")
    public ResponseEntity<List<Object>> getAverageRatingsForAllHospital() {
        List<Object> averageRatings = feedbackHospitalService.getAverageRatingsForAllHospital();
        return ResponseEntity.ok(averageRatings);
    }
}

