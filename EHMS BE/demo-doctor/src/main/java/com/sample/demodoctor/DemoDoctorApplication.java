package com.sample.demodoctor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class DemoDoctorApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoDoctorApplication.class, args);
	}
	@Bean
	public RestTemplate template(){
		return new RestTemplate();
	}
}
