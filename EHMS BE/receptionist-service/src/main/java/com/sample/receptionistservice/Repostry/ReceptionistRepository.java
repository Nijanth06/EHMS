package com.sample.receptionistservice.Repostry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sample.receptionistservice.entity.Receptionist;

@Repository
public  interface ReceptionistRepository extends JpaRepository<Receptionist,Integer> {


}
