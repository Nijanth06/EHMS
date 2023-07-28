
package com.patient.serviesImpl;


import com.patient.entity.Patient;
import com.patient.repository.PatientRepository;
import com.patient.repository.RoleRepository;
import com.patient.service.PatientServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServicesImpl implements PatientServices {

	@Autowired
	PatientRepository patientRepository;

	@Autowired
	RoleRepository roleRepository;
	

	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Logger LOGGER = LoggerFactory.getLogger(PatientServicesImpl.class);

	@Override
	public void createPatient(Patient patientDto) {
		/*
		LOGGER.info("createPatient method invoked");
		Patient patient = new Patient();
		patient.setTitle(patientDto.getTitle());
		patient.setAddress(patientDto.getAddress());
		patient.setFullName(patientDto.getFullName());

		patient.setDateOfBirth(patientDto.getDateOfBirth());
		patient.setEmail(patientDto.getEmail());
		patient.setNic(patientDto.getNic());
		patient.setGender(patientDto.getGender());
		patient.setGuardianName(patientDto.getGuardianName());
		patient.setGuardianMobileNumber(76543333);
		patient.setPassword(passwordEncoder.encode(patientDto.getPassword()));
		patient.setMobileNumber(77);
		
		Role role = roleRepository.findById(1).get();
		patient.setRole(role);
		patientRepository.save(patient);


		 */
	}

	@Override
	public boolean isExistsByEmail(String email) {
		if (null != email && patientRepository.existsByEmail(email)) {
			return true;
		}
		return false;

	}

	@Override
	public boolean isExistsByNic(String nic) {
		if (null != nic && patientRepository.existsByNic(nic)) {
			return true;
		}
		return false;
	}

	@Override
	public Patient getPatientByEmail(String email) {
		Patient patient = patientRepository.findByEmail(email).get();
		return this.patientToPatientDto(patient);
	}
	
	
	
	public Patient patientToPatientDto(Patient patient) {
		/*
		Patient patientDto = new Patient();
		patientDto.setTitle(patient.getTitle());
		patientDto.setId(patient.getId());
		patientDto.setAddress(patient.getAddress());
		patientDto.setDateOfBirth(patient.getDateOfBirth());
		patientDto.setEmail(patient.getEmail());
		patientDto.setFullName(patient.getFullName());
		patientDto.setGender(patient.getGender());
		patientDto.setGuardianName(patient.getGuardianName());
		patientDto.setGuardianMobileNumber(patient.getGuardianMobileNumber());
		patientDto.setNic(patient.getNic());
		patientDto.setPassword(patient.getPassword());
		patientDto.setMobileNumber(patient.getMobileNumber());
		//patientDto.setRole(patient.getRole());
		return patientDto;


		 */
		return patient;
	}

	@Override
	public List<Patient> getallPatient() {
		return patientRepository.findAll();
	}



	public List<Patient> getStafListByIds(List<Long> ids) {
		return patientRepository.findByIdIn(ids);
	}

	@Override
	public ResponseEntity<Patient> findByUserId(Long Id) {
		Patient pa = patientRepository.findById(Id).orElseThrow();
		
		return ResponseEntity.ok(pa);
	}

}
