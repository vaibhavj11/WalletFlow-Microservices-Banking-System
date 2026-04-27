package com.banking.auth_service.dto;


import lombok.Data;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class LoginRequest {

    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}
