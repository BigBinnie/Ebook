package com.ebook.ebook.serviceimpl;

import com.ebook.ebook.entity.User;
import com.ebook.ebook.dao.UserDao;
import com.ebook.ebook.entity.UserPro;
import com.ebook.ebook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public UserPro checkUser(String username,String password){
        return userDao.checkUser(username,password);
    }

    @Override
    public User findUserById(Integer id){
        return userDao.findOne(id);
    }
    @Override
    public User addUser(String username,String password,String email,String nickname)
    {
        return userDao.addUser(username,password,email,nickname);
    }
    @Override
    public Boolean checkUserName(String username){
        return userDao.checkUserName(username);
    }
    @Override
    public List<User> getUsers(){
        return userDao.getUsers();
    }
    @Override
    public User banUser(Integer user_id){
        return userDao.banUser(user_id);
    }
}
