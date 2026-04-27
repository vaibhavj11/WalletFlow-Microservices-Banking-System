package com.banking.auth_service.service;

import com.banking.auth_service.client.UserClient;
import com.banking.auth_service.dto.LoginRequest;
import com.banking.auth_service.util.Jwtutil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserClient userClient;

    @Autowired
    private Jwtutil jwtUtil;

    public String login(LoginRequest request){

        Map<String,Object> user = userClient.getUserByUsername(request.getUsername());

        if (user == null){
            throw new RuntimeException("User not found !");
        }

        String password = (String) user.get("password");

        if (!password.equals(request.getPassword())){
            throw new RuntimeException("Invalid password !");
        }

        return jwtUtil.generateToken(request.getUsername());
    }

}
