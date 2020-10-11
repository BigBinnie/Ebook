package com.ebook.ebook.entity;

import java.io.Serializable;

public class BookStatistic implements Serializable {
    private Book book;
    private Integer sales;
    private Double prices;

    public BookStatistic(Book book, Integer sales) {
        this.book = book;
        this.sales = sales;
        this.prices = book.getPrice()*sales;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
    }

    public Double getPrices() {
        return prices;
    }

    public void setPrices(Double prices) {
        this.prices = prices;
    }

    @Override
    public String toString() {
        return "BookStatistic{" +
                "book=" + book +
                ", sales=" + sales +
                ", prices=" + prices +
                '}';
    }
}
