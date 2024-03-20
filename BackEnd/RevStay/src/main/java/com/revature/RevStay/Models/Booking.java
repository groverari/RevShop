package com.revature.RevStay.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name="bookings")
@Data @NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer booking_id;
    private Integer userId;
    private Integer hotelId;
    private Integer roomId;
    private Integer guests;
    private Integer numRooms;
    @Temporal(TemporalType.DATE)
    private Date checkIn;
    @Temporal(TemporalType.DATE)
    private Date checkOut;
    private String status;
    private Boolean read;

    public Booking(Integer userId, Integer hotelId, Integer roomId, Integer guests, Integer numRooms, Date checkIn, Date checkout, String status, Boolean read) {
        this.userId = userId;
        this.hotelId = hotelId;
        this.roomId = roomId;
        this.guests = guests;
        this.numRooms = numRooms;
        this.checkIn = checkIn;
        this.checkOut = checkout;

        this.status = status;
        this.read = read;
    }
}

