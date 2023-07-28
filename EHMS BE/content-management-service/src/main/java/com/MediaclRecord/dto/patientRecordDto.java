package com.MediaclRecord.dto;

import com.MediaclRecord.Enitity.MediRecords;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class patientRecordDto {
    private long id;
    private String email;
    private String shortDesc;
    private String longDesc;
    private List<MediRecords> imageFiles;
}
