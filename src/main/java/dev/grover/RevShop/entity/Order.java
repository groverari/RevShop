package dev.grover.RevShop.entity;

import jakarta.persistence.*;

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


    public Order(){}

}
