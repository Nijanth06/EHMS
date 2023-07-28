package com.patient.dto;

import java.sql.Date;


import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PatientDto {
	private Long id;
	
	
	private String title;
	


	@NotBlank(message = "First  Name is mandatory to fill !!")
	private String firstName;
	@NotBlank(message = "Last  Name is mandatory to fill !!")
	private String  lastName;
	@Email
	@Column(unique = true)
	@NotEmpty(message = "Email is mandatory")
	private String email;
	
	@NotEmpty(message = "The Password should not be null or empty")
	private String password;

	private String nic;
	
	@NotEmpty(message = "The Address should not be null or empty")
	private String address;

//	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	//@JsonFormat(pattern = "yyyy-MM-dd")
	private Date dateOfBirth;
	
	@NotNull(message = "The Phone should not be null or empty")
	private int mobileNumber;
	
	@NotEmpty(message = "The Gender should not be null or empty")
	private String gender;

	private String guardianName;

	private int guardianMobileNumber;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	private String imageFile;

	public String getImageFile() {
		return imageFile;
	}

	public void setImageFile(String imageFile) {
		this.imageFile = imageFile;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNic() {
		return nic;
	}

	public void setNic(String nic) {
		this.nic = nic;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public int getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(int mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getGuardianName() {
		return guardianName;
	}

	public void setGuardianName(String guardianName) {
		this.guardianName = guardianName;
	}

	public int getGuardianMobileNumber() {
		return guardianMobileNumber;
	}

	public void setGuardianMobileNumber(int guardianMobileNumber) {
		this.guardianMobileNumber = guardianMobileNumber;
	}


	

}
