package com.ebook.ebook.repository;

import com.ebook.ebook.entity.BookImage;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookImageRepository extends MongoRepository<BookImage,Integer> {
    BookImage deleteBookImageById(Integer id);
}
