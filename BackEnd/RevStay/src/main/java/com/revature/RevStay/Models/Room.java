package com.revature.RevStay.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@NoArgsConstructor @Getter @Setter
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    @JsonIgnoreProperties("room")
    private Hotel hotel;
  
    private String roomName;
    private String description;
    private Integer quantity;

    @Column(name="price", columnDefinition = "numeric")
    private Double price;

    private String img;

    public Room(Hotel hotel, String roomName, String description,Integer quantity, Double price, String img) {
        this.hotel = hotel;
        this.roomName = roomName;
        this.quantity = quantity;
        this.price = price;
        this.description = description;
        this.img = img;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return Objects.equals(roomId, room.roomId) && Objects.equals(hotel, room.hotel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roomId, hotel);
    }

    @Override
    public String toString() {
        return "Room{" +
                "roomId=" + roomId +
                ", roomName='" + roomName + '\'' +
                ", description='" + description + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", img='" + img + '\'' +
                '}';
    }
}
