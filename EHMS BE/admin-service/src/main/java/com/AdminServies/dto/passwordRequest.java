package com.AdminServies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class passwordRequest {

    String Usernmae;
    String currentPassword;
    String newPassword;
}
