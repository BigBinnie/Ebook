package com.ebook.ebook.repository;

import com.ebook.ebook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findUserByName(String username);

}
