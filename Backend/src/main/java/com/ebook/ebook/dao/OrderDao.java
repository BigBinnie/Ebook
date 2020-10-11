package com.ebook.ebook.dao;

import com.ebook.ebook.entity.Cart;
import com.ebook.ebook.entity.Order;
import com.ebook.ebook.entity.OrderItem;

import java.util.Date;
import java.util.List;

public interface OrderDao {
    List<Order> findByUserID(Integer id);
    Order addByCart(List<Cart> carts,Integer userId);
    Order addOrder(Integer book_id,Integer user_id);
    Order addOrderByCart(Integer cartId,Integer user_id);
    List<OrderItem> getOrderItems(Integer order_id);
    List<Order> getOrders();
    List<Order> findByDate(Date date1, Date date2);
    List<Order> findByDateAndUser(Date date1, Date date2, Integer userID);
}
