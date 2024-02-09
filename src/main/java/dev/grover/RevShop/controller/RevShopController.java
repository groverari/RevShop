package dev.grover.RevShop.controller;

import dev.grover.RevShop.entity.User;
import dev.grover.RevShop.service.UserService;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class RevShopController {
    UserService userService;

    @Autowired
    public RevShopController(UserService u) {
        this.userService = u;
    }

    @CrossOrigin
    @GetMapping("users")
    public ResponseEntity<List<User>> allUsers() {
        
        return ResponseEntity.status(200).body(userService.getAllUsers());
    }
}
