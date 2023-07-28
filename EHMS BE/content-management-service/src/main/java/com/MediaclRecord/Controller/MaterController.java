package com.MediaclRecord.Controller;

import com.MediaclRecord.Enitity.Prescription;
import com.MediaclRecord.Enitity.patientRecord;
import com.MediaclRecord.Repostry.PrescriptionRepository;
import com.MediaclRecord.Repostry.patientRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/medical")
public class MaterController {

    @Autowired
    private patientRecordRepository patientRecordRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @PostMapping("/uploadRecords")
    public ResponseEntity<Object> uploadRecords(@RequestBody patientRecord patientRecord, @RequestHeader("loggedUser") String userName) {
        patientRecord.setEmail(userName);
        patientRecordRepository.save(patientRecord);
        return ResponseEntity.ok(patientRecord);
    }

    @GetMapping("/getRecords")
    public ResponseEntity<Object> getRecords() {
        List<patientRecord> patientRecordList = patientRecordRepository.findAll();
        return ResponseEntity.ok(patientRecordList);
    }

    @GetMapping("/getRecords/{id}")
    public ResponseEntity<Object> getRecordsById(@PathVariable("id") long id) {
        Optional<patientRecord> patientRecordList = patientRecordRepository.findById(id);

        if (patientRecordList.isPresent()) {
            patientRecord patientRecord = patientRecordList.get();
            return ResponseEntity.ok(patientRecord);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/getRecordByEmail/{email}")
    public ResponseEntity<Object> getRecordBtEmail(@PathVariable("email") String email) {
        List<patientRecord> patientRecordList = patientRecordRepository.findByEmail(email);
        if (patientRecordList.isEmpty()) {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok(patientRecordList);
        }

    }
    @PostMapping("/addPrescription")
    public Prescription savePrescription(@RequestBody Prescription prescription){
        return prescriptionRepository.save(prescription);
    }


}
