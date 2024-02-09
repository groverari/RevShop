package dev.grover.RevShop.service;

import dev.grover.RevShop.entity.User;
import dev.grover.RevShop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository u) {
        this.userRepository = u;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) return null;

        return userRepository.save(user);
    }

}
