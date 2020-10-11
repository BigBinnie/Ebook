package com.ebook.ebook.daoimpl;


import com.ebook.ebook.dao.BookDao;
import com.ebook.ebook.dao.CartDao;
import com.ebook.ebook.entity.Cart;
import com.ebook.ebook.repository.BookRepository;
import com.ebook.ebook.repository.CartRepository;
import com.ebook.ebook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Cart> findByUserID(Integer id){
        return cartRepository.findCartsByUser(userRepository.getOne(id));
    }

    @Override
    public Cart addCart(Integer book_id,Integer user_id){
        System.out.println("here");
        Cart cart=new Cart();
        cart=cartRepository.findCartByBookAndUser(bookRepository.getOne(book_id),userRepository.getOne(user_id));
        if(cart!=null){
            System.out.println("null");
            Integer amount=cart.getAmount();
            cart.setAmount(amount+1);
            return cartRepository.saveAndFlush(cart);
        }
       else {
           Cart new_cart=new Cart();
           new_cart.setAmount(1);
           new_cart.setBook(bookRepository.getOne(book_id));
           new_cart.setUser(userRepository.getOne(user_id));
           return cartRepository.saveAndFlush(new_cart);
        }
    }
    @Override
    @Transactional

    public List<Cart> deleteByUserId(Integer id){
        cartRepository.deleteAllByUser(userRepository.getOne(id));
        return cartRepository.findCartsByUser(userRepository.getOne(id));
    }
    @Override
    @Transactional
    public Integer deleteCart(Integer id){
        return cartRepository.deleteCartByCartId(id);
    }
}
