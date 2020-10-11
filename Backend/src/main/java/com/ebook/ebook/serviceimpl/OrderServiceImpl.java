package com.ebook.ebook.serviceimpl;

import com.ebook.ebook.dao.BookDao;
import com.ebook.ebook.dao.OrderDao;
import com.ebook.ebook.entity.Cart;
import com.ebook.ebook.entity.Order;
import com.ebook.ebook.entity.OrderItem;
import com.ebook.ebook.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderDao orderDao;
    @Autowired
    BookDao bookDao;

    @Override
    public List<Order> findAllOrder(Integer userID) {
        List<Order> o=orderDao.findByUserID(userID);
        System.out.println("service");
        return o;
    }
    @Override
    public Order addOrder(Integer book_id,Integer user_id){
        bookDao.decreaseInventory(book_id,1);
        return orderDao.addOrder(book_id,user_id);
    }
    @Override
    public Order addOrderByCart(Integer cart_id,Integer user_id){
        return orderDao.addOrderByCart(cart_id,user_id);
    }
    @Override
    public List<OrderItem> getOrderItems(Integer order_id){
        return orderDao.getOrderItems(order_id);
    }
    @Override
    public List<Order> getOrders(){return orderDao.getOrders();}
}
