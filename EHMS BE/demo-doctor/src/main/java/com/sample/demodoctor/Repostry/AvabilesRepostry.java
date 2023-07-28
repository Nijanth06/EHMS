package com.sample.demodoctor.repostry;

import com.sample.demodoctor.entity.Avabiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;

@Repository
public interface AvabilesRepostry extends JpaRepository<Avabiles,Integer> {
    boolean existsBySlote(LocalTime startTime);
}


