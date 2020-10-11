package com.ebook.ebook.service;

import com.ebook.ebook.entity.Book;

import java.util.List;

public interface BookService {
    Book findBookById(Integer id);
    List<Book> getBooks();
    Book changeBookInfo(Integer bookId,Integer inventory,double price,String name,String author,String isbn,String description,String imageBase64);
    Book insertBook(Integer inventory,double price,String name,String author,String isbn,String description,String imageBase64,String type);
    Integer deleteBook(Integer book_id);
}
