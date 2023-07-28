package com.hospital.repository;

import com.hospital.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserCredentialRepository extends JpaRepository<UserCredential, Integer> {
    Optional<UserCredential> findByName(String username);

    //Optional<UserCredential> findByRoles(String roles);

    boolean existsByNic(String nic);

    Boolean existsByEmail(String email);

    List<UserCredential> findByHospitalId(String hospitalId);
}
