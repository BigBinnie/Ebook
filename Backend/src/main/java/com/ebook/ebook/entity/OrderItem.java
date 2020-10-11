package com.ebook.ebook.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "order_item")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class OrderItem {
    @Id
    @Column(name="orderitem_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderitemID;


    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    @Column(name = "order_id")
    private Integer orderId;

    @Basic
    @Column
    private Integer amount;

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }



    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="book_id")
    private Book book;

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Integer getOrderitemID() {
        return orderitemID;
    }

    public void setOrderitemID(Integer orderitemID) {
        this.orderitemID = orderitemID;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "orderitemID=" + orderitemID +
                ", orderId=" + orderId +
                ", amount=" + amount +
                ", book=" + book +
                '}';
    }
}
