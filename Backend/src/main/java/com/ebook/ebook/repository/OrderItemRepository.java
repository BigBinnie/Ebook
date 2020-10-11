package com.ebook.ebook.repository;

import com.ebook.ebook.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem,Integer> {
    List<OrderItem> findOrderItemsByOrderId(Integer orde);
}
