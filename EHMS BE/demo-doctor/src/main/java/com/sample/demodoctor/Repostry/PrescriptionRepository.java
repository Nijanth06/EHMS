package com.sample.demodoctor.repostry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sample.demodoctor.entity.Patient;
import com.sample.demodoctor.entity.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Integer>{
	List<Prescription> findByPatient(Patient patient);
	
	

}
