package com.hospital.controller;

import com.hospital.dto.*;
import com.hospital.entity.*;
import com.hospital.enums.RestApiResponseStatus;
import com.hospital.repository.UserCredentialRepository;
import com.hospital.service.AdminServies;
import com.hospital.service.JwtService;
import com.hospital.service.RefreshTokenService;

import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AdminServies servies;
    @Autowired
    UserCredentialRepository userCredentialRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    JwtService jwtService;
    @Autowired
    private RestTemplate template;
    RestApiResponseDto response = new RestApiResponseDto();
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    RefreshTokenService refreshTokenService;

    @PostMapping("/token")
    public ResponseEntity<?> getToken(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            String jwt = servies.generateToken(authenticate);
            Optional<UserCredential> userCredential = userCredentialRepository.findByName(authenticate.getName());
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userCredential.get().getId());
            return ResponseEntity.ok(new JwtResponse(jwt, refreshToken));
        } else {
            throw new RuntimeException("invalid access");
        }
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshtoken(@RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();
        return refreshTokenService.findByToken(requestRefreshToken).map(refreshTokenService::verifyExpiration).map(RefreshToken::getUser).map(user -> {
            String token = jwtService.generateToken(user.getName());
            return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
        }).orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        servies.validateToken(token);
        return "Token is valid";
    }

    @PostMapping("/register")
    public ResponseEntity<Object> addRegister(@RequestBody UserCredentialDto userCredentialDto) {

        if (userCredentialRepository.existsByEmail(userCredentialDto.getEmail())) {

            LOGGER.info("Email already exists");
            response.setCode(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getCode());
            response.setMessage(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getStatus());
            return ResponseEntity.ok().body(response.getCode());

        }

        if (userCredentialRepository.existsByNic(userCredentialDto.getNic())) {

            LOGGER.info("NIC is already exists");
            response.setCode(RestApiResponseStatus.NIC_ALREADY_EXISTS.getCode());
            response.setMessage(RestApiResponseStatus.NIC_ALREADY_EXISTS.getStatus());
            return ResponseEntity.ok().body(response.getCode());
        }
        servies.saveAdmin(userCredentialDto);
        LOGGER.info("Receptionist add Successfully {}", userCredentialDto);
        response.setCode(RestApiResponseStatus.CREATED.getCode());
        response.setMessage(RestApiResponseStatus.CREATED.getStatus());
        return ResponseEntity.ok(response);

    }

    @PostMapping("/passwordChange")
    public ResponseEntity<Object> addRegisters(@RequestBody passwordRequest passwordRequest) {
        LOGGER.info("passwordChange");
        Boolean responses = servies.passwordChange(passwordRequest.getCurrentPassword(), passwordRequest.getNewPassword(), passwordRequest.getUsernmae());

        if (responses.equals(true)) {
            response.setCode(RestApiResponseStatus.CREATED.getCode());
            response.setMessage(RestApiResponseStatus.CREATED.getStatus());
            return ResponseEntity.ok(response.getCode());
        } else {
            LOGGER.info("Password Incorrect");
            response.setCode(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getCode());
            response.setMessage(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getStatus());
            return ResponseEntity.ok().body(response.getCode());
        }

    }

}
