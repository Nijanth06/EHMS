package com.AdminServies.controller;

import com.AdminServies.dto.*;
import com.AdminServies.entity.Hospital;
import com.AdminServies.entity.UserCredential;
import com.AdminServies.enums.RestApiResponseStatus;
import com.AdminServies.repository.HospitalRepository;
import com.AdminServies.repository.UserCredentialRepository;
import com.AdminServies.service.AuthService;
import com.AdminServies.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AuthController {
    @Autowired
    private AuthService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private HospitalRepository repository;

    RestApiResponseDto response = new RestApiResponseDto();
    @Autowired
    JwtService jwtService;

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private RestTemplate template;

    @Autowired
    private UserCredentialRepository userCredentialRepository;


    @GetMapping("/allEmployeeCount")
    public List<Object> master() {
        return service.getGroupCount();
    }


    @PostMapping("/addReceptionist")
    public ResponseEntity<Object> addReceptionist(@RequestBody ReceptionistDto receptionistDto, HttpServletRequest request) {
        //ResponseEntity<Object> response = template.postForEntity( "http://localhost:9898/admin/addReceptionist", receptionistDto , Object.class );

        // String token="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQWRtaW4iLCJzdWIiOiJhZ2lAZ21haWwuY29tIiwiaWF0IjoxNjgyMTkwNTMwLCJleHAiOjE2ODIxOTQxMzB9._acz3qAZ55pbMTDdTCFKhNLP0_UmKBxI-qaJKtxwTDQ";

        HttpHeaders headers = new HttpHeaders();
        //HttpServletRequest request = null;
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        System.out.println("--->" + token);
        // String KK= request.getHeader();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);
        // headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        //    HttpHeaders headers = new HttpHeaders();

        receptionistDto.setRoleName("Receptionist");

        HttpEntity<?> entityReq = new HttpEntity<>(receptionistDto, headers);

        ResponseEntity<Object> response = template.exchange("http://localhost:9898/api/register", HttpMethod.POST, entityReq, Object.class);

        Object code = response.getStatusCode();
        Object msg = response.getBody();
        System.out.printf("msg-->" + msg);
        System.out.printf("nn-->" + code);
        if (msg.equals(400)) {
            System.out.printf("ressuuuuA:--------------------->" + response.getBody());
            return ResponseEntity.badRequest().body(response);
        }
        if (msg.equals(5002)) {
            System.out.printf("ressuuuuA:--------------------->" + response.getBody());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response.getBody());
    }


    @PostMapping("/doctorRegister")
    public ResponseEntity<Object> addDoctor(@RequestBody DoctorDto doctorDto, HttpServletRequest request) {


        HttpHeaders headers = new HttpHeaders();
        //HttpServletRequest request = null;
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        System.out.println("--->" + token);
        // String KK= request.getHeader();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);


        doctorDto.setRoleName("Doctor");

        HttpEntity<?> entityReq = new HttpEntity<>(doctorDto, headers);

        ResponseEntity<Object> response = template.exchange("http://localhost:9898/api/register", HttpMethod.POST, entityReq, Object.class);
        //if(response.getBody().equals("EMAIL_ALREADY_EXISTS")) {
        // System.out.printf("ressA:--------------------->"+response.getBody());
        //return ResponseEntity.badRequest().body(response);
        //}
        //}else{
        // return ResponseEntity.badRequest().body(response);
// }
        //  System.out.printf("ressA:--------------------->"+response.getBody
        //
        Object code = response.getStatusCode();
        Object msg = response.getBody();
        System.out.printf("msg-->" + msg);
        System.out.printf("nn-->" + code);
        if (msg.equals(400)) {
            System.out.printf("ressuuuuA:--------------------->" + response.getBody());
            return ResponseEntity.badRequest().body(response);
        }

        if (msg.equals(5002)) {
            System.out.printf("ressuuuuA:--------------------->" + response.getBody());
            return ResponseEntity.badRequest().body(response);
        }
        //  if(response.getBody().equals("400")) {
        //      System.out.printf("ressuuuuA:--------------------->" + response.getStatusCode());
        //  }
        ResponseEntity<Object> response2 = template.exchange("http://localhost:9899/doctor/add", HttpMethod.POST, entityReq, Object.class);
        return ResponseEntity.ok().body(response.getBody());
    }

    @PostMapping("/nurseRegister")
    public ResponseEntity<Object> addNurse(@RequestBody NurseDto nurseDto, HttpServletRequest request) {


        HttpHeaders headers = new HttpHeaders();
        //HttpServletRequest request = null;
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        System.out.println("--->" + token);
        // String KK= request.getHeader();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);


        nurseDto.setRoleName("Nurse");

        HttpEntity<?> entityReq = new HttpEntity<>(nurseDto, headers);

        ResponseEntity<Object> response = template.exchange("http://localhost:9898/api/register", HttpMethod.POST, entityReq, Object.class);


        Object code = response.getStatusCode();
        Object msg = response.getBody();
        System.out.printf("msg-->" + msg);
        System.out.printf("nn-->" + code);
        if (msg.equals(400)) {
            System.out.printf("ressuuuuA:--------------------->" + response.getBody());
            return ResponseEntity.badRequest().body(response);
        }
        if (msg.equals(5002)) {
            System.out.printf("ressuuuuA:--------------------->" + response.getBody());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response.getBody());
    }

    @PostMapping("/recordPersonRegister")
    public ResponseEntity<Object> addRecordPerson(@RequestBody RecordPersonDto recordPersonDto, HttpServletRequest request) {


        HttpHeaders headers = new HttpHeaders();
        //HttpServletRequest request = null;
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        System.out.println("--->" + token);
        // String KK= request.getHeader();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);


        recordPersonDto.setRoleName("RecordPerson");

        HttpEntity<?> entityReq = new HttpEntity<>(recordPersonDto, headers);

        ResponseEntity<Object> response = template.exchange("http://localhost:9898/api/register", HttpMethod.POST, entityReq, Object.class);


        Object code = response.getStatusCode();
        Object msg = response.getBody();
        System.out.printf("msg-->" + msg);
        System.out.printf("nn-->" + code);
        if (msg.equals(400)) {
            System.out.printf("ressuuuuA:--------------------->" + response.getBody());
            return ResponseEntity.badRequest().body(response);
        }

        if (msg.equals(5002)) {
            System.out.printf("ressuuuuA:--------------------->" + response.getBody());
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/Employee/{role}")
    public ResponseEntity<List<UserCredential>> getAllEmployee(@PathVariable("role") String role) {
        //  try {
        //   List<UserCredential> doctor = new ArrayList<UserCredential>();
        List<UserCredential> userCredentialList = service.get(role);
        //  return doctor;
        for (UserCredential userCredential : userCredentialList) {
            String hospitalid = userCredential.getHospitalId();
            Optional<Hospital> hospital = repository.findById(Integer.valueOf(hospitalid));
            String hospitalName = hospital.get().getName();
            userCredential.setHospitalId(hospitalName);
        }
        if (userCredentialList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(userCredentialList, HttpStatus.OK);


    }


    @GetMapping("/hospital/all")
    public ResponseEntity<List<?>> getAllHospital() {
        List<Hospital> hospitalList = service.getAllHospital();
        if (hospitalList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        // return ResponseEntity.ok(hospitalList).b;
        return new ResponseEntity<>(hospitalList, HttpStatus.OK);
    }

    @PostMapping("/hospital/register")
    public ResponseEntity<Object> addNewHospital(@RequestBody HospitalDto hospitalDto) {


        if (repository.existsByNameAndBranch(hospitalDto.getName(), hospitalDto.getBranch())) {

            //   LOGGER.info("Hospital is already exists");
            response.setCode(RestApiResponseStatus.ALREADY_EXISTS.getCode());
            response.setMessage(RestApiResponseStatus.ALREADY_EXISTS.getStatus());
            return ResponseEntity.badRequest().body(response);


        }

        service.saveUser(hospitalDto);
        LOGGER.info("Hospital created Successfully {}", hospitalDto);
        response.setCode(RestApiResponseStatus.CREATED.getCode());
        response.setMessage(RestApiResponseStatus.CREATED.getStatus());
        return ResponseEntity.ok(hospitalDto);
        // return
    }

    @PutMapping("/approval/{email}")
    public ResponseEntity<Object> updateRequest(@RequestBody userProfileDto approvalUserProfileDto, @PathVariable("email") String email) {
        Optional<UserCredential> userCredentialdate = userCredentialRepository.findByEmail(email);

        if (userCredentialdate.isPresent()) {
            UserCredential userCredential = userCredentialdate.get();

            // userCredential.setNic(approvalUserProfileDto.getNic());
            userCredential.setFirstName(approvalUserProfileDto.getFirstName());
            //    userCredential.setTitle(us.getTitle());
            //     userCredential.setHospitalId(approvalUserProfileDto.getHospitalId());
            userCredential.setLastName(approvalUserProfileDto.getLastName());
            userCredential.setMobileNumber(approvalUserProfileDto.getMobileNumber());
            userCredential.setAddress(approvalUserProfileDto.getAddress());
            userCredential.setSpecialization(approvalUserProfileDto.getSpecialization());
            userCredential.setYearOfExp(approvalUserProfileDto.getYearOfExp());
            userCredential.setImageFile(approvalUserProfileDto.getImageFile());
            //   hospitalsdata.setHospialname(hospitalDto.getHospialname());
            //   hospitalsdata.setPhonenumber(hospitalDto.getPhonenumber());
            //  hospitalsdata.setLocation(hospitalDto.getLocation());
            // LocalDateTime localDate = LocalDateTime.now();
            //hospitalsdata.setCreatat(String.valueOf(localDate));
            //  receptionistdate.setSpecialzation(receptionistUpdateDto.getSpecialization());


            return new ResponseEntity<>(userCredentialRepository.save(userCredential), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*
     * @PutMapping("/receptionistUpdate/{email}") public ResponseEntity<Object>
     * updateReceptionist(@RequestBody userProfileDto
     * approvalUserProfileDto, @PathVariable("email") String email) {
     * Optional<UserCredential> userCredentialdate =
     * userCredentialRepository.findByEmail(email);
     *
     * if (userCredentialdate.isPresent()) { UserCredential userCredential=
     * userCredentialdate.get();
     * userCredential.setFirstName(approvalUserProfileDto.getFirstName());
     * userCredential.setLastName(approvalUserProfileDto.getLastName());
     * userCredential.setMobileNumber(approvalUserProfileDto.getMobileNumber());
     * userCredential.setAddress(approvalUserProfileDto.getAddress());
     * userCredential.setImageFile(approvalUserProfileDto.getImageFile()); return
     * new ResponseEntity<>(userCredentialRepository.save(userCredential),
     * HttpStatus.OK); } else { return new ResponseEntity<>(HttpStatus.NOT_FOUND); }
     * }
     */
    @GetMapping("/profile/{email}")
    public ResponseEntity<Object> getALLByEmail(@PathVariable("email") String email) {
        LOGGER.info("get All Email method is invoked");
        Optional<UserCredential> userCredentialdate = userCredentialRepository.findByEmail(email);
        if (userCredentialdate.isPresent()) {
            UserCredential userCredential = userCredentialdate.get();
            UserCredentialResponseDto userCredentialDto = new UserCredentialResponseDto();
            userCredentialDto.setEmail(userCredential.getEmail());
            userCredentialDto.setAddress(userCredential.getAddress());
            userCredentialDto.setFirstName(userCredential.getFirstName());
            userCredentialDto.setLastName(userCredential.getLastName());
            String hospitalid = userCredential.getHospitalId();
            Optional<Hospital> hospital = repository.findById(Integer.valueOf(hospitalid));
            userCredentialDto.setHospitalId(hospital.get().getName());
            userCredentialDto.setNic(userCredential.getNic());
            userCredentialDto.setSpecialization(userCredential.getSpecialization());
            userCredentialDto.setMobileNumber(userCredential.getMobileNumber());
            userCredentialDto.setYearOfExp(userCredential.getYearOfExp());
            userCredentialDto.setTitle(userCredential.getTitle());
            userCredentialDto.setImageFile(userCredential.getImageFile());
            return new ResponseEntity<>(userCredentialDto, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*
     * @GetMapping("/receptionistProfile/{email}") public ResponseEntity<Object>
     * getByEmail(@PathVariable("email") String email) {
     * LOGGER.info("get All Email method is invoked"); Optional<UserCredential>
     * userCredentialdate = userCredentialRepository.findByEmail(email); if
     * (userCredentialdate.isPresent()) { UserCredential userCredential =
     * userCredentialdate.get(); UserCredentialResponseDto userCredentialDto= new
     * UserCredentialResponseDto();
     * userCredentialDto.setEmail(userCredential.getEmail());
     * userCredentialDto.setAddress(userCredential.getAddress());
     * userCredentialDto.setFirstName(userCredential.getFirstName());
     * userCredentialDto.setLastName(userCredential.getLastName()); String
     * hospitalid= userCredential.getHospitalId(); Optional<Hospital> hospital=
     * repository.findById(Integer.valueOf(hospitalid));
     * userCredentialDto.setHospitalId(hospital.get().getName());
     * userCredentialDto.setNic(userCredential.getNic());
     * userCredentialDto.setMobileNumber(userCredential.getMobileNumber());
     * userCredentialDto.setTitle(userCredential.getTitle());
     * userCredentialDto.setImageFile(userCredential.getImageFile()); return new
     * ResponseEntity<>(userCredentialDto, HttpStatus.OK);
     *
     * } else
     *
     * { return new ResponseEntity<>(HttpStatus.NOT_FOUND); } }
     */
    //for receptionist
    @GetMapping("/recep/hosProfile")
    public ResponseEntity<Object> getHospitalsId(@RequestHeader("loggedUser") String userName) {
        System.out.println("User name" + userName);
        Optional<UserCredential> userCredentialdate = userCredentialRepository.findByEmail(userName);
        if (userCredentialdate.isPresent()) {
            UserCredential userCredential = userCredentialdate.get();
            UserCredentialResponseDto userCredentialDto = new UserCredentialResponseDto();

            String hospitalid = userCredential.getHospitalId();
            userCredentialDto.setHospitalId(hospitalid);
            Optional<Hospital> hospital = repository.findById(Integer.valueOf(hospitalid));
            return new ResponseEntity<>(userCredentialDto, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/profiles/{id}")
    public ResponseEntity<Object> getALLByID(@PathVariable("id") int id) {
        Optional<UserCredential> userCredentialdate = userCredentialRepository.findById(id);
        if (userCredentialdate.isPresent()) {
            UserCredential userCredential = userCredentialdate.get();
            UserCredentialResponseDto userCredentialDto = new UserCredentialResponseDto();
            userCredentialDto.setEmail(userCredential.getEmail());
            userCredentialDto.setAddress(userCredential.getAddress());
            userCredentialDto.setFirstName(userCredential.getFirstName());
            userCredentialDto.setLastName(userCredential.getLastName());
            String hospitalid = userCredential.getHospitalId();
            Optional<Hospital> hospital = repository.findById(Integer.valueOf(hospitalid));
            userCredentialDto.setHospitalId(hospital.get().getName());
            userCredentialDto.setNic(userCredential.getNic());
            userCredentialDto.setSpecialization(userCredential.getSpecialization());
            userCredentialDto.setMobileNumber(userCredential.getMobileNumber());
            userCredentialDto.setYearOfExp(userCredential.getYearOfExp());
            userCredentialDto.setTitle(userCredential.getTitle());
            return new ResponseEntity<>(userCredentialDto, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/hospitals")
    public List<Hospital> getHospitalByIds(@RequestParam("ids") List<Integer> ids) {
        return repository.findByIdIn(ids);
    }

    @GetMapping("/hospitalId/{id}")
    public Optional<Hospital> getHospitalById(@PathVariable("id") int id) {
        return repository.findById(id);
    }

    @GetMapping("/Employees")
    public List<UserCredential> getStafListByIds(@RequestParam("ids") List<Integer> ids) {
        return service.getStafListByIds(ids);
    }
    @GetMapping("/allDoctors")
    public List<Object> getDoctors() {
        return service.findAllDoctor();
    }
    @GetMapping("/allHealthRecordPerson")
    public List<Object> getHealthRecordPerson() {
        return service.findAllHRP();
    }
    @GetMapping("/ ")
    public List<Object> getNurse() {
        return service.findAllNurse();
    }
    
}


