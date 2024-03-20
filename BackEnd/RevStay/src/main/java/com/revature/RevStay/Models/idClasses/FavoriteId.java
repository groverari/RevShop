package com.revature.RevStay.Models.idClasses;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data @NoArgsConstructor
public class FavoriteId implements Serializable {

    private Integer userId;
    private Integer hotelId;
}
