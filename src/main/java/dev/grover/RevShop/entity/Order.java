package dev.grover.RevShop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer ID;
    private Integer user_id;
    private Double total;
    private String street;
    private String city;
    private String state;
    private String zip;


    public Order() {
    }

    public Order(Integer user_id, Double total, String street, String city, String state, String zip) {
        this.user_id = user_id;
        this.total = total;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public Order(Integer Id, Integer user_id, Double total, String street, String city, String state, String zip) {
        this.ID = Id;
        this.user_id = user_id;
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

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
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
                " For: " + user_id +
                " Total: " + total +
                " At Address: " + street + " " + city + " " + state + " " + zip;
    }

}
