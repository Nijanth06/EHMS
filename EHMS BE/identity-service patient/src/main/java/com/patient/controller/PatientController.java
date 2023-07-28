package com.patient.controller;

import com.patient.dto.patientRecDTO;
import com.patient.entity.Patient;
import com.patient.repository.PatientRepository;
import com.patient.service.AuthService;
import com.patient.service.PatientServices;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AuthService service;

    @Autowired
    private PatientServices pService;


    @GetMapping("/allPatient")
    public List<patientRecDTO> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream()
                .map(patientRecDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/get/by/{email}")
    public List<patientRecDTO> getPatientByEmail(@PathVariable("email") String email){
        Optional<Patient> patient = service.findByEmailID(email);
        System.out.println("THIS IS PATIENT>>>>>>>>>>>>>>>>>" + patient);
            return patient.stream().map(patientRecDTO::new).collect(Collectors.toList());

    }
    @GetMapping("/get/by/{id}")
 	public ResponseEntity<Patient> getById(@PathVariable Long id){
 		
 		return pService.findByUserId(id);
 	}

}
