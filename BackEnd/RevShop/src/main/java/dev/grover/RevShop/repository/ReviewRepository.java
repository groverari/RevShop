package dev.grover.RevShop.repository;

import dev.grover.RevShop.entity.Review;
import dev.grover.RevShop.entity.idClasses.ReviewId;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, ReviewId> {
}
