package com.AdminServies.repository;


import com.AdminServies.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital,Integer> {
   // Optional<UserCredential> findByName(String username);
   Optional<Hospital> findByName(String name);
    Optional<Hospital> findByBranch(String branch);
  boolean  existsByNameAndBranch(String name,String branch);

    List<Hospital> findByIdIn(List<Integer> ids);


   // boolean existsByEmail(String email);
  //  boolean existsByNic(String nic);
   // Optional<User> findByUsername(String username);

   // Boolean existsByUsername(String username);

    //Boolean existsByEmail(String email);
}
