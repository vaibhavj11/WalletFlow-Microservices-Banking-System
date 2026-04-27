package com.banking.auth_service.controller;

import com.banking.auth_service.dto.LoginRequest;

import com.banking.auth_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
        private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){

        return authService.login(request);
    }


}
