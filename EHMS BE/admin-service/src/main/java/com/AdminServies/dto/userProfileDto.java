package com.AdminServies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class userProfileDto {





    private String firstName;

    private String lastName;

    private String address;

    private String imageFile;

    private int mobileNumber;

    private String specialization;
    private int yearOfExp;

    private String hospitalId;



}
