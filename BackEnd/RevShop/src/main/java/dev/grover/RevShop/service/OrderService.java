package dev.grover.RevShop.service;

import dev.grover.RevShop.entity.Order;
import dev.grover.RevShop.repository.OrderRepository;
import dev.grover.RevShop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
     OrderRepository orderRepository;
     UserRepository userRepository;

    @Autowired
    public OrderService(OrderRepository o, UserRepository u ){
        this.orderRepository = o;
        this.userRepository = u;
    }


    public Order checkout( Order o){
        if(userRepository.existsById(o.getUserId())){
            return orderRepository.save(o);
        }
        return null;
    }

    public List<Order> userOrders(Integer id){
        return orderRepository.findAllByUserId(id);
    }
}
