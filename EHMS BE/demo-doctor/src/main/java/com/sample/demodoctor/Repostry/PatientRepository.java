package com.sample.demodoctor.repostry;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sample.demodoctor.entity.Patient;
public interface PatientRepository extends JpaRepository<Patient, Integer>{
	Patient findById(Long patientId);

}
