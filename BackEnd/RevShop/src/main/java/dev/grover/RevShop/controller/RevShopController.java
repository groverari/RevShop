package dev.grover.RevShop.controller;

import dev.grover.RevShop.DTO.*;

import dev.grover.RevShop.entity.*;
import dev.grover.RevShop.entity.idClasses.CartId;
import dev.grover.RevShop.service.*;

import java.util.ArrayList;
import java.util.List;


import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/")
public class RevShopController {
    UserService userService;
    ProductService productService;
    CartService cartService;
    ReviewService reviewService;
    OrderService orderService;
    OrderItemService oItemService;
    EmailService emailService;

    @Autowired
    public RevShopController(UserService u, ProductService p, CartService c, ReviewService r, OrderService o, OrderItemService item, EmailService emailService) {
        this.userService = u;
        this.productService = p;
        this.cartService = c;
        this.reviewService = r;
        this.orderService = o;
        this.oItemService = item;
        this.emailService = emailService;
    }

    //Get ALL users is just to ensure the API is working

    @GetMapping("users")
    public ResponseEntity<List<User>> allUsers() {
        return ResponseEntity.status(200).body(userService.getAllUsers());
    }


    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDTO l) {
        User u = userService.login(l);
        if (u == null) {
            //Unable to find a username or the password was incorrect
            System.out.println("No one found");
            return ResponseEntity.status(401).body("Try Again Sucker");
        }
        return ResponseEntity.status(200).body(u);
    }


    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody User u) {
        User x = userService.register(u);

        if (x == null) {
            return ResponseEntity.status(400).body("Username already exists");
        }
        return ResponseEntity.status(200).body(x);
    }


    @GetMapping("products")
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.status(200).body(productService.getAllProducts());
    }


    @PostMapping("addToCart")
    public ResponseEntity<Boolean> addToCart(@RequestBody Cart c) {
        boolean success = cartService.add(c);
        int status = success ? 202 : 404;
        return ResponseEntity.status(status).body(success);
    }


    @PostMapping("product")
    public ResponseEntity<?> getProduct(@RequestBody IdDTO p){
        Product  out = productService.getProductById(p.getId());
        if(out != null) return ResponseEntity.status(200).body(out);
        return ResponseEntity.status(400).body("Could Not Find Product");
    }

    @PostMapping("addReview")
    public ResponseEntity<Boolean> addReview(@RequestBody ReviewUserDTO r){
        User u= userService.getUser(r.getUser_id());
        Product p = productService.getProductById(r.getProduct_id());
        Review review = new Review(p, r.getReview(), u);
        boolean success = reviewService.addReview(review);
        System.out.println(success);

        return ResponseEntity.status(200).body(true);
    }

    @PostMapping("getCart")
    public ResponseEntity<List<CartItemDTO>> getCartItem(@RequestBody UserIdDTO u){
        List<CartItemDTO> output = cartService.getCart(u.getUser_id());
        //return the output
        return ResponseEntity.status(200).body(output);
    }

    @PostMapping("removeCartItem")
    public ResponseEntity<?> removeCartItem(@RequestBody CartId c){
        cartService.deleteItem(c);
        return ResponseEntity.status(200).body("Done");
    }

    @PatchMapping("updateCartItem")
    public ResponseEntity<?> updateQuantity(@RequestBody Cart c){
        cartService.updateItem(c);

        return ResponseEntity.status(200).body("done");

    }


    @PostMapping("checkout")
    public ResponseEntity<?> checkout(@RequestBody Order o) throws MessagingException {

        //create a new order
        Order newOrder = orderService.checkout(o);

        if(newOrder == null) return ResponseEntity.status(400).body("User Could not be found");
        Integer orderId = newOrder.getID();

        //A list of all the Products that are in the cart
        List<Cart> items = cartService.getSimpleCart(o.getUserId());
        //add each item to order items table
        // finally delete all items from the cart
        for(Cart c: items){
            oItemService.add(orderId, c.getProduct_id(), c.getQuantity());
            cartService.delete(c);
        }

        //Email the user before This is all set up it just needs to be connected a valid smtp client
        //User u = userService.getUser(newOrder.getUserId());
        //emailService.sendSimpleMessage(u, items, newOrder);

        return ResponseEntity.status(203).body("Success");

    }

    @PostMapping("userOrders")
    public ResponseEntity<List<Order>> getOrders(@RequestBody IdDTO id){
        return ResponseEntity.status(200).body( orderService.userOrders(id.getId()));
    }

    @PostMapping("orderItems")
    public ResponseEntity<List<OrderItemDTO>> orderItems(@RequestBody IdDTO id){
        List<OrderItem> items = oItemService.getAllItems(id.getId());
        System.out.println(items);

        List<OrderItemDTO> output = new ArrayList<>();
        for(OrderItem o: items){
            OrderItemDTO temp = new OrderItemDTO();
            Product p = productService.getProductById(o.getProduct_id());
            temp.setName(p.getProduct_name());
            temp.setPrice(p.getPrice());
            temp.setQuantity(o.getQuantity());
            output.add(temp);
        }
        return ResponseEntity.status(200).body(output);

    }

}
