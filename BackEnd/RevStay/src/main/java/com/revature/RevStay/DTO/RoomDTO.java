package com.revature.RevStay.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class RoomDTO {
    private Integer roomId;
    private Integer hotelId;
    private String roomName;
    private String description;
    private Double price;
    private Integer quantity;
    private String img;

    public RoomDTO(Integer hotelId, String roomName, String description, Double price, Integer quantity, String img) {
        this.hotelId = hotelId;
        this.roomName = roomName;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
    }
}
