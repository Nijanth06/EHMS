package com.MediaclRecord.Enitity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.List.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class patientRecord {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String shortDesc;
    private String longDesc;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="pid")
    private List<MediRecords> imageFiles;
}
