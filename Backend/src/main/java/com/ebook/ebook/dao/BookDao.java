package com.ebook.ebook.dao;

import com.ebook.ebook.entity.Book;

import java.util.List;

public interface BookDao {
    Book findOne(Integer id);
    List<Book> getBooks();
    Book changeBookInfo(Integer bookId,Integer inventory,double price,String name,String author,String isbn,String description,String imageBase64);
    Book insertBook(Integer inventory,double price,String name,String author,String isbn,String description,String imageBase64,String type);
    Integer deleteBook(Integer book_id);
    Integer decreaseInventory(Integer book_id,Integer amount);
}
