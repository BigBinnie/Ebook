package com.ebook.ebook.service;

import com.ebook.ebook.entity.User;
import com.ebook.ebook.entity.UserPro;

import java.util.List;

public interface UserService {

    UserPro checkUser(String username, String password);
    User findUserById(Integer id);
    User addUser(String username,String password,String email,String nickname);
    Boolean checkUserName(String username);
    List<User> getUsers();
    User banUser(Integer user_id);
}
