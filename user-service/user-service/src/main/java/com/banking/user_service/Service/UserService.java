package com.banking.user_service.Service;

import com.banking.user_service.Model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {


    void addNewUser(User user);

    Optional<User> getUserById(Integer id);

    List<User> getAllUsers();

    void updateUserInfo(User user, Integer id);

    void deleteUserInfo(Integer id);


    User getUserByUsername(String username);
}
