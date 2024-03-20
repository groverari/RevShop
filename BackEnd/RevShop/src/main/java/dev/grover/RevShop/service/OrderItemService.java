package dev.grover.RevShop.service;

import dev.grover.RevShop.entity.Order;
import dev.grover.RevShop.entity.OrderItem;
import dev.grover.RevShop.repository.OrderItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    OrderItemRepository repository;

    public OrderItemService(OrderItemRepository o){
        this.repository = o;
    }

    public void add(Integer id, Integer product_id, Integer quantity){
        repository.save(new OrderItem(id, product_id, quantity));
    }

    public List<OrderItem> getAllItems(Integer id){
        return repository.findAllByOrderId(id);
    }
}
