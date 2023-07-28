package com.patient.service;

import com.patient.dto.PatientDto;
import com.patient.entity.Patient;
import com.patient.entity.UserCredential;
import com.patient.repository.PatientRepository;
import com.patient.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {

    @Autowired
    private UserCredentialRepository repository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;


    public String saveUser(PatientDto patientsDto) {
        Patient patient = new Patient();
        patient.setTitle(patientsDto.getTitle());
        patient.setAddress(patientsDto.getAddress());
        patient.setFirstName(patientsDto.getFirstName());
        patient.setLastName(patientsDto.getLastName());
        patient.setDateOfBirth(patientsDto.getDateOfBirth());
        patient.setEmail(patientsDto.getEmail());
        patient.setNic(patientsDto.getNic());
        patient.setGender(patientsDto.getGender());
        patient.setGuardianName(patientsDto.getGuardianName());
        patient.setGuardianMobileNumber(patientsDto.getGuardianMobileNumber());
        patient.setPassword(passwordEncoder.encode(patientsDto.getPassword()));
        patient.setMobileNumber(patientsDto.getMobileNumber());
        UserCredential userCredential = new UserCredential();
        userCredential.setName(patientsDto.getEmail());
        userCredential.setEmail(patientsDto.getEmail());
        userCredential.setRoles("Patient");
        userCredential.setPassword(passwordEncoder.encode(patientsDto.getPassword()));
        patient.setUserCredential(userCredential);
        // repository.save(credential);
        patientRepository.save(patient);
        // repository.save(userCredential);
        return "user added to the system";
    }

    public String addPatient(PatientDto patientsDto) {
        Patient patient = new Patient();
        patient.setTitle(patientsDto.getTitle());
        patient.setAddress(patientsDto.getAddress());
        patient.setFirstName(patientsDto.getFirstName());
        patient.setLastName(patientsDto.getLastName());
        patient.setDateOfBirth(patientsDto.getDateOfBirth());
        patient.setEmail(patientsDto.getEmail());
        patient.setNic(patientsDto.getNic());
        patient.setGender(patientsDto.getGender());
        patient.setGuardianName(patientsDto.getGuardianName());
        patient.setGuardianMobileNumber(patientsDto.getGuardianMobileNumber());
        String randomPass = alphaNumericString(10);
        System.out.println("random password --------->" + randomPass);
        patient.setPassword(passwordEncoder.encode(randomPass));
        patient.setMobileNumber(patientsDto.getMobileNumber());
        UserCredential userCredential = new UserCredential();
        userCredential.setName(patientsDto.getEmail());
        userCredential.setEmail(patientsDto.getEmail());
        userCredential.setRoles("Patient");
        userCredential.setPassword(passwordEncoder.encode(randomPass));
        patient.setUserCredential(userCredential);
        // repository.save(credential);
        patientRepository.save(patient);
        // repository.save(userCredential);
        return "user added to the system";
    }

    public static String alphaNumericString(int len) {
        String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random rnd = new Random();

        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        return sb.toString();
    }

    public String generateToken(Authentication authenticate) {
        return jwtService.generateToken(authenticate);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }


    public List<Patient> getStafListByIds(List<Long> ids) {
        return patientRepository.findByIdIn(ids);
    }
    public ResponseEntity<Patient> findByUserId(Long Id){
		Patient pa = patientRepository.findById(Id).orElseThrow();
				
		return ResponseEntity.ok(pa);
    }

    public List<Patient> allPatient() {

        return patientRepository.findAll();
    }

    public Optional<Patient> findByEmailID(String email) {
        return patientRepository.findByEmail(email);
    }
    
    public Optional<Patient> findBYUserId(Long id) {
        return patientRepository.findById(id);
    }

    public boolean passwordChange(String currentPassword, String newPassword, String request) {
        HttpHeaders headers = new HttpHeaders();
        //HttpServletRequest request = null;
        //  String token= request.getHeader("loggedUser");
        System.out.println("--->" + request);

        // String username=  jwtService.getUserNameFromJwtToken(token);
        //  System.out.printf("username---------->"+token);
        Optional<UserCredential> user = repository.findByName(request);

        //  if (user.isPresent()) {
        UserCredential userCredential = user.get();

        if (passwordEncoder.matches(currentPassword, userCredential.getPassword())) {
            userCredential.setPassword(passwordEncoder.encode(newPassword));
            repository.save(userCredential);
            System.out.printf("hhhhh");
            return true;
        } else {
            System.out.printf("uuuuu");
            return false;
        }

    }
}
