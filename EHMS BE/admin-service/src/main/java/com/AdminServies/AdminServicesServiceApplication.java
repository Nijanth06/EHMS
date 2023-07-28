package com.AdminServies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AdminServicesServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminServicesServiceApplication.class, args);
	}

}
