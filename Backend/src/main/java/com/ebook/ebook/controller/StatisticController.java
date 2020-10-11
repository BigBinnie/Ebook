package com.ebook.ebook.controller;

import com.ebook.ebook.entity.BookStatistic;
import com.ebook.ebook.entity.Order;
import com.ebook.ebook.entity.UserStatistic;
import com.ebook.ebook.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class StatisticController {
    @Autowired
    StatisticService statisticService;

    @RequestMapping("/getBooksSale")
    public List<BookStatistic> getBookSale(@RequestBody Map<String, String> params) throws ParseException {
        System.out.println("find statistic");
        System.out.println(params.get("date1"));
        System.out.println(params.get("date2"));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date1=sdf.parse(params.get("date1"));
        Date date2=sdf.parse(params.get("date2"));

        return statisticService.getSaleOfBook(date1,date2);
    }
    @RequestMapping("/getUserBooksSale")
    public List<BookStatistic> getUserBookSale(@RequestBody Map<String, String> params) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date1=sdf.parse(params.get("date1"));
        Date date2=sdf.parse(params.get("date2"));
        Integer userId=Integer.valueOf(params.get("userId"));
        return statisticService.getUserSaleofBook(date1,date2,userId);
    }
    @RequestMapping("/getUsersSale")
    public List<UserStatistic> getUserSale(@RequestBody Map<String, String> params) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date1=sdf.parse(params.get("date1"));
        Date date2=sdf.parse(params.get("date2"));
        return statisticService.getSaleOfUser(date1,date2);
    }
    @RequestMapping("/getUserStatistic")
    public UserStatistic getUserStatistic(@RequestBody Map<String, String> params) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date1=sdf.parse(params.get("date1"));
        Date date2=sdf.parse(params.get("date2"));
        Integer userId=Integer.valueOf(params.get("userId"));
        return statisticService.getUserStatictic(date1,date2,userId);
    }
}
