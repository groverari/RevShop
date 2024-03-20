package com.revature.RevStay.Repositories;

import com.revature.RevStay.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findAllByRatingLessThanEqual(Integer rating);
    @Query("SELECT AVG(rating) FROM Review WHERE (hotel.hotelId = :hotelId) ")
    Integer findAvgRatingByHotelId(@Param("hotelId")Integer hotelId);

    @Query(value = "SELECT * FROM revstay.review WHERE (hotel_id = :hotelId)", nativeQuery = true)
    List<Review> findAllByHotelId(Integer hotelId);

    @Query(value = "UPDATE revstay.review SET feedback = :feedback WHERE (review_id = :reviewId)", nativeQuery = true)
    Review submitFeedbackToReview(String feedback, Integer reviewId);
//    Review submitFeedbackToReview(String feedback, Integer reviewId);


}
