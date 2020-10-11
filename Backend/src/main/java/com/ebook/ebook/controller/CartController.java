package com.ebook.ebook.controller;

import com.ebook.ebook.entity.Cart;
import com.ebook.ebook.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CartController {
    @Autowired
    private CartService cartService;

    @RequestMapping("/addCart")
    public Cart addCart(@RequestBody Map<String, String> params){
        System.out.println("try to add cart");
        String bookid=params.get("bookId");
        String userid=params.get("userId");
        return cartService.addCart(Integer.parseInt(bookid),Integer.parseInt(userid));
    }
    @RequestMapping("/getCarts")
    public List<Cart> getCarts(@RequestBody Map<String, String> params) {
        System.out.println("try to search cart");
        String userid=params.get("userId");
        List<Cart> o=cartService.findAllCart(Integer.parseInt(userid));
        System.out.println(o);
        return o;
    }
    @RequestMapping("clearCart")
    public List<Cart> clearCart(@RequestBody Map<String, String> params){
        String userid=params.get("userId");
        List<Cart> carts=cartService.findAllCart(Integer.parseInt(userid));

        return cartService.deleteByUserId(Integer.parseInt(userid));
    }
    @RequestMapping("/deleteCart")
    public Integer deleteCart(@RequestParam("id") Integer id){
        System.out.println("delete cart");
        return cartService.deleteCart(id);
    }
}
