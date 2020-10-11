package com.ebook.ebook.daoimpl;

import com.ebook.ebook.entity.*;
import com.ebook.ebook.dao.UserDao;
import com.ebook.ebook.repository.UserIconRepository;
import com.ebook.ebook.repository.UserProRepository;
import com.ebook.ebook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserProRepository userProRepository;

    @Autowired
    UserIconRepository userIconRepository;
    @Override
    public UserPro checkUser(String username,String password){
        return userProRepository.checkUser(username,password);
    }

    @Override
    public User findOne(Integer id)
    {
        User user=userRepository.getOne(id);
        Optional<UserIcon> icon=userIconRepository.findById(id);
        System.out.println(icon);
        if(icon.isPresent()){
            System.out.println("Not null"+id);
            user.setIcon(icon.get());
        }
        else{
            user.setIcon(null);
            System.out.println("NULL");
        }
        return user;
    }
    @Override
    public User addUser(String username,String password,String email,String nickname)
    {
        User user=new User();
        UserPro userpro=new UserPro();
        user.setName(username);
        user.setNickname(nickname);
        user.setEmail(email);
        user.setBanned(0);
        userRepository.saveAndFlush(user);
        UserIcon userIcon=new UserIcon(user.getUserId(),"data:image/png;base64,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");
        userIconRepository.save(userIcon);
        user.setIcon(userIcon);
        userpro.setUserId(user.getUserId());
        userpro.setUserType(0);
        userpro.setPassword(password);
        userpro.setUsername(username);
        userpro.setBanned(0);
        System.out.println(userpro);
        userProRepository.saveAndFlush(userpro);
        return userRepository.saveAndFlush(user);
    }
    @Override
    public Boolean checkUserName(String username)
    {
        User user=userRepository.findUserByName(username);
        System.out.println(user);
        if(user!=null)
        {
            System.out.println("Find one");
            return false;
        }
        else return true;
    }
    @Override
    public List<User> getUsers()
    {
        List<UserPro> userPros=userProRepository.checkUserType();
        List<User> users=new LinkedList<>();
        Iterator<UserPro> it = userPros.iterator();
        while(it.hasNext()) {
            UserPro userPro = it.next();
            Integer id=userPro.getUserId();
            User user = userRepository.getOne(id);
            Optional<UserIcon> icon=userIconRepository.findById(id);
            System.out.println(icon);
            if(icon.isPresent()){
                System.out.println("Not null"+id);
                user.setIcon(icon.get());
            }
            else{
                user.setIcon(null);
                System.out.println("NULL");
            }
            users.add(user);
        }
        return users;
    }
    @Override
    public User banUser(Integer user_id)
    {
        UserPro userPro=userProRepository.getOne(user_id);
        userPro.setBanned(1);
        userProRepository.saveAndFlush(userPro);
        User user=userRepository.getOne(user_id);
        user.setBanned(1);
        userRepository.saveAndFlush(user);
        return user;
    }

}
