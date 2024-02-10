package dev.grover.RevShop.controller;

import dev.grover.RevShop.DTO.LoginDTO;
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

    //Get ALL users is just to ensure the API is working
    @CrossOrigin
    @GetMapping("users")
    public ResponseEntity<List<User>> allUsers() {
        return ResponseEntity.status(200).body(userService.getAllUsers());
    }

    @CrossOrigin
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDTO l) {
        User u = userService.login(l);
        if (u == null) {
            //Unable to find a username or the password was incorrect
            System.out.println("No one found");
            return ResponseEntity.status(401).body("Try Again Sucker");
        }
        return ResponseEntity.status(200).body(u);
    }


}
