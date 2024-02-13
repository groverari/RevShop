package dev.grover.RevShop.controller;

import dev.grover.RevShop.DTO.LoginDTO;
import dev.grover.RevShop.entity.Cart;
import dev.grover.RevShop.entity.Product;
import dev.grover.RevShop.entity.User;
import dev.grover.RevShop.service.CartService;
import dev.grover.RevShop.service.ProductService;
import dev.grover.RevShop.service.UserService;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class RevShopController {
    UserService userService;
    ProductService productService;
    CartService cartService;

    @Autowired
    public RevShopController(UserService u, ProductService p, CartService c) {
        this.userService = u;
        this.productService = p;
        this.cartService = c;
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

    @CrossOrigin
    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody User u) {
        User x = userService.register(u);

        if (x == null) {
            return ResponseEntity.status(400).body("Username already exists");
        }
        return ResponseEntity.status(200).body(x);
    }

    @CrossOrigin
    @GetMapping("products")
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.status(200).body(productService.getAllProducts());
    }

    @CrossOrigin
    @PostMapping("addToCart")
    public ResponseEntity<Boolean> addToCart(@RequestBody Cart c) {
        boolean success = cartService.add(c);
        int status = success ? 202 : 404;
        return ResponseEntity.status(status).body(success);
    }

}
