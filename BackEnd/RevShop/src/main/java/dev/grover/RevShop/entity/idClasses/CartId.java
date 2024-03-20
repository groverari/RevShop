package dev.grover.RevShop.entity.idClasses;

import java.io.Serializable;


public class CartId implements Serializable {

    private Integer userId;

    private Integer product_id;


    public CartId(Integer user_id, Integer product_id) {
        this.userId = user_id;
        this.product_id = product_id;
    }

    public CartId() {

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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;

        if (obj == null) return false;

        if (getClass() != obj.getClass()) return false;

        CartId other = (CartId) obj;

        if (this.userId != other.getUserId()) return false;
        return this.product_id == other.getProduct_id();

    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public String toString() {
        return "CartId{" +
                "userId=" + userId +
                ", product_id=" + product_id +
                '}';
    }
}
