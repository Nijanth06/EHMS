package com.sample.demodoctor.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.demodoctor.dto.PrescriptionDto;
import com.sample.demodoctor.entity.doctor;
import com.sample.demodoctor.entity.Patient;
import com.sample.demodoctor.entity.Prescription;
import com.sample.demodoctor.repostry.PrescriptionRepository;
import com.sample.demodoctor.service.PrescriptionService;

@Service
public class PrescriptionServiceImpl implements PrescriptionService{
	
	@Autowired
	private PrescriptionRepository prescriptionRepository;

	@Override
	public void addPrescription(doctor doctor,Patient patient,PrescriptionDto prescriptionDto) {
		Prescription prescription = new Prescription();
		prescription.setDate(prescriptionDto.getDate());
		prescription.setDrugs(prescriptionDto.getDrugs());
		prescription.setIllness(prescriptionDto.getIllness());
		prescription.setLocation(prescriptionDto.getLocation());
		prescription.setPrescriptions(prescriptionDto.getPrescriptions());
		prescription.setStatus(prescriptionDto.getStatus());
		prescription.setDoctor(doctor);
		prescription.setPatient(patient);
		prescriptionRepository.save(prescription);
		
	}

	@Override
	public List<Prescription> findByPrescription(Patient patient) {
		return prescriptionRepository.findByPatient(patient);
	}

	

}
