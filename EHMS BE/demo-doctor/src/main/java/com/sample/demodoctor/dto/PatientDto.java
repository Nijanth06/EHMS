package com.sample.demodoctor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
	private String email;

    private String firstName;

    private String lastName;

    private int mobileNumber;

}
