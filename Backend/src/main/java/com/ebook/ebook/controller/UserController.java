package com.ebook.ebook.controller;

import com.ebook.ebook.entity.Order;
import com.ebook.ebook.entity.User;
import com.ebook.ebook.entity.UserPro;
import com.ebook.ebook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/checkUser")
    public UserPro checkUser(@RequestParam("username") String username, @RequestParam("password") String password){
        return userService.checkUser(username, password);
    }
    @RequestMapping("/getUser")
    public User getUser(@RequestParam("id") String Id){
        int id=Integer.parseInt(Id);
        System.out.println(userService.findUserById(id));
        return userService.findUserById(id);
    }
    @RequestMapping("/checkUserName")
    public boolean checkUserName(@RequestParam("username") String username)
    {
        System.out.println(userService.checkUserName(username));
        return userService.checkUserName(username);
    }
    @RequestMapping("/getAllUsers")
    public List<User> getAllUsers(@RequestBody Map<String, String> params) {
        System.out.println(userService.getUsers());
        return userService.getUsers();
    }
    @RequestMapping("/banUser")
    public User banUser(@RequestParam("id") String Id){
        int id=Integer.parseInt(Id);
        System.out.println(userService.findUserById(id));
        return userService.banUser(id);
    }
}
