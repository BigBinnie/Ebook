package com.ebook.ebook.controller;

import com.ebook.ebook.entity.Book;
import com.ebook.ebook.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks(@RequestBody Map<String, String> params) {
        return bookService.getBooks();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id){
        return bookService.findBookById(id);
    }

    @RequestMapping("/changeBookInfo")
    public Book changeBookInfo(@RequestBody Map<String, String> params){
        Integer bookId=Integer.valueOf(params.get("bookId"));
        Integer inventory=Integer.valueOf(params.get("inventory"));
        Double price=Double.valueOf(params.get("price"));
        String imageBase64=params.get("imageBase64");
        String name=params.get("name");
        String author=params.get("author");
        String isbn=params.get("isbn");
        String description=params.get("description");
        return bookService.changeBookInfo(bookId,inventory,price,name,author,isbn,description,imageBase64);
    }
    @RequestMapping("/insertBook")
    public Book insertBookInfo(@RequestBody Map<String, String> params){
        Integer inventory=Integer.valueOf(params.get("inventory"));
        Double price=Double.valueOf(params.get("price"));
        String imageBase64=params.get("imageBase64");
        String name=params.get("name");
        String author=params.get("author");
        String isbn=params.get("isbn");
        String description=params.get("description");
        String type=params.get("type");
        return bookService.insertBook(inventory,price,name,author,isbn,description,imageBase64,type);
    }
    @RequestMapping("/deleteBook")
    public Integer deleteBook(@RequestParam("id") Integer id){

        return bookService.deleteBook(id);
    }
}
