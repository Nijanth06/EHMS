package com.sample.alertservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class NotificationDto {
	
	private int id;
	private String description;
	private boolean status;
	private int userId;

}
