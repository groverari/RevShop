package dev.grover.RevShop.DTO;

import java.util.Objects;

public class ReviewUserDTO {
    private Integer product_id;
    private Integer user_id;
    private String review;

    public ReviewUserDTO() {
    }


    public ReviewUserDTO(Integer product_id, Integer user_id, String review) {
        this.product_id = product_id;
        this.user_id = user_id;
        this.review = review;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
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
        ReviewUserDTO that = (ReviewUserDTO) o;
        return Objects.equals(product_id, that.product_id) && Objects.equals(user_id, that.user_id) && Objects.equals(review, that.review);
    }

    @Override
    public int hashCode() {
        return Objects.hash(product_id, user_id, review);
    }
}

