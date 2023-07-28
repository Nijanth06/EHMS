package com.sample.demodoctor.Controller;

import com.sample.demodoctor.dto.*;
import com.sample.demodoctor.entity.Avabiles;
import com.sample.demodoctor.entity.Patient;
import com.sample.demodoctor.entity.doctor;
import com.sample.demodoctor.enums.RestApiResponseStatus;
import com.sample.demodoctor.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.sample.demodoctor.dto.AvabilesDto;
import com.sample.demodoctor.dto.DoctorDto;
import com.sample.demodoctor.dto.doctorRequest;
import com.sample.demodoctor.dto.PasswordRequest;
import com.sample.demodoctor.dto.PatientDto;
import com.sample.demodoctor.dto.PrescriptionDto;
import com.sample.demodoctor.dto.RestApiResponseDto;
import com.sample.demodoctor.dto.SearchDoctorDto;
import com.sample.demodoctor.dto.UserProfileDto;
import com.sample.demodoctor.entity.Avabiles;
import com.sample.demodoctor.entity.doctor;
import com.sample.demodoctor.entity.Patient;
import com.sample.demodoctor.entity.Prescription;
import com.sample.demodoctor.enums.RestApiResponseStatus;
import com.sample.demodoctor.repostry.AvabilesRepostry;
import com.sample.demodoctor.repostry.PatientRepository;
import com.sample.demodoctor.repostry.doctorRepostry;
import com.sample.demodoctor.service.PrescriptionService;
@RestController

@RequestMapping("/doctor")

public class DoctorController {
	@Autowired
	private AvabilesRepostry avabilesRepostry;

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private PrescriptionService prescriptionService;

	@Autowired
	private doctorRepostry doctorRepostry;
	@Autowired
	private RestTemplate template;

	RestApiResponseDto response = new RestApiResponseDto();

