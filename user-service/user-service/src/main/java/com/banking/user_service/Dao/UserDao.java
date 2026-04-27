package com.banking.user_service.Dao;

import com.banking.user_service.Model.User;
import com.banking.user_service.Repository.UserRepository;
import com.banking.user_service.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDao implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public void addNewUser(User user) {
        userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void updateUserInfo(User user, Integer id) {
        userRepository.save(user);
    }

    @Override
    public void deleteUserInfo(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found!"));
    }
}
