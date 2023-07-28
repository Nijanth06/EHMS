package com.sample.receptionistservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {

    private String firstName;

    private String lastName;

    private String address;

    private String imageFile;

    private int mobileNumber;


    private String hospitalId;

}
