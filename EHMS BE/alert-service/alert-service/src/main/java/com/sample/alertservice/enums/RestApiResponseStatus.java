package com.sample.alertservice.enums;

public enum RestApiResponseStatus {
	OK(2004, "SUCCESSFUL_RESPONSE", 0), CREATED(2000, "SUCCESSFULLY_CREATED", 0),
	VALIDATION_FAILURE(4004, "VALIDATION_FAILURE", 0), FORBIDDEN(4007, "FORBIDDEN",0), UPDATE(2002, "SUCCESSFULLY_UPDATED", 0),
	DELETE(2003, "SUCCESSFULLY_DELETED", 0), RETRIEVE(2001, "SUCCESSFULLY_RETRIEVED", 0),
	ALREADY_EXISTS(4008, "ALREADY_EXISTS", 0), NIC_ALREADY_EXISTS(5002, "NIC_ALREADY_EXISTS", 0),
	INCORRECT_PASSWORD(400, "INCORRECT_PASSWORD", 0),HOSPITAL_ALREADY_EXISTS(5009, "EMAIL_ALREADY_EXISTS", 0),
	MOBILENUMBER_ALREADY_EXISTS(5004, "MOBILENUMBER_ALREADY_EXISTS", 0), NOT_FOUND(5005, "PARAMETER_NOT_FOUND", 0);

	private Integer code;
	private String status;
	private int userId;

	RestApiResponseStatus(Integer code, String status, int userId) {
		this.status = status;
		this.code = code;
		this.userId = userId;
	}

	public String getStatus() {
		return status;
	}

	public Integer getCode() {
		return code;
	}
	public int getUserId() {
		return userId;
	}

	@Override
	public String toString() {
		return status + ":" + code+ ":" + userId;
	}

}
