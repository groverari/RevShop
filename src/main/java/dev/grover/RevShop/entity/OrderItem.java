package dev.grover.RevShop.entity;

import dev.grover.RevShop.entity.idClasses.OrderItemId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

import java.util.Objects;

@Entity
@IdClass(OrderItemId.class)
public class OrderItem {
    @Id
    private Integer order_id;
    @Id
    private Integer product_id;


    public OrderItem() {
    }

    public OrderItem(Integer order_id, Integer product_id) {
        this.order_id = order_id;
        this.product_id = product_id;
    }

    public Integer getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer user_id) {
        this.product_id = user_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return Objects.equals(order_id, orderItem.order_id) && Objects.equals(product_id, orderItem.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order_id, product_id);
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "order_id=" + order_id +
                ", user_id=" + product_id +
                '}';
    }
}
