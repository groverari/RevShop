package dev.grover.RevShop.repository;

import dev.grover.RevShop.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}
