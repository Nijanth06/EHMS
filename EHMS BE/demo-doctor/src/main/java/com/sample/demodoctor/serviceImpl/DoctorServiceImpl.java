package com.sample.demodoctor.serviceImpl;

import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.demodoctor.repostry.AvabilesRepostry;
import com.sample.demodoctor.service.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService{

	@Autowired
	private AvabilesRepostry avabilesRepostry;

	@Override
	public boolean isExistsBySlote(LocalTime startTime) {
		if (null != startTime && avabilesRepostry.existsBySlote(startTime)) {
			return true;
		}
		return false;
	}

}
