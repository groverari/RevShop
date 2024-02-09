package dev.grover.RevShop.entity.idClasses;

import java.io.Serializable;

public class FavoriteId implements Serializable {
    private Integer user_id;

    private Integer product_id;

    public FavoriteId(Integer user_id, Integer product_id) {
        this.user_id = user_id;
        this.product_id = product_id;
    }
}
