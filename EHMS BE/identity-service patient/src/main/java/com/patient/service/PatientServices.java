
package com.patient.service;



import com.patient.entity.Patient;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface PatientServices {
	void createPatient(Patient patientDto);

	Patient getPatientByEmail(String email);
	public ResponseEntity<Patient> findByUserId(Long Id);

	List<Patient> getallPatient();

	boolean isExistsByEmail(String email);

	boolean isExistsByNic(String nic);

}
