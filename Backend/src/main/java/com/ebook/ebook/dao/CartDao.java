package com.ebook.ebook.dao;

import com.ebook.ebook.entity.Cart;

import java.util.List;

public interface CartDao {
    List<Cart> findByUserID(Integer id);
    Cart addCart(Integer book_id,Integer user_id);
    List<Cart> deleteByUserId(Integer id);
    Integer deleteCart(Integer id);
}
