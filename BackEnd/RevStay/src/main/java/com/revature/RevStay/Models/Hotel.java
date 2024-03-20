package com.revature.RevStay.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data @NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer hotelId;
    private Integer businessId;
    private String name;
    private String description;
    private String street;
    private String city;
    private String state;
    private String zip;
    private String img;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hotel")
    @JsonIgnoreProperties("hotel")
    private List<Review> reviewList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hotel")
    @JsonIgnoreProperties("hotel")
    private List<Room> roomList;

    public Hotel(Integer businessId, String name, String description, String street, String city, String state, String zip, String img) {
        this.businessId = businessId;
        this.name = name;
        this.description = description;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.img = img;
    }
}
