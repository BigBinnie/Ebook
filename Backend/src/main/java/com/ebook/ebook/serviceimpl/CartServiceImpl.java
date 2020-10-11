package com.ebook.ebook.serviceimpl;

import com.ebook.ebook.dao.CartDao;
import com.ebook.ebook.dao.OrderDao;
import com.ebook.ebook.entity.Cart;
import com.ebook.ebook.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartDao cartDao;
    @Autowired
    private OrderDao orderDao;
    @Override
    public List<Cart> findAllCart(Integer userID){
        return cartDao.findByUserID(userID);
    }
    @Override
    public Cart addCart(Integer book_id,Integer user_id){
        return cartDao.addCart(book_id,user_id);
    }
    @Override
    public List<Cart> deleteByUserId(Integer id){
        orderDao.addByCart(cartDao.findByUserID(id),id);
        return cartDao.deleteByUserId(id);
    }
    @Override
    public Integer deleteCart(Integer id){
        return cartDao.deleteCart(id);
    }
}
