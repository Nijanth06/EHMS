package com.sample.receptionistservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceptionistDto {
    private String email;



    private String title;
    private String firstName;

    private String lastName;

    private String address;

    private String nic;

    private int mobileNumber;

    private int hospitalId;

    private String roleName ;
}
