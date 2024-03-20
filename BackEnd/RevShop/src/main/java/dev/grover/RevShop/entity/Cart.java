package dev.grover.RevShop.entity;

import dev.grover.RevShop.entity.idClasses.CartId;
import jakarta.persistence.*;

@Entity
@IdClass(CartId.class)
public class Cart {

    @Id
    @Column(name="user_id")
    private Integer userId;

    @Id
    private Integer product_id;

    private Integer quantity;

    public Cart() {
    }

    public Cart(Integer userId, Integer product_id, Integer quantity) {
        this.userId = userId;
        this.product_id = product_id;
        this.quantity = quantity;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer user_id) {
        this.userId = user_id;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "CART: User: " + userId + " Product: " + product_id;
    }
}
