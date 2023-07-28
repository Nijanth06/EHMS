package com.sample.receptionistservice.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sample.receptionistservice.Repostry.ReceptionistRepository;
import com.sample.receptionistservice.dto.PasswordRequest;
import com.sample.receptionistservice.dto.PatientDto;
import com.sample.receptionistservice.dto.ReceptionistDto;
import com.sample.receptionistservice.dto.RestApiResponseDto;
import com.sample.receptionistservice.dto.UserProfileDto;
import com.sample.receptionistservice.entity.Receptionist;
import com.sample.receptionistservice.enums.RestApiResponseStatus;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/receptionist")

public class Receptionist_Controller {
	@Autowired
	private ReceptionistRepository receptionistRepository;
	@Autowired
	private RestTemplate template;

	private static final Logger LOGGER = LoggerFactory.getLogger(Receptionist_Controller.class);

	RestApiResponseDto response = new RestApiResponseDto();

	
	@PostMapping("/addPatient")
	public ResponseEntity<Object> addPatient(@RequestBody PatientDto patientDto, HttpServletRequest request) {
		LOGGER.info("add Patient method invoked");
		HttpHeaders headers = new HttpHeaders();
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		System.out.println("--->" + token);
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + token);

		patientDto.setRoleName("Patient");

		HttpEntity<?> entityReq = new HttpEntity<>(patientDto, headers);
		System.out.printf("patientDto-->" + patientDto);

		ResponseEntity<Object> response = template.exchange("http://localhost:9897/auth/addpatient", HttpMethod.POST,
				entityReq, Object.class);

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

	@PostMapping("/updateProfile")
	public ResponseEntity<Object> updateProfile(@RequestBody UserProfileDto approvalUserProfileDto,
			@RequestHeader("loggedUser") String Usernmae) {
		System.out.printf("username----->" + Usernmae);
		HttpEntity<?> entityReq = new HttpEntity<>(approvalUserProfileDto);
		ResponseEntity<Object> response = template.exchange("http://localhost:9896/admin/approval/{email}",
				HttpMethod.PUT, entityReq, Object.class, Usernmae);

		return ResponseEntity.ok(response.getBody());
		// return "Doctor All"+Usernmae;
	}

	@PostMapping("/passwordChange")
	public ResponseEntity<Object> addRegister(@RequestBody PasswordRequest passwordRequest,
			@RequestHeader("loggedUser") String Usernmae) {
		passwordRequest.setUsernmae(Usernmae);
		HttpHeaders headers = new HttpHeaders();

		HttpEntity<?> entityReq = new HttpEntity<>(passwordRequest, headers);

		ResponseEntity<Object> responses = template.postForEntity("http://localhost:9898/api/passwordChange", entityReq,
				Object.class);

		Object code = responses.getStatusCode();
		Object msg = responses.getBody();
		System.out.printf("msg-->" + msg);
		System.out.printf("nn-->" + code);
		if (msg.equals(2000)) {
			System.out.printf("ressuuuuA:--------------------->" + responses.getBody());
			response.setCode(RestApiResponseStatus.CREATED.getCode());
			response.setMessage(RestApiResponseStatus.CREATED.getStatus());
			return ResponseEntity.ok(response);
		}
		if (msg.equals(400)) {
			System.out.printf("ressuuuub:--------------------->" + responses.getBody());
			response.setCode(RestApiResponseStatus.INCORRECT_PASSWORD.getCode());
			response.setMessage(RestApiResponseStatus.INCORRECT_PASSWORD.getStatus());
			// return ResponseEntity.ok().body(response.getCode());
			return ResponseEntity.badRequest().body(response);
		}

		return ResponseEntity.ok(responses.getBody());

		// return ResponseEntity.ok(response.getBody());
	}

	@GetMapping("/profile")
	public ResponseEntity<Object> getAllProfile(@RequestHeader("loggedUser") String userName) {
		LOGGER.info("getAll Profile method invoked");

		// HttpEntity<?> entityReq = new HttpEntity<>();
		ResponseEntity<Object> response = template.getForEntity("http://localhost:9896/admin/profile/{email}",
				Object.class, userName);

		return ResponseEntity.ok(response.getBody());
		// return "Doctor All"+Usernmae;
	}

	@PostMapping("/add")
	public ResponseEntity<Receptionist> add(@RequestBody ReceptionistDto receptionistDto) {
		LOGGER.info("Add receptionist is working");
		Receptionist receptionist = new Receptionist();
		receptionist.setName(receptionist.getEmail());
		receptionist.setEmail(receptionistDto.getEmail());
		receptionist.setHospitalId(receptionistDto.getHospitalId());
		receptionist.setFirstName(receptionistDto.getFirstName());
		receptionist.setLastName(receptionistDto.getLastName());
		receptionist.setMobileNumber(receptionistDto.getMobileNumber());

		return ResponseEntity.ok(receptionistRepository.save(receptionist));
	}
}
