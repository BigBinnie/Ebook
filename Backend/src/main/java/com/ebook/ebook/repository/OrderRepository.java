package com.ebook.ebook.repository;

import com.ebook.ebook.entity.Book;
import com.ebook.ebook.entity.Order;
import com.ebook.ebook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    List<Order> findOrderByUserId(Integer id);
    @Query("select o from Order o")
    List<Order> getOrders();
    List<Order> findOrdersByDateBetween(Date date1, Date date2);
    List<Order> findOrdersByDateBetweenAndUserId(Date date1, Date date2,Integer userId);
}
