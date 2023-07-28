package com.sample.demodoctor.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jdk.jfr.Timestamp;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Slotests {
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Timestamp
    private Date date;
}
