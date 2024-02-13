package dev.grover.RevShop.entity;

import dev.grover.RevShop.entity.idClasses.CartId;
import jakarta.persistence.*;

@Entity
@IdClass(CartId.class)
public class Cart {

    @Id
    private Integer user_id;

    @Id
    private Integer product_id;

    private Double quantity;

    public Cart() {
    }

    public Cart(Integer user_id, Integer product_id, Double quantity) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.quantity = quantity;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "CART: User: " + user_id + " Product: " + product_id;
    }
}
