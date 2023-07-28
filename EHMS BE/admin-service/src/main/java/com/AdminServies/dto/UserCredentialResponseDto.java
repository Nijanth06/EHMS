package com.AdminServies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCredentialResponseDto {


    private int id;
    private String name;
    private String email;


    private String title;
    private String firstName;

    private String lastName;

    private String address;

    private String nic;

    private int mobileNumber;

     private  String imageFile;
    private String specialization;
    private int yearOfExp;

    private String hospitalId;
    private String roles ;
}
