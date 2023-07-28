package com.MediaclRecord;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ContentManagementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContentManagementServiceApplication.class, args);
	}

}
