package com.AdminServies.repository;

import com.AdminServies.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface UserCredentialRepository extends JpaRepository<UserCredential, Integer> {
    Optional<UserCredential> findByEmail(String email);

    List<UserCredential> findByIdIn(List<Integer> ids);

    List<UserCredential> findByRoles(String roles);

    @Query("SELECT COUNT(u) FROM UserCredential u WHERE u.name=:name")
    long countByName(@Param("name") String name);

    @Query("SELECT  u.roles,COUNT(*) FROM UserCredential u GROUP BY u.roles")
    List<Object> getByRoles();

    // for doctor....
    @Query("SELECT u.email, u.firstName, u.specialization, u.nic, u.mobileNumber FROM UserCredential u WHERE roles='Doctor'")
    List<Object> getAllDoctor();

    //for HRP....
    @Query("SELECT u.email, u.firstName, h.name, h.branch, u.nic, u.mobileNumber FROM UserCredential u, Hospital h WHERE u.hospitalId=h.id AND u.roles='HRP'")
    List<Object> getAllHRP();

    //for nurse....
    @Query("SELECT u.email, u.firstName, h.name, h.branch, u.yearOfExp, u.nic, u.mobileNumber FROM UserCredential u, Hospital h WHERE u.hospitalId=h.id AND u.roles='Nurse'")
    List<Object> getAllNurse();
    
   
    


}