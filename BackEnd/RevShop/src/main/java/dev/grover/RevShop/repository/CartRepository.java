package dev.grover.RevShop.repository;

import dev.grover.RevShop.entity.Cart;
import dev.grover.RevShop.entity.idClasses.CartId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, CartId> {

    public List<Cart> findAllByUserId(Integer user_id);
}
