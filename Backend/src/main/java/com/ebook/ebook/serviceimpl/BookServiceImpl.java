package com.ebook.ebook.serviceimpl;

import com.ebook.ebook.entity.Book;
import com.ebook.ebook.dao.BookDao;
import com.ebook.ebook.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(Integer id){return bookDao.findOne(id);}

    @Override
    public List<Book> getBooks(){return bookDao.getBooks();}
    @Override
    public Book changeBookInfo(Integer bookId,Integer inventory,double price,String name,String author,String isbn,String description,String imageBase64)
    {
        return bookDao.changeBookInfo(bookId,inventory,price,name,author,isbn,description,imageBase64);
    }
    @Override
    public Book insertBook(Integer inventory,double price,String name,String author,String isbn,String description,String imageBase64,String type)
    {
        return bookDao.insertBook(inventory,price,name,author,isbn,description,imageBase64,type);
    }
    @Override
    public Integer deleteBook(Integer book_id)
    {
        return bookDao.deleteBook(book_id);
    }
}
