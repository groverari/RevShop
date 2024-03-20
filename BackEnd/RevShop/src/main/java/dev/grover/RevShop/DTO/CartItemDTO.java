package dev.grover.RevShop.DTO;

public class CartItemDTO {
    private Integer quantity;
    private Integer product_id;
    private String product_name;
    private Double product_price;
    private String product_img;

    public CartItemDTO(){}
    public CartItemDTO( Integer quantity, Integer product_id, String product_name, Double product_price, String product_img) {

        this.quantity = quantity;
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_price = product_price;
        this.product_img = product_img;
    }


    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public Double getProduct_price() {
        return product_price;
    }

    public void setProduct_price(Double product_price) {
        this.product_price = product_price;
    }

    public String getProduct_img() {
        return product_img;
    }

    public void setProduct_img(String product_img) {
        this.product_img = product_img;
    }
}
