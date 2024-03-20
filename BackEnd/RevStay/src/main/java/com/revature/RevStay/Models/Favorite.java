package com.revature.RevStay.Models;

import com.revature.RevStay.Models.idClasses.FavoriteId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "favorites")
@IdClass(FavoriteId.class)
@Data @NoArgsConstructor
public class Favorite {
    @Id
    private Integer userId;
    @Id
    private Integer hotelId;

    public Favorite(Integer userId, Integer hotelId) {
        this.userId = userId;
        this.hotelId = hotelId;
    }
}
