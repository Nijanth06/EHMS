package com.sample.demodoctor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionDto {
	private String location;
	 private String illness;
	 private String prescriptions;
	 private String date;
	 private String drugs;
	 private String status;

}
