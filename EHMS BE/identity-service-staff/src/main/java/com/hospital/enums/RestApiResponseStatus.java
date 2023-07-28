package com.hospital.enums;

public enum RestApiResponseStatus {
	OK(2004, "SUCCESSFUL_RESPONSE"), CREATED(2000, "SUCCESSFULLY_CREATED"),
	VALIDATION_FAILURE(4004, "VALIDATION_FAILURE"), FORBIDDEN(4007, "FORBIDDEN"), UPDATE(2002, "SUCCESSFULLY_UPDATED"),
	DELETE(2003, "SUCCESSFULLY_DELETED"), RETRIEVE(2001, "SUCCESSFULLY_RETRIEVED"),
	ALREADY_EXISTS(4008, "ALREADY_EXISTS"), NIC_ALREADY_EXISTS(5002, "NIC_ALREADY_EXISTS"),
	EMAIL_ALREADY_EXISTS(400, "EMAIL_ALREADY_EXISTS"),HOSPITAL_ALREADY_EXISTS(5009, "EMAIL_ALREADY_EXISTS"),
	MOBILENUMBER_ALREADY_EXISTS(5004, "MOBILENUMBER_ALREADY_EXISTS"), NOT_FOUND(5005, "PARAMETER_NOT_FOUND");

	private Integer code;
	private String status;

	RestApiResponseStatus(Integer code, String status) {
		this.status = status;
		this.code = code;
	}

	public String getStatus() {
		return status;
	}

	public Integer getCode() {
		return code;
	}

	@Override
	public String toString() {
		return status + ":" + code;
	}

}
