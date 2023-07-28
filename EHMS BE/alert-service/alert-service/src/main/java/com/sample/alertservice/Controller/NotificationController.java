package com.sample.alertservice.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sample.alertservice.Servies.NotificationService;
import com.sample.alertservice.dto.NotificationDto;
import com.sample.alertservice.entity.Notification;

@RestController
@RequestMapping("/alert")
public class NotificationController {
	@Autowired
	NotificationService notificationService;
	private static final Logger LOGGER = LoggerFactory.getLogger(NotificationController.class);

	@PostMapping("/send")
	public ResponseEntity<Object> sendNotification(@RequestBody NotificationDto notificationDto) {
		LOGGER.info("addMessage method invoked");
		notificationService.sendAlert(notificationDto);
		return ResponseEntity.ok("save Successfully");

	}

	@GetMapping("/get-alert")
	public List<Object> getAlert() {
		return notificationService.getAllNotification();
	}
	@GetMapping("/get-alert-count")
	public Integer getAlertCount() {
		return notificationService.getNewAlertCount();
	}

	// update status by id...
	@PutMapping("/status-update/{id}")
	public ResponseEntity<Notification> updateStatus(@PathVariable Integer id, @RequestBody Notification noti) {

		return notificationService.updateByStatus(id, noti);
	}

	@PostMapping("/love")
	public ResponseEntity<Object> sendNotification() {
		LOGGER.info("addMessage method invoked");
		return ResponseEntity.ok("save Successfully");

	}

}
