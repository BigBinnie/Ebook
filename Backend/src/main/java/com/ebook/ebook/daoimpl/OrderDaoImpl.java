package com.ebook.ebook.daoimpl;

import com.ebook.ebook.dao.BookDao;
import com.ebook.ebook.dao.OrderDao;
import com.ebook.ebook.dao.UserDao;
import com.ebook.ebook.entity.Book;
import com.ebook.ebook.entity.Cart;
import com.ebook.ebook.entity.Order;
import com.ebook.ebook.entity.OrderItem;
import com.ebook.ebook.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private CartRepository cartRepository;

    private BookDao bookDao;
    @Override
    public List<Order> findByUserID(Integer id) {
        List<Order> orders =orderRepository.findOrderByUserId(id);
        //System.out.println(orders);
        //List<OrderItem> orders = orderRepository.getOrders(id);
        return orders;
    }
    @Override
    public Order addByCart(List<Cart> carts,Integer userId){
        Order order=new Order();
        order.setUserId(userId);
        order.setState("completed");
        order.setDate(new Date());
        List<OrderItem> orderItems=new LinkedList<>();
        orderRepository.saveAndFlush(order);
        double totPrice=0;
        Iterator<Cart> it = carts.iterator();
        while(it.hasNext()){
            Cart cart = it.next();
            OrderItem orderItem=new OrderItem();
            orderItem.setOrderId(order.getOrderID());
            System.out.println(order.getOrderID());
            orderItem.setBook(cart.getBook());
            orderItem.setAmount(cart.getAmount());
            orderItemRepository.saveAndFlush(orderItem);
            orderItems.add(orderItem);
            Book book=cart.getBook();
            book.setInventory(book.getInventory()-cart.getAmount());
            totPrice+=book.getPrice()*cart.getAmount();
            System.out.println(totPrice);
        }
        order.setTotPrice(totPrice);
        order.setOrderItems(orderItems);
        orderRepository.saveAndFlush(order);
        return order;
    }
    @Override
    public Order addOrder(Integer book_id,Integer user_id){
        Cart cart=new Cart();
        cart.setAmount(1);
        cart.setBook(bookRepository.getOne(book_id));
        cart.setUser(userRepository.getOne(user_id));
        List<Cart> carts=new LinkedList<>();
        carts.add(cart);
        return addByCart(carts,user_id);
    }
    @Override
    public Order addOrderByCart(Integer cartId,Integer user_id){
        Cart cart=cartRepository.getOne(cartId);
        List<Cart> carts=new LinkedList<>();
        carts.add(cart);
        return addByCart(carts,user_id);
    }
    @Override
    public List<OrderItem> getOrderItems(Integer order_id){
        return orderItemRepository.findOrderItemsByOrderId(order_id);
    }
    @Override
    public List<Order> getOrders(){
        return orderRepository.getOrders();
    }
    @Override
    public List<Order> findByDate(Date date1, Date date2)
    {
        return orderRepository.findOrdersByDateBetween(date1,date2);
    }
    @Override
    public List<Order> findByDateAndUser(Date date1, Date date2, Integer userID)
    {
        return orderRepository.findOrdersByDateBetweenAndUserId(date1,date2,userID);
    }
}
