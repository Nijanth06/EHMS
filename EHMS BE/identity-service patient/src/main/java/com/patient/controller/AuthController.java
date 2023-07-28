package com.patient.controller;

import com.patient.dto.*;
import com.patient.entity.Patient;
import com.patient.entity.RefreshToken;
import com.patient.entity.UserCredential;
import com.patient.enums.RestApiResponseStatus;
import com.patient.repository.PatientRepository;
import com.patient.repository.UserCredentialRepository;
import com.patient.service.AuthService;
import com.patient.service.JwtService;
import com.patient.service.PatientServices;
import com.patient.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController

@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService service;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    UserCredentialRepository userCredentialRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    PatientServices patientServices;

    @Autowired
    RestTemplate template;

    RestApiResponseDto response = new RestApiResponseDto();
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<Object> addNewUser(@RequestBody PatientDto patientDto) {



        if (patientServices.isExistsByEmail(patientDto.getEmail())) {



            LOGGER.info("Email already exists");
            response.setCode(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getCode());
            response.setMessage(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getStatus());
            return ResponseEntity.badRequest().body(response);



        }



        if (patientServices.isExistsByNic(patientDto.getNic())) {
            LOGGER.info("Nic already exists");
            response.setCode(RestApiResponseStatus.NIC_ALREADY_EXISTS.getCode());
            response.setMessage(RestApiResponseStatus.NIC_ALREADY_EXISTS.getStatus());
            return ResponseEntity.badRequest().body(response);
        }

        service.saveUser(patientDto);
        LOGGER.info("Patient created Successfully {}", patientDto);
        response.setCode(RestApiResponseStatus.CREATED.getCode());
        response.setMessage(RestApiResponseStatus.CREATED.getStatus());
        HttpEntity<?> entityReq = new HttpEntity<>(patientDto);
        ResponseEntity<Object>response2 = template.exchange("http://localhost:9899/doctor/patientAdd", HttpMethod.POST,
                entityReq, Object.class);
        return ResponseEntity.ok(response);




    }

    @PostMapping("/token")
    public ResponseEntity<?> getToken(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
          String  jwt=  service.generateToken(authenticate);
            Optional<UserCredential> userCredential= userCredentialRepository.findByName(authenticate.getName());
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userCredential.get().getId());



            return ResponseEntity.ok(new JwtResponse(jwt,refreshToken));
        } else {
            throw new RuntimeException("invalid access");
        }
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        service.validateToken(token);
        return "Token is valid";
    }

    @GetMapping("/all")
public String userget( HttpServletResponse response){
        Cookie cookie = new Cookie("username", "Jovan");
        cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
        cookie.setSecure(true);
        cookie.setHttpOnly(true);

//add cookie to response
        response.addCookie(cookie);


        return

                "Get all user";
}
    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshtoken( @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtService.generateToken(user.getName());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database!"))
                       ;
    }

    @GetMapping("/patient")
    public List<Patient> getPatientsByIds(@RequestParam("ids") List<Long> ids) {
        return service.getStafListByIds(ids);
    }




    @GetMapping("/profile")
    public ResponseEntity<?> getAllProfile(@RequestHeader("loggedUser") String userName){
        System.out.println(userName);
        // HttpEntity<?> entityReq = new HttpEntity<>();
      //  ResponseEntity<Object> response = template.getForEntity( "http://localhost:9896/admin//profile/{email}", Object.class,userName );
        Optional<Patient> userCredential= patientRepository.findByEmail(userName);

                return new ResponseEntity<>(userCredential, HttpStatus.OK);
        //   return "Doctor All"+Usernmae;
    }

    @PutMapping("/patientUpdate")
    public ResponseEntity<Object> updateRequest(@RequestBody PatientDto patientDto, @RequestHeader("loggedUser") String userName) {
        Optional<Patient> userCredentialdate = patientRepository.findByEmail(userName);

        if (userCredentialdate.isPresent()) {
            Patient userCredential= userCredentialdate.get();

            userCredential.setFirstName(patientDto.getFirstName());
            userCredential.setLastName(patientDto.getLastName());
            userCredential.setMobileNumber(patientDto.getMobileNumber());
            userCredential.setAddress(patientDto.getAddress());
            userCredential.setGuardianMobileNumber(patientDto.getGuardianMobileNumber());
            userCredential.setGuardianName(patientDto.getGuardianName());

            userCredential.setImageFile(patientDto.getImageFile());

            return new ResponseEntity<>(patientRepository.save(userCredential), HttpStatus.OK);
        }  else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/passwordChange")
    public ResponseEntity<Object> addRegisters(@RequestBody passwordRequest passwordRequest,@RequestHeader("loggedUser") String Usernmae) {
        passwordRequest.setUsernmae(Usernmae);
        Boolean responses = service.passwordChange(passwordRequest.getCurrentPassword(), passwordRequest.getNewPassword(), passwordRequest.getUsernmae());


        if(responses.equals(true)){
            response.setCode(RestApiResponseStatus.CREATED.getCode());
            response.setMessage(RestApiResponseStatus.CREATED.getStatus());
            return ResponseEntity.ok(response.getCode());
        }else{
            LOGGER.info("Password Incorrect");
            response.setCode(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getCode());
            response.setMessage(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getStatus());
            return ResponseEntity.ok().body(response.getCode());
        }


    }

    @PostMapping("/addpatient")
    public ResponseEntity<Object> addPatient(@RequestBody PatientDto patientDto) {



        if (patientServices.isExistsByEmail(patientDto.getEmail())) {
            LOGGER.info("Email already exists");
            response.setCode(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getCode());
            response.setMessage(RestApiResponseStatus.EMAIL_ALREADY_EXISTS.getStatus());
            return ResponseEntity.badRequest().body(response);



        }



        if (patientServices.isExistsByNic(patientDto.getNic())) {
            LOGGER.info("Nic already exists");
            response.setCode(RestApiResponseStatus.NIC_ALREADY_EXISTS.getCode());
            response.setMessage(RestApiResponseStatus.NIC_ALREADY_EXISTS.getStatus());
            return ResponseEntity.badRequest().body(response);
        }
        service.saveUser(patientDto);
        LOGGER.info("Patient created Successfully {}", patientDto);
        response.setCode(RestApiResponseStatus.CREATED.getCode());
        response.setMessage(RestApiResponseStatus.CREATED.getStatus());
        HttpEntity<?> entityReq = new HttpEntity<>(patientDto);
        ResponseEntity<Object>response2 = template.exchange("http://localhost:9899/doctor/patientAdd", HttpMethod.POST,
                entityReq, Object.class);
        return ResponseEntity.ok(response);



    }
    @GetMapping("/profileEmail")
    public ResponseEntity<Object> getAllProfilegetEmail(@RequestHeader("loggedUser") String userName){

        Optional<Patient> userCredentialdate = patientRepository.findByEmail(userName);

        if (userCredentialdate.isPresent()) {
            Patient userCredential= userCredentialdate.get();
            return new ResponseEntity<>(userCredential, HttpStatus.OK);
        }  else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

}
