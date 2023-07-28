package com.hospital.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCredential {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String password;
    private String title;
    private String firstName;
    private String lastName;
    private String address;
    private String nic;
    private int mobileNumber;
    private String imageFile;
    private String specialization;
    private int yearOfExp;
    private String hospitalId;
    private String roles ;
}
