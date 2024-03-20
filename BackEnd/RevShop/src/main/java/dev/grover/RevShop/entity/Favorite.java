package dev.grover.RevShop.entity;

import dev.grover.RevShop.entity.idClasses.FavoriteId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(FavoriteId.class)
public class Favorite {
    @Id
    private Integer user_id;

    @Id
    private Integer product_id;

    public Favorite() {
    }

    public Favorite(Integer user_id, Integer product_id) {
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
    public String toString() {
        return "FAV: User: " + user_id + " Product: " + product_id;
    }
}
