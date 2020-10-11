package com.ebook.ebook.dao;

import com.ebook.ebook.entity.User;
import com.ebook.ebook.entity.UserPro;

import java.util.List;

public interface UserDao {
    UserPro checkUser(String username,String password);
    User findOne(Integer id);
    User addUser(String username,String password,String email,String nickname);
    Boolean checkUserName(String username);
    List<User> getUsers();
    User banUser(Integer user_id);

}
