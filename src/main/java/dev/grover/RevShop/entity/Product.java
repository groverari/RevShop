package dev.grover.RevShop.entity;

import jakarta.persistence.*;
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer ID;

    private String product_name;
    private String info;
    private Double price;


    public Product(){}

    public Product(String product_name, String info, Double price){
        this.product_name = product_name;
        this.info = info;
        this.price = price;
    }

    public Product(Integer ID, String product_name, String info, Double price){
        this.ID = ID;
        this.product_name = product_name;
        this.info = info;
        this.price = price;
    }


    public Integer getID(){return ID; }
    public void setID(Integer ID){this.ID = ID;}

    public String getProduct_name(){return product_name;}
    public void setProduct_name(String product_name){this.product_name= product_name;}

    public String getInfo(){return info;}
    public void setInfo(String info){this.info = info;}

    public Double getPrice(){return price;}
    public void setPrice(Double price){this.price = price;}


    @Override
    public boolean equals(Object obj){
        if(this == obj) return true;

        if(obj == null) return  false;

        if(getClass() != obj.getClass()) return false;

        Product other = (Product) obj;
        if(ID == null && other.getID() != null) return false;

        return ID == other.getID();
    }

    @Override
    public String toString(){
        return "Product: " + ID +
                " " + product_name +
                " $" + price + " " + info;
    }


}
