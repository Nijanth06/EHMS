package com.AdminServies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDto {
    private String email;



    private String title;
    private String firstName;

    private String lastName;

    private String address;

    private String nic;

    private int mobileNumber;
    private String imageFile;

    private String specialization;
    private int yearOfExp;
    private int hospitalId;

    private String roleName ;
}
