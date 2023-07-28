package com.patient.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "patient")
@Data
public class Patient {

	@Id 
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String firstName;

	private String  lastName;
	private String email;
	private String password;
	private String nic;
	private String address;
	private Date dateOfBirth;
	private int mobileNumber;
	private String gender;
	private String guardianName;
	private int guardianMobileNumber;

	private String imageFile;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "User")
	private UserCredential userCredential;
	
	

}
