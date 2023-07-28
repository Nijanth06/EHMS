package com.sample.demodoctor.service;

import java.util.List;

import com.sample.demodoctor.dto.PrescriptionDto;
import com.sample.demodoctor.entity.doctor;
import com.sample.demodoctor.entity.Patient;
import com.sample.demodoctor.entity.Prescription;

public interface PrescriptionService {
	void addPrescription(doctor doctor,Patient patient,PrescriptionDto prescriptionDto);
	List<Prescription> findByPrescription(Patient patient);
	

}
