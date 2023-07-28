package com.sample.demodoctor.repostry;

import com.sample.demodoctor.entity.doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public  interface doctorRepostry extends JpaRepository<doctor,Integer> {
    List<doctor> findByIdIn(List<Integer> ids);


    Optional<doctor>findByEmail(String email);

    @Query(value = "SELECT DISTINCT  a.slote,a.date " +
            "FROM doctor d " +
            "LEFT JOIN avabiles a ON d.id = a.emp_id " +
            "WHERE  a.email = :empId AND a.date = :date", nativeQuery = true)
        // @Query("select count(e) from usercredential e where e.roles = ?1")
    List<Object[]> findDistinctByDoctorIdAndAvabilesDate(@Param("empId") String empId, @Param("date") Date date);


    @Query(value = "SELECT DISTINCT d.id, d.name, d.email, d.hospitalId " +
            "FROM doctor d " +
            "LEFT JOIN avabiles a ON d.id = a.emp_id " +
            "WHERE d.email = :email AND a.date = :date", nativeQuery = true)
    List<Object[]>findDoctorExits(@Param("email")String email,@Param("date") String date);

    @Query(value = "SELECT a.id, d.id, d.name, d.email, a.slote, a.date,d.firstName,d.lastName,d.specialization,d.yearOfExp,d.hospitalId ,a.staus , h.name,h.mobileNumber,h.branch FROM doctor d LEFT JOIN avabiles a ON d.id = a.emp_id LEFT JOIN  `clinic-service`.hospital h ON d.hospitalId = h.id  WHERE a.emp_id = ?1 AND a.date = ?2   Order BY a.slote", nativeQuery = true)
    List<Object[]> findDoctorAvailabilities(int empId, String date);




    @Query(value = "SELECT DISTINCT d.id, d.name, d.email, d.hospitalId " +
            "FROM doctor d " +
            "LEFT JOIN clinic-service.hospital h ON d.hospitalId = h.id"+
            "LEFT JOIN avabiles a ON d.id = a.emp_id " +
            "WHERE a.staus OR a.staus = ?1 AND a.date= ?2  AND  d.hospitalId= ?3",nativeQuery = true)
    List<Object[]> findDistinctByIdAndNameAndEmailAndHospitalId(String status, String date ,int id);

    @Query(value = "SELECT DISTINCT d.id, d.name, d.email, h.name AS hospitalName, a.date, d.specialization, d.yearOfExp, d.firstName, d.lastName, h.name " +
            "FROM doctor d " +
            "LEFT JOIN avabiles a ON d.id = a.emp_id " +
            "LEFT JOIN  `clinic-service`.hospital h ON d.hospitalId = h.id " +
            "WHERE (a.staus = true OR a.staus = 'Available') AND a.date = ?1 AND d.hospitalId = ?2",
            nativeQuery = true)
    List<Object[]> findDoctorsWithHospitalName(String date ,int id);

    @Query(value = "SELECT DISTINCT d.id, d.name, d.email, h.name AS hospitalName, a.date, d.specialization, d.yearOfExp, d.firstName, d.lastName, h.name " +
            "FROM doctor d " +
            "LEFT JOIN avabiles a ON d.id = a.emp_id " +
            "LEFT JOIN  `clinic-service`.hospital h ON d.hospitalId = h.id " +
            "WHERE (a.staus = true OR a.staus = 'Available' ) Order BY a.date",
            nativeQuery = true)
    List<Object[]> findDoctorsWithHospital();

    @Query(value = "SELECT DISTINCT d.id, d.name, d.email, h.name AS hospitalName, a.date, d.specialization, d.yearOfExp, d.firstName, d.lastName, h.name " +
            "FROM doctor d " +
            "LEFT JOIN avabiles a ON d.id = a.emp_id " +
            "LEFT JOIN  `clinic-service`.hospital h ON d.hospitalId = h.id " +
            "WHERE (a.staus = true OR a.staus = 'Available')  AND a.date = ?1  ",
            nativeQuery = true)
    List<Object[]> findDoctorsWithHospitalDate(String date);


    @Query(value = "SELECT DISTINCT d.id, d.name, d.email, h.name AS hospitalName, a.date, d.specialization, d.yearOfExp, d.firstName, d.lastName, h.name " +
            "FROM doctor d " +
            "LEFT JOIN avabiles a ON d.id = a.emp_id " +
            "LEFT JOIN  `clinic-service`.hospital h ON d.hospitalId = h.id " +
            "WHERE (a.staus = true OR a.staus = 'Available')  AND  d.hospitalId = ?1 ",
            nativeQuery = true)
    List<Object[]> findDoctorsWithHospitalID(int id);



}
