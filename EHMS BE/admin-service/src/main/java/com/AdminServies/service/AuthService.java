package com.AdminServies.service;

import com.AdminServies.dto.HospitalDto;
import com.AdminServies.entity.Hospital;
import com.AdminServies.entity.UserCredential;
import com.AdminServies.repository.HospitalRepository;
import com.AdminServies.repository.UserCredentialRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    private UserCredentialRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private HospitalRepository hospitalRepository;


    public String saveUser(UserCredential credential) {
        credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        repository.save(credential);
        return "user added to the system";
    }

    public long getCount(String name) {
        return repository.countByName(name);
    }

    public List<Object> getGroupCount() {
        return repository.getByRoles();
    }

    @Transactional()
    public List<UserCredential> get(String role) {
        List<UserCredential> doctor = repository.findByRoles(role);
        System.out.println(doctor);
        ///  String name=doctor.get().getName();
        return doctor;
    }

    public List<Hospital> getAllHospital() {
        List<Hospital> hospital = hospitalRepository.findAll();
        System.out.println(hospital);
        ///  String name=doctor.get().getName();
        return hospital;
    }


    public String generateToken(Authentication authenticate) {
        return jwtService.generateToken(authenticate);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }

    public String saveUser(HospitalDto hospitalDto) {


        Hospital hospital = new Hospital();
        hospital.setName(hospitalDto.getName());
        hospital.setBranch(hospitalDto.getBranch());
        hospital.setMobileNumber(hospitalDto.getMobileNumber());
        hospitalRepository.save(hospital);
        return "user added to the system";
    }


    public List<UserCredential> getStafListByIds(List<Integer> ids) {
        return repository.findByIdIn(ids);
    }

    //get All doctor...
    public List<Object> findAllDoctor() {
        return repository.getAllDoctor();
    }

    //get All HRP...
    public List<Object> findAllHRP() {
        return repository.getAllHRP();
    }

    //get All nurse...
    public List<Object> findAllNurse() {
        return repository.getAllNurse();
    }
   
}
