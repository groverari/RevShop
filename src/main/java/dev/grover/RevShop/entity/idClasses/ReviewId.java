package dev.grover.RevShop.entity.idClasses;

import jakarta.persistence.criteria.CriteriaBuilder;

import java.io.Serializable;
import java.util.Objects;

public class ReviewId implements Serializable {
    private Integer user_id;
    private Integer product_id;

    public ReviewId() {
    }

    public ReviewId(Integer user_id, Integer product_id) {
        this.user_id = user_id;
        this.product_id = product_id;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReviewId reviewId = (ReviewId) o;
        return Objects.equals(user_id, reviewId.user_id) && Objects.equals(product_id, reviewId.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, product_id);
    }
}
