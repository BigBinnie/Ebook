package com.ebook.ebook.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

public class UserStatistic implements Serializable {
    private User user;
    private Integer buys;
    private Double costs;
    private List<BookStatistic> bookStatistics;

    public UserStatistic(User user, List<BookStatistic> bookStatistics) {
        this.user = user;
        this.bookStatistics = bookStatistics;
        this.buys = 0;
        this.costs = 0.0;

        for (BookStatistic book:
                bookStatistics) {
            this.buys += book.getSales();
            this.costs += book.getPrices();
        }

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getBuys() {
        return buys;
    }

    public void setBuys(Integer buys) {
        this.buys = buys;
    }

    public Double getCosts() {
        return costs;
    }

    public void setCosts(Double costs) {
        this.costs = costs;
    }

    public List<BookStatistic> getBookStatistics() {
        return bookStatistics;
    }

    public void setBookStatistics(List<BookStatistic> bookStatistics) {
        this.bookStatistics = bookStatistics;
    }

    @Override
    public String toString() {
        return "UserStatistic{" +
                "user=" + user +
                ", buys=" + buys +
                ", costs=" + costs +
                ", bookStatistics=" + bookStatistics +
                '}';
    }
}
