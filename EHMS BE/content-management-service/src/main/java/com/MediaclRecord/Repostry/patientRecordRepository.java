package com.MediaclRecord.Repostry;

import com.MediaclRecord.Enitity.patientRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface patientRecordRepository extends JpaRepository<patientRecord,Long> {
    List<patientRecord> findByEmail(String email);
}
