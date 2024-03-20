package dev.grover.RevShop.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer review_id;
    //private Integer user_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;

    private String review;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "user_id")
    private User user;

    public Review() {
    }

    public Review(Product product, String review, User user) {
        this.product = product;
        this.review = review;
        this.user = user;
    }

    public Review(Integer review_id, User u, Product p, String review) {
        this.review_id= review_id;
        this.product = p;
        this.user = u;
        this.review = review;
    }

    public Integer getReview_id() {
        return review_id;
    }

    public void setReview_id(Integer review_id) {
        this.review_id = review_id;
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
        return Objects.equals(review_id, review1.review_id)   && Objects.equals(review, review1.review);
    }

    @Override
    public int hashCode() {
        return Objects.hash(review_id, review);
    }

    @Override
    public String toString() {
        return "Review{" +
                "review_id=" + review_id +
                ", user_id=" + user.getID() +
                ", product_id=" + product.getID() +
                ", review='" + review + '\'' +
                '}';
    }
}