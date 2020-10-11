package com.ebook.ebook.repository;
import com.ebook.ebook.entity.UserIcon;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserIconRepository extends MongoRepository<UserIcon,Integer> {

}
