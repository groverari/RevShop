package dev.grover.RevShop.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer order_item_id;
    @Column(name="order_id")
    private Integer orderId;

    private Integer product_id;
    private Integer quantity;


    public OrderItem() {
    }

    public OrderItem(Integer orderId, Integer product_id, Integer quantity) {
        this.orderId = orderId;
        this.product_id = product_id;
        this.quantity = quantity;
    }

    public OrderItem(Integer order_item_id, Integer orderId, Integer product_id, Integer quantity) {
        this.order_item_id = order_item_id;
        this.orderId = orderId;
        this.product_id = product_id;
        this.quantity = quantity;
    }

    public Integer getOrder_item_id() {
        return order_item_id;
    }

    public void setOrder_item_id(Integer order_item_id) {
        this.order_item_id = order_item_id;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer user_id) {
        this.product_id = user_id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return Objects.equals(order_item_id, orderItem.order_item_id) && Objects.equals(orderId, orderItem.orderId) && Objects.equals(product_id, orderItem.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order_item_id, orderId, product_id);
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "order_item_id=" + order_item_id +
                ", orderId=" + orderId +
                ", product_id=" + product_id +
                '}';
    }
}
