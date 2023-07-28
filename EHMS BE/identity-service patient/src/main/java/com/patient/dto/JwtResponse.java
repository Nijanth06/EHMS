package com.patient.dto;

import com.patient.entity.RefreshToken;

public class JwtResponse {
	private String token;



	private RefreshToken refreshToken;

	public JwtResponse(String token, RefreshToken refreshToken) {
		this.token = token;
		this.refreshToken = refreshToken;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public RefreshToken getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(RefreshToken refreshToken) {
		this.refreshToken = refreshToken;
	}
}
