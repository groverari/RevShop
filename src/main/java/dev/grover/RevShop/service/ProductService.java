package dev.grover.RevShop.service;


import dev.grover.RevShop.entity.Product;
import dev.grover.RevShop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository p) {
        this.productRepository = p;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
