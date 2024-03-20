package com.revature.RevStay.Services;

import com.revature.RevStay.Models.Review;
import com.revature.RevStay.Repositories.HotelRepository;
import com.revature.RevStay.Repositories.ReviewRepository;
import jdk.swing.interop.SwingInterOpUtils;
import org.springframework.stereotype.Service;
import com.revature.RevStay.Models.Review;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final HotelRepository hotelRepository;

    public ReviewService(ReviewRepository reviewRepository, HotelRepository hotelRepository) {
        this.reviewRepository = reviewRepository;
        this.hotelRepository = hotelRepository;
    }

    public Integer getRatingByHotelId(Integer hotelId) {
        if(hotelId == null)
        {
            throw new IllegalStateException("hotel id is required!");
        }
        if(hotelRepository.findById(hotelId).isEmpty())
        {
            throw new IllegalStateException("Hotel with: "+ hotelId + " id does not exist!");
        }

        return reviewRepository.findAvgRatingByHotelId(hotelId);
    }

    public Review addNewReview(Review review) {
        if (review.getUserId() == null || review.getText() == null || review.getHotel() == null || review.getRating() == null ) {
            throw new IllegalStateException("Fields cannot be left empty!");
        }

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByHotelId(Integer hotelId) {
        if(hotelId == null)
        {
            throw new IllegalStateException("hotel id is required!");
        }
        if(hotelRepository.findById(hotelId).isEmpty())
        {
            throw new IllegalStateException("Hotel with: "+ hotelId + " id does not exist!");
        }

        return reviewRepository.findAllByHotelId(hotelId);
    }

    public void respondToCustomerReview(Review review) {

        System.out.println(review);

        if(review.getReviewId() == null)
        {
            throw new IllegalStateException("hotel id is required!");
        }

        Review myRev = reviewRepository.findById(review.getReviewId()).orElseThrow(() -> new IllegalStateException("review error"));

        myRev.setFeedback(review.getFeedback());

        reviewRepository.save(myRev);
    }
}
