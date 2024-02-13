package dev.grover.RevShop.service;

import dev.grover.RevShop.entity.Cart;
import dev.grover.RevShop.repository.CartRepository;

import dev.grover.RevShop.repository.ProductRepository;
import dev.grover.RevShop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    CartRepository cartRepository;
    UserRepository userRepository;
    ProductRepository productRepository;

    @Autowired
    public CartService(CartRepository c, UserRepository u, ProductRepository p) {
        this.cartRepository = c;
        this.userRepository = u;
        this.productRepository = p;
    }

    public boolean add(Cart c) {
        if (userRepository.existsById(c.getUser_id()) &&
                productRepository.existsById(c.getProduct_id())) {
            cartRepository.save(c);
            return true;
        }
        return false;

    }
}
