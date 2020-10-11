package com.ebook.ebook.daoimpl;

import com.ebook.ebook.entity.Book;
import com.ebook.ebook.dao.BookDao;
import com.ebook.ebook.entity.BookImage;
import com.ebook.ebook.entity.UserIcon;
import com.ebook.ebook.entity.UserPro;
import com.ebook.ebook.repository.BookImageRepository;
import com.ebook.ebook.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookImageRepository bookImageRepository;

    @Override
    public Book findOne(Integer id){
        Book book=bookRepository.getOne(id);
        Optional<BookImage> image=bookImageRepository.findById(id);
        if(image.isPresent()){
            System.out.println("Book has image"+id);
            book.setBookimage(image.get());
        }
        else{
            book.setBookimage(null);
            System.out.println("NULL");
        }
        return book;
    }

    @Override
    public List<Book> getBooks(){
        List<Book> books=bookRepository.getBooks();
        Iterator<Book> it = books.iterator();
        while (it.hasNext()){
            Book book=it.next();
            Integer id=book.getBookId();
            Optional<BookImage> image=bookImageRepository.findById(id);
            System.out.println(image);
            if(image.isPresent()){
                System.out.println("Book has image"+id);
                book.setBookimage(image.get());
            }
            else{
                BookImage bookImage=new BookImage(id,"data:image/png;base64,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");
                bookImageRepository.save(bookImage);
                book.setBookimage(bookImage);
                System.out.println("Insert default book image");
            }
        }
        return books;
    }
    @Override
    public Book changeBookInfo(Integer bookId,Integer inventory,double price,String name,String author,String isbn,String description,String imageBase64){
        System.out.println("change book info");
        Book book=bookRepository.getOne(bookId);
        book.setInventory(inventory);
        book.setPrice(price);
        book.setName(name);
        book.setAuthor(author);
        book.setIsbn(isbn);
        book.setDescription(description);

        Optional<BookImage> bookImage=bookImageRepository.findById(bookId);
        if(bookImage.isPresent()){
            System.out.println("Book has image"+bookId);
            if(imageBase64!=null){
                bookImage.get().setImageBase64(imageBase64);
                bookImageRepository.save(bookImage.get());
            }
            book.setBookimage(bookImage.get());
        }
        else {
            if(imageBase64==null) imageBase64="data:image/png;base64,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";
            BookImage image=new BookImage(bookId,imageBase64);
            bookImageRepository.save(image);
            book.setBookimage(image);
        }
        return bookRepository.saveAndFlush(book);
    }
    @Override
    public Book insertBook(Integer inventory,double price,String name,String author,String isbn,String description,String imageBase64,String type){
        Book book=new Book();
        book.setInventory(inventory);
        book.setPrice(price);
        book.setName(name);
        book.setAuthor(author);
        book.setIsbn(isbn);
        book.setDescription(description);
        book.setType(type);
        bookRepository.saveAndFlush(book);
        Integer id=book.getBookId();
        if(imageBase64==null) imageBase64="data:image/png;base64,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";
        BookImage image=new BookImage(id,imageBase64);
        bookImageRepository.save(image);
        book.setBookimage(image);
        return bookRepository.saveAndFlush(book);
    }
    @Override
    @Transactional
    public Integer deleteBook(Integer book_id){
        bookImageRepository.deleteBookImageById(book_id);
        return bookRepository.deleteBookByBookId(book_id);
    }
    @Override
    public Integer decreaseInventory(Integer book_id,Integer amount)
    {
        Book book=bookRepository.getOne(book_id);
        book.setInventory(book.getInventory()-0);
        bookRepository.saveAndFlush(book);
        return book_id;
    }
}
