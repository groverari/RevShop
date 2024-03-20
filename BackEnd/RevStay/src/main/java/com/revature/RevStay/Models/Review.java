package com.revature.RevStay.Models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;
    private Integer userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    @JsonIgnoreProperties("reviews")
    private Hotel hotel;

    private Integer rating;
    private String text;
    private String feedback;

    public Review(Integer userId, Hotel hotel, Integer rating, String text, String feedback) {
        this.userId = userId;
        this.hotel = hotel;
        this.rating = rating;
        this.text = text;
        this.feedback = feedback;
    }
    public Review(Integer userId, Hotel hotel, Integer rating, String text) {
        this.userId = userId;
        this.hotel = hotel;
        this.rating = rating;
        this.text = text;
    }
}
