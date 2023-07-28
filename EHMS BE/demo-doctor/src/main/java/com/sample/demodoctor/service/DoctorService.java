package com.sample.demodoctor.service;

import java.time.LocalTime;

public interface DoctorService {

	boolean isExistsBySlote(LocalTime startTime);

}