	@PostMapping("/save")
	public ResponseEntity<doctor> add(@RequestBody doctorRequest Request, @RequestHeader("loggedUser") String Usernmae)
			throws ParseException {
		String s = Request.getStartDate();
		String e = Request.getEndDate();
		LocalDateTime start = LocalDateTime.parse(s);
		LocalDateTime stop = LocalDateTime.parse(e);
		System.out.printf("times" + start.getHour() + start.getMinute());

		List<Object[]> doctorExits = doctorRepostry.findDoctorExits(Usernmae, Request.getNewDate());

		System.out.println("user name --->" + Request.getNewDate());
		System.out.println("udate --->" + Request.getNewDate());
		if (doctorExits.isEmpty()) {

			List<Avabiles> departments = new ArrayList<>();
			Avabiles department = new Avabiles();

			String firstDate = "26/02/2019";
			String firstTime = "08:20 AM";
			String secondDate = "26/02/2019";
			String secondTime = "12:00 PM";

			String format = "dd/MM/yyyy hh:mm a";

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);

			LocalDateTime dateObj1 = LocalDateTime.parse(firstDate + " " + firstTime, formatter);
			LocalDateTime dateObj2 = LocalDateTime.parse(secondDate + " " + secondTime, formatter);
			System.out.println("Date Start: " + dateObj1);
			System.out.println("Date End: " + dateObj2);

			Optional<doctor> emplyoe1 = doctorRepostry.findByEmail(Usernmae);

			for (Avabiles ad : emplyoe1.get().getAvabiles()) {
				departments.add(ad);
			}

			long dif = dateObj1.toEpochSecond(ZoneOffset.UTC);
			while (dif < dateObj2.toEpochSecond(ZoneOffset.UTC)) {
				dif += 3600000;
			}
			LocalDate dateNow = Request.getDate();
			System.out.printf("date -->" + dateNow);

			System.out.printf("dateNow--->" + dateNow);

			List<LocalDateTime> slots = new ArrayList<>();
			LocalDateTime ldt = start;
			while (ldt.isBefore(stop)) {
				slots.add(ldt);
				// Date slot = new Date(String.valueOf(ldt));
				departments.add(
						new Avabiles(ldt.toLocalTime(), "Available", LocalDate.parse(Request.getDate().toString())));
				emplyoe1.get().setName(emplyoe1.get().getName());
				emplyoe1.get().setId(emplyoe1.get().getId());
				emplyoe1.get().setEmail(emplyoe1.get().getEmail());
				emplyoe1.get().setHospitalId(emplyoe1.get().getHospitalId());
				emplyoe1.get().setAvabiles(departments);
				// Prepare for the next loop.
				ldt = ldt.plusHours(1);
				// Date slot = new Date(ldt);
				System.out.printf("times so --->" + ldt);
			}

			// Emplyoe b= new Emplyoe();

			doctor emplyoe12 = doctorRepostry.save(emplyoe1.get());

			return new ResponseEntity<doctor>(emplyoe12, HttpStatus.CREATED);
		} else {
			System.out.println("Alll ready Exit");

			return new ResponseEntity("Not Ok", HttpStatus.BAD_GATEWAY);
		}

	}

	@PostMapping("/all")
	public ResponseEntity<Object> updateProfile(@RequestBody UserProfileDto approvalUserProfileDto,
			@RequestHeader("loggedUser") String Usernmae) {
		System.out.printf("username----->" + Usernmae);
		HttpEntity<?> entityReq = new HttpEntity<>(approvalUserProfileDto);
		ResponseEntity<Object> response = template.exchange("http://localhost:9896/admin/approval/{email}",
				HttpMethod.PUT, entityReq, Object.class, Usernmae);

		Optional<doctor> userCredentialdate = doctorRepostry.findByEmail(Usernmae);

		doctor doctor1 = userCredentialdate.get();

		doctor1.setFirstName(approvalUserProfileDto.getFirstName());
		doctor1.setLastName(approvalUserProfileDto.getLastName());
		doctor1.setMobileNumber(approvalUserProfileDto.getMobileNumber());

		doctor1.setSpecialization(approvalUserProfileDto.getSpecialization());
		doctor1.setYearOfExp(approvalUserProfileDto.getYearOfExp());

		doctor1.setImageFile(approvalUserProfileDto.getImageFile());

		doctorRepostry.save(doctor1);
		return ResponseEntity.ok(response.getBody());
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
		if (code.equals(2000)) {
			System.out.printf("ressuuuuA:--------------------->" + responses.getBody());
			response.setCode(RestApiResponseStatus.CREATED.getCode());
			response.setMessage(RestApiResponseStatus.CREATED.getStatus());
			return ResponseEntity.ok(response);
		}
		if (msg.equals(400)) {
			System.out.printf("ressuuuub:--------------------->" + responses.getBody());
			response.setCode(RestApiResponseStatus.INCORRECT_PASSWORD.getCode());
			response.setMessage(RestApiResponseStatus.INCORRECT_PASSWORD.getStatus());
			return ResponseEntity.badRequest().body(response);
		}

		return ResponseEntity.ok(responses.getBody());

	}

	@GetMapping("/profile")
	public ResponseEntity<Object> getAllProfile(@RequestHeader("loggedUser") String userName) {

		ResponseEntity<Object> response = template.getForEntity("http://localhost:9896/admin/profile/{email}",
				Object.class, userName);

		return ResponseEntity.ok(response.getBody());

	}

	@GetMapping("/doctors")
	public List<doctor> getDoctorsByIds(@RequestParam("ids") List<Integer> ids) {
		return doctorRepostry.findByIdIn(ids);
	}

	@GetMapping("/doctordates")
	public List<Object[]> getDoctorysDates(@RequestParam("ids") int id, @RequestParam("date") String date) {
		System.out.println();
		return doctorRepostry.findDoctorAvailabilities(id, date);
	}
	@PostMapping("/patientAdd")
	public ResponseEntity<Patient> add(@RequestBody PatientDto patientDto) {
		Patient patient = new Patient();
		patient.setEmail(patientDto.getEmail());
		patient.setFirstName(patientDto.getFirstName());
		patient.setMobileNumber(patientDto.getMobileNumber());
		return ResponseEntity.ok(patientRepository.save(patient));
	}

	@PostMapping("/add")
	public ResponseEntity<doctor> add(@RequestBody DoctorDto doctorDto) {
		doctor doctor = new doctor();
		doctor.setName(doctorDto.getFirstName());
		doctor.setEmail(doctorDto.getEmail());
		doctor.setHospitalId(doctorDto.getHospitalId());
		doctor.setYearOfExp(doctorDto.getYearOfExp());
		doctor.setSpecialization(doctorDto.getSpecialization());
		doctor.setFirstName(doctorDto.getFirstName());
		doctor.setLastName(doctorDto.getLastName());

		return ResponseEntity.ok(doctorRepostry.save(doctor));
	}

	@PostMapping("/doctorsAll")
	public List<Object[]> getDistinctDoctorDetails(@RequestBody SearchDoctorDto searchDoctorDto) {
		int id = searchDoctorDto.getHospitalId();
		System.out.println(id);
		if (id != 0 && searchDoctorDto.getDate() != null) {
			return doctorRepostry.findDoctorsWithHospitalName(searchDoctorDto.getDate(),
					searchDoctorDto.getHospitalId());
		} else if (searchDoctorDto.getDate() == null && id > 0) {
			return doctorRepostry.findDoctorsWithHospitalID(id);
		} else if (searchDoctorDto.getDate() != null && id == 0) {
			return doctorRepostry.findDoctorsWithHospitalDate(searchDoctorDto.getDate());
		} else {
			return doctorRepostry.findDoctorsWithHospital();
		}

	}

	@PutMapping("/avabiles/{id}")
	public ResponseEntity<Object> updateRequest(@RequestBody AvabilesDto avabilesDto, @PathVariable("id") int id) {
		Optional<Avabiles> AvailableDto = avabilesRepostry.findById(id);

		if (AvailableDto.isPresent()) {
			Avabiles avabiles = AvailableDto.get();
			avabiles.setStaus(avabilesDto.getStatus());

			return new ResponseEntity<>(avabilesRepostry.save(avabiles), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/addPrescription")
	public ResponseEntity<Object> addPrescription(
			@RequestParam Long patientId,@RequestBody PrescriptionDto prescriptionDto,@RequestHeader("loggedUser") String username){
		Optional<doctor> doctor = doctorRepostry.findByEmail(username);
		doctor.get().setId(doctor.get().getId());
		Patient patient = patientRepository.findById(patientId);

		prescriptionService.addPrescription(doctor.get(),patient,prescriptionDto);
		response.setCode(RestApiResponseStatus.CREATED.getCode());
		response.setMessage(RestApiResponseStatus.CREATED.getStatus());
		return ResponseEntity.ok(response);
	}

	@GetMapping("/previousDetails")
	public List<Prescription> getPrescriptions(@RequestParam Long patientId,@RequestHeader("loggedUser") String username) {
		Patient patient = patientRepository.findById(patientId);
		return prescriptionService.findByPrescription(patient);
	}
}
