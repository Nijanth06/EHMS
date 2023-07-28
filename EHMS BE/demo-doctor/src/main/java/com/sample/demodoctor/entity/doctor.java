package com.sample.demodoctor.entity;

import jakarta.persistence.*;


import java.util.List;


@Entity
public class doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;
   private String name;
   private String email;

    private String firstName;

    private String lastName;
    private String specialization;
    private int yearOfExp;

    private int mobileNumber;
    private String imageFile;

    public int getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(int mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getImageFile() {
        return imageFile;
    }

    public void setImageFile(String imageFile) {
        this.imageFile = imageFile;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public int getYearOfExp() {
        return yearOfExp;
    }

    public void setYearOfExp(int yearOfExp) {
        this.yearOfExp = yearOfExp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(int hospitalId) {
        this.hospitalId = hospitalId;
    }

    private int hospitalId;
   @OneToMany(cascade = CascadeType.ALL)
   @JoinColumn(name="emp_id")
   private List<Avabiles>avabiles;

    public int getId() {
        return id;
    }


    public doctor(int id, String name, List<Avabiles> avabiles) {
        this.id = id;
        this.name = name;
        this.avabiles = avabiles;
    }

    public doctor() {
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Avabiles> getAvabiles() {
        return avabiles;
    }

    public void setAvabiles(List<Avabiles> avabiles) {
        this.avabiles = avabiles;
    }
}
