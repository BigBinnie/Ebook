package com.ebook.ebook.service;

import com.ebook.ebook.entity.BookStatistic;
import com.ebook.ebook.entity.UserStatistic;

import java.util.Date;
import java.util.List;

public interface StatisticService {
    List<BookStatistic> getSaleOfBook(Date date1, Date date2);
    List<BookStatistic> getUserSaleofBook(Date date1, Date date2,Integer userId);
    List<UserStatistic> getSaleOfUser(Date date1,Date date2);
    UserStatistic getUserStatictic(Date date1,Date date2,Integer userId);
}
