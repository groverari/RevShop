package dev.grover.RevShop.repository;

import dev.grover.RevShop.entity.Product;

import dev.grover.RevShop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
}
