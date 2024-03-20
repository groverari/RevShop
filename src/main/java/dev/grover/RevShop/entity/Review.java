package dev.grover.RevShop.entity;

import dev.grover.RevShop.entity.idClasses.ReviewId;
import dev.grover.RevShop.entity.User;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "reviews")
@IdClass(ReviewId.class)
public class Review {
    @Id
    private Integer user_id;

    @Id
    private Integer product_id;

    private String review;

    @ManyToOne
    @JoinColumn(name = "ID", nullable = false)
    private User user;

    public Review() {
    }

    public Review(Integer user_id, Integer product_id, String review, User user) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.review = review;
        this.user = user;
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

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review1 = (Review) o;
        return Objects.equals(user_id, review1.user_id) && Objects.equals(product_id, review1.product_id) && Objects.equals(review, review1.review) && Objects.equals(user, review1.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, product_id, review, user);
    }

    @Override
    public String toString() {
        return "Review{" +
                "user_id=" + user_id +
                ", product_id=" + product_id +
                ", review='" + review + '\'' +
                ", user=" + user +
                '}';
    }
}