package dev.grover.RevShop.service;


import dev.grover.RevShop.entity.Product;
import dev.grover.RevShop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Product getProductById(Integer id){
        Optional<Product> p = productRepository.findById(id);
        return p.orElse(null);
    }
}
