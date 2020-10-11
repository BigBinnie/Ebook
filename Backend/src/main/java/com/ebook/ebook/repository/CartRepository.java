package com.ebook.ebook.repository;

import com.ebook.ebook.entity.Book;
import com.ebook.ebook.entity.Cart;
import com.ebook.ebook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Integer> {
    List<Cart> findCartsByUser(User user);
    Cart findCartByBook(Book book);
    Cart findCartByBookAndUser(Book book,User user);
    List<Cart> deleteAllByUser(User user);
    Integer deleteCartByCartId(Integer id);
}
