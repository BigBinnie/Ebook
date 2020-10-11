package com.ebook.ebook.service;

import com.ebook.ebook.entity.Cart;

import java.util.List;

public interface CartService {
    List<Cart> findAllCart(Integer userID);
    Cart addCart(Integer book_id,Integer user_id);
    List<Cart> deleteByUserId(Integer id);
    Integer deleteCart(Integer id);
}
