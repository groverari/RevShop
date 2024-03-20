package dev.grover.RevShop.service;

import dev.grover.RevShop.DTO.CartItemDTO;
import dev.grover.RevShop.entity.Cart;
import dev.grover.RevShop.entity.Product;
import dev.grover.RevShop.entity.idClasses.CartId;
import dev.grover.RevShop.repository.CartRepository;

import dev.grover.RevShop.repository.ProductRepository;
import dev.grover.RevShop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    CartRepository cartRepository;
    UserRepository userRepository;
    ProductRepository productRepository;

    @Autowired
    public CartService(CartRepository c, UserRepository u, ProductRepository p) {
        this.cartRepository = c;
        this.userRepository = u;
        this.productRepository = p;
    }

    public boolean add(Cart c) {
        CartId temp = new CartId(c.getUserId(), c.getProduct_id());
        if (!cartRepository.existsById(temp) &&
                userRepository.existsById(c.getUserId()) &&
                productRepository.existsById(c.getProduct_id())) {
            cartRepository.save(c);
            return true;
        }
        return false;

    }

    public List<CartItemDTO> getCart(Integer user_id){

    // need to get a list of all cart items
        List<Cart> items= cartRepository.findAllByUserId(user_id);

    // need to initalize a list of DTO objects
        List<CartItemDTO> out = new ArrayList<>();

    //need to loop through the list creating a dto object that combines cart and product data
        for(Cart c: items){
            CartItemDTO  item = new CartItemDTO();
            Optional<Product> p = productRepository.findById(c.getProduct_id());
            p.ifPresent(product -> {
                item.setQuantity(c.getQuantity());
                item.setProduct_id(product.getID());
                item.setProduct_price(product.getPrice());
                item.setProduct_name(product.getProduct_name());
                item.setProduct_img(product.getImg());
            });
            out.add(item);

        }
        return out;
    }

    public List<Cart> getSimpleCart(Integer user_id){
        return cartRepository.findAllByUserId(user_id);
    }


    public void deleteItem(CartId c){

        cartRepository.deleteById(c);
    }

    public void delete(Cart c){
        cartRepository.delete(c);
    }

    public void updateItem(Cart c){
//        Optional<Cart> cart = cartRepository.findById(c);
//        if(cart.isPresent()) {
//            Cart old = cart.get();
//            old.setQuantity(quantity);
//            cartRepository.save(old)
//        }
        cartRepository.save(c);
    }
}
