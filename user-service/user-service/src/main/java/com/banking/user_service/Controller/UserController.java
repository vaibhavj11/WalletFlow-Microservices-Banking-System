package com.banking.user_service.Controller;

import com.banking.user_service.Model.User;
import com.banking.user_service.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public void registerNewUser(@RequestBody User user){
        System.out.println(user);
        userService.addNewUser(user);
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUser(@PathVariable Integer id){
        return userService.getUserById(id);
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PutMapping("/users/{id}")
    public void updateUser(@RequestBody User user,@PathVariable Integer id){
        userService.updateUserInfo(user,id);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Integer id){
        userService.deleteUserInfo(id);
    }

    @GetMapping("/users/username/{username}")
    public User getUserByUsername(@PathVariable String username){
        return userService.getUserByUsername(username);
    }

}
