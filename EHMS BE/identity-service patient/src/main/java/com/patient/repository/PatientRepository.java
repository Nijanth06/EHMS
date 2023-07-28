package com.patient.repository;


import com.patient.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {


	List<Patient> findByIdIn(List<Long> ids);

	Optional<Patient>findByEmail(String username);
	boolean existsByEmail(String email);
	boolean existsByNic(String nic);








}