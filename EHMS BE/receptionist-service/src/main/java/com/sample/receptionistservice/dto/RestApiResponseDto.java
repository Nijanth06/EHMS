package com.sample.receptionistservice.dto;

public class RestApiResponseDto {
	Integer code;
	String message;
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "RestApiResponseDto [code=" + code + ", message=" + message + "]";
	}
	
	

}
