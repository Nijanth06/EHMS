package com.sample.alertservice.Repostry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.JpaRepositoryConfigExtension;

import com.sample.alertservice.entity.Notification;

import jakarta.transaction.Transactional;


public interface NotificationRepository extends JpaRepository<Notification, Integer> {
	
	// for all alerts...
    @Query("SELECT id,userId,description,status FROM Notification")
    List<Object> getNewNotification();
    
 // for get new alert-count only...
    @Query("SELECT Count(status) FROM Notification WHERE status='false' ")
    Integer getNewAlertCount();
    
    
    
    
    
   

}
