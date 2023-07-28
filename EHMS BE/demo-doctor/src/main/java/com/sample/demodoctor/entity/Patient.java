package com.sample.demodoctor.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="patient")
public class Patient {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String email;

    private String firstName;

    private String lastName;

    private int mobileNumber;

}
