package com.ebook.ebook.serviceimpl;

import com.ebook.ebook.dao.BookDao;
import com.ebook.ebook.dao.OrderDao;
import com.ebook.ebook.dao.UserDao;
import com.ebook.ebook.entity.*;
import com.ebook.ebook.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
@Service
public class StatisticServiceImpl implements StatisticService {
    @Autowired
    BookDao bookDao;
    @Autowired
    UserDao userDao;
    @Autowired
    OrderDao orderDao;

    private List<BookStatistic> getBookStatistic(List<Order> orders)
    {
        HashMap<Book, Integer> bookHashMap = new HashMap<>();
        for (Order o :
                orders) {
            for (OrderItem item :
                    o.getOrderItems()) {
                if (bookHashMap.containsKey(item.getBook()))
                    bookHashMap.put(item.getBook(), bookHashMap.get(item.getBook()) + item.getAmount());
                else
                    bookHashMap.put(item.getBook(), item.getAmount());
            }
        }

        List<BookStatistic> bookStatistics = new LinkedList<>();
        for (Book key :
                bookHashMap.keySet()) {
            bookStatistics.add(new BookStatistic(key, bookHashMap.get(key)));
        }
        return bookStatistics;
    }
    @Override
    public List<BookStatistic> getSaleOfBook(Date date1, Date date2)
    {
        List<Order> orders=orderDao.findByDate(date1,date2);
        return getBookStatistic(orders);
    }
    @Override
    public List<BookStatistic> getUserSaleofBook(Date date1, Date date2,Integer userId)
    {
        List<Order> orders=orderDao.findByDateAndUser(date1,date2,userId);
        return getBookStatistic(orders);
    }
    @Override
    public List<UserStatistic> getSaleOfUser(Date date1, Date date2)
    {
        List<UserStatistic> userStatistics = new LinkedList<>();
        List<User> users = userDao.getUsers();
        for (User user :
                users) {
            List<Order> orders = orderDao.findByDateAndUser(date1,date2,user.getUserId());
            userStatistics.add(new UserStatistic(user,getBookStatistic(orders)));
        }
        return userStatistics;
    }
    @Override
    public UserStatistic getUserStatictic(Date date1,Date date2,Integer userId)
    {
        User user=userDao.findOne(userId);
        List<Order> orders = orderDao.findByDateAndUser(date1,date2,userId);
        return new UserStatistic(user,getBookStatistic(orders));
    }
}
