package com.ebook.ebook.service;

import com.ebook.ebook.entity.Order;
import com.ebook.ebook.entity.OrderItem;

import java.util.List;

public interface OrderService {
    List<Order> findAllOrder(Integer userID);
    Order addOrder(Integer book_id,Integer user_id);
    Order addOrderByCart(Integer cart_id,Integer user_id);
    List<OrderItem> getOrderItems(Integer order_id);
    List<Order> getOrders();
}
