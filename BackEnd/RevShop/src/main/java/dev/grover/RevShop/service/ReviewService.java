package dev.grover.RevShop.service;

import dev.grover.RevShop.DTO.ReviewUserDTO;
import dev.grover.RevShop.entity.Review;
import dev.grover.RevShop.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository r){
        this.reviewRepository = r;
    }

    public boolean addReview(Review r){
        return reviewRepository.save(r) != null;
    }
}
