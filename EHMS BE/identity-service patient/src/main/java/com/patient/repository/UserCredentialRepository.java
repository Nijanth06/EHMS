package com.patient.repository;

import com.patient.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCredentialRepository  extends JpaRepository<UserCredential,Integer> {
    Optional<UserCredential> findByName(String username);

   // Optional<User> findByUsername(String username);

   // Boolean existsByUsername(String username);

    //Boolean existsByEmail(String email);
}
