package com.sample.alertservice.Servies;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sample.alertservice.dto.NotificationDto;
import com.sample.alertservice.entity.Notification;


@Service
public interface NotificationService {
	
	public void sendAlert(NotificationDto notificationDto);
	public List<Object> getAllNotification();
	public ResponseEntity<Notification> updateByStatus(Integer userId, Notification noti);
	public Integer getNewAlertCount();

}
