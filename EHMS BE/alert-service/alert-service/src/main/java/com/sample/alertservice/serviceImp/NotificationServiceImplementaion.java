package com.sample.alertservice.serviceImp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sample.alertservice.Repostry.NotificationRepository;
import com.sample.alertservice.Servies.NotificationService;
import com.sample.alertservice.dto.NotificationDto;
import com.sample.alertservice.entity.Notification;

@Service
public class NotificationServiceImplementaion implements NotificationService {
	@Autowired
	NotificationRepository notificationRepository;

	@Override
	public void sendAlert(NotificationDto notificationDto) {
		Notification notification = new Notification();
		notification.setDescription(notificationDto.getDescription());
		notification.setUserId(notificationDto.getUserId());
		notification.setStatus(false);
		notificationRepository.save(notification);

	}

	@Override
	public List<Object> getAllNotification() {
		return notificationRepository.getNewNotification();
	}
	
	@Override
	public Integer getNewAlertCount() {
		return notificationRepository.getNewAlertCount();
	}

	@Override
	public ResponseEntity<Notification> updateByStatus(Integer id, Notification noti) {
		Notification notification = notificationRepository.findById(id).orElseThrow();
		
		//set status as 'true' or '1'
		notification.setStatus(true);
		
		Notification update = notificationRepository.save(notification); 
		return ResponseEntity.ok(update);
	}
	

	
}
