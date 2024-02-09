package dev.grover.RevShop.entity.idClasses;

import java.io.Serializable;

public class CartId implements Serializable {

    private Integer user_id;

    private Integer product_id;

    public CartId(Integer user_id, Integer product_id) {
        this.user_id = user_id;
        this.product_id = product_id;
    }
}
