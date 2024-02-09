package dev.grover.RevShop.entity.idClasses;

import java.io.Serializable;

public class OrderItemId implements Serializable {
    private Integer order_id;
    private Integer product_id;

    public OrderItemId(Integer order_id, Integer product_id) {
        this.order_id = order_id;
        this.product_id = order_id;
    }
}
