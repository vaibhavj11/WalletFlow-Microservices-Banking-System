package com.banking.user_service.Repository;

import com.banking.user_service.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {

//    User findByUsername(String username);
    Optional<User> findByUsername(String username);

}
