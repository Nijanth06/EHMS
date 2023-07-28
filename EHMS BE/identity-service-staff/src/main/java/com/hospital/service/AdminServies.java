package com.hospital.service;

import com.hospital.dto.UserCredentialDto;
import com.hospital.entity.UserCredential;
import com.hospital.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class AdminServies {

    @Autowired
    private UserCredentialRepository userCredentialRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    public String generateToken(Authentication authenticate) {
        return jwtService.generateToken(authenticate);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }

    public String saveAdmin(UserCredentialDto userCredentialDto) {

        UserCredential userCredential = new UserCredential();
        userCredential.setName(userCredentialDto.getEmail());
        userCredential.setEmail(userCredentialDto.getEmail());
        userCredential.setNic(userCredentialDto.getNic());
        userCredential.setFirstName(userCredentialDto.getFirstName());
        userCredential.setTitle(userCredentialDto.getTitle());
        userCredential.setHospitalId(userCredentialDto.getHospitalId());
        userCredential.setLastName(userCredentialDto.getLastName());
        userCredential.setMobileNumber(userCredentialDto.getMobileNumber());
        userCredential.setAddress(userCredentialDto.getAddress());
        userCredential.setSpecialization(userCredentialDto.getSpecialization());
        userCredential.setYearOfExp(userCredentialDto.getYearOfExp());
        userCredential.setImageFile(null);
        String randomPass = alphaNumericString(10);
        System.out.println("random password --------->" + randomPass);
        userCredential.setPassword(passwordEncoder.encode(randomPass));
        userCredential.setRoles(userCredentialDto.getRoleName());
        userCredentialRepository.save(userCredential);

        return "user added to the system";
    }
    private static Random rnd = new Random();

    public static String alphaNumericString(int len) {
        String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        return sb.toString();
    }

    public boolean passwordChange(String currentPassword, String newPassword, String request) {
        HttpHeaders headers = new HttpHeaders();
        System.out.println("--->" + request);
        Optional<UserCredential> user = userCredentialRepository.findByName(request);
        UserCredential userCredential = user.get();

        if (passwordEncoder.matches(currentPassword, userCredential.getPassword())) {
            userCredential.setPassword(passwordEncoder.encode(newPassword));
            userCredentialRepository.save(userCredential);
            System.out.printf("hhhhh");
            return true;
        } else {
            System.out.printf("uuuuu");
            return false;
        }
    }


}
