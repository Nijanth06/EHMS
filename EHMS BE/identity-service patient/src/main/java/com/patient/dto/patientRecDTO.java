package com.patient.dto;

import com.patient.entity.Patient;
import lombok.Data;

import java.sql.Date;

@Data
public class patientRecDTO {

    private Long id;
    private String title;
    private String firstName;
    private String lastName;
    private String email;
    private String nic;
    private String address;
    private Date dateOfBirth;
    private int mobileNumber;
    private String gender;
    private String guardianName;
    private int guardianMobileNumber;


    public patientRecDTO(Patient patient) {
        this.id = patient.getId();
        this.title = patient.getTitle();
        this.firstName = patient.getFirstName();
        this.lastName = patient.getLastName();
        this.gender = patient.getGender();
        this.dateOfBirth = patient.getDateOfBirth();
        this.nic = patient.getNic();
        this.address = patient.getAddress();
        this.mobileNumber = patient.getMobileNumber();
        this.email = patient.getEmail();
        this.guardianName = patient.getGuardianName();
        this.guardianMobileNumber = patient.getGuardianMobileNumber();
    }


}
