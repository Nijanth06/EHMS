package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCredentialDto {

    private String name;
    private String email;
    private String password;
    private String title;
    private String firstName;
    private String lastName;
    private String address;
    private String nic;
    private int mobileNumber;
    private String imageFile;
    private String hospitalId;
    private String specialization;
    private int yearOfExp;
    private String roleName;
}
