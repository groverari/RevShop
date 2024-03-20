package dev.grover.RevShop.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    @Column(name="user_id")
    private Integer userId;
    private Double total;
    private String street;
    private String city;
    private String state;
    private String zip;


    public Order() {
    }

    public Order(Integer userId, Double total, String street, String city, String state, String zip) {
        this.userId = userId;
        this.total = total;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public Order(Integer Id, Integer userId, Double total, String street, String city, String state, String zip) {
        this.ID = Id;
        this.userId = userId;
        this.total = total;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public Integer getID() {
        return ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer user_id) {
        this.userId = user_id;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;

        if (obj == null) return false;

        if (getClass() != obj.getClass()) return false;

        Order other = (Order) obj;
        if (ID == null && other.getID() != null) return false;

        return ID == other.getID();
    }


    @Override
    public String toString() {
        return "Order #: " + ID +
                " For: " + userId +
                " Total: " + total +
                " At Address: " + street + " " + city + " " + state + " " + zip;
    }

}
