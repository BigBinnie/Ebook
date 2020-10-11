package com.ebook.ebook.controller;

import com.ebook.ebook.entity.Book;
import com.ebook.ebook.entity.Order;
import com.ebook.ebook.entity.OrderItem;
import com.ebook.ebook.service.OrderService;
import net.sf.json.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping("/getOrders")
    public List<Order> getOrders(@RequestBody Map<String, String> params) {
        System.out.println("try to search order");
        String userid=params.get("userId");
        List<Order> o=orderService.findAllOrder(Integer.parseInt(userid));
        System.out.println(o);
        return o;
    }
    @RequestMapping("/addOrder")
    public Order addOrder(@RequestBody Map<String, String> params){
        String bookid=params.get("bookId");
        String userid=params.get("userId");
        return orderService.addOrder(Integer.parseInt(bookid),Integer.parseInt(userid));
    }
    @RequestMapping("/addOrderByCart")
    public Order addOrderByCart(@RequestBody Map<String, String> params){
        String cartid=params.get("cartId");
        String userid=params.get("userId");
        return orderService.addOrderByCart(Integer.parseInt(cartid),Integer.parseInt(userid));
    }
    @RequestMapping("/getOrderItems")
    public List<OrderItem> getOrderItems(@RequestBody Map<String, String> params){
        String order_id=params.get("orderId");
        System.out.println(orderService.getOrderItems(Integer.parseInt(order_id)));
        return orderService.getOrderItems(Integer.parseInt(order_id));
    }
    @RequestMapping("/getAllOrders")
    public List<Order> getAllOrders(@RequestBody Map<String, String> params) {
        System.out.println(orderService.getOrders());
        return orderService.getOrders();
    }

}
