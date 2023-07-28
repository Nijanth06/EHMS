package com.sample.demodoctor.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Data
@Table(name ="prescription")
public class Prescription {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	 private String location;
	 private String illness;
	 private String prescriptions;
	 private String date;
	 private String drugs;
	 private String status;
	 @ManyToOne
	    @JoinColumn(name = "doctorId")
	    private doctor doctor;
	 
	 @ManyToOne
	    @JoinColumn(name = "patientId")
	    private Patient patient;
	

}
