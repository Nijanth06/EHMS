package com.sample.demodoctor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordRequest {

    String Usernmae;
    String currentPassword;
    String newPassword;
}
