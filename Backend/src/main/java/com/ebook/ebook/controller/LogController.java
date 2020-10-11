package com.ebook.ebook.controller;

import com.ebook.ebook.entity.User;
import com.ebook.ebook.entity.UserPro;
import com.ebook.ebook.utils.message.Message;
import com.ebook.ebook.service.UserService;
import com.ebook.ebook.utils.session.SessionUtil;
import com.ebook.ebook.utils.message.*;
import com.ebook.ebook.utils.message.MessageInfo;
import com.ebook.ebook.utils.message.MessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import net.sf.json.JSONObject;

import java.util.Map;

@RestController
public class LogController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public Message login(@RequestBody Map<String, String> params){
        String username = params.get("username");
        String password = params.get("password");
        UserPro auth = userService.checkUser(username, password);
        if(auth != null){

            JSONObject obj = new JSONObject();
            obj.put("userId", auth.getUserId());
            obj.put("username", auth.getUsername());
            obj.put("userType", auth.getUserType());
            obj.put("banned",auth.getBanned());
            SessionUtil.setSession(obj);

            JSONObject data = JSONObject.fromObject(auth);
            data.remove("password");

            System.out.println("success");
            return MessageUtil.makeMsg(MessageInfo.SUCCESS, MessageUtil.LOGIN_SUCCESS_MSG, data);
        }
        else{
            return MessageUtil.makeMsg(MessageInfo.LOGIN_USER_ERROR);
        }
    }
    @RequestMapping("/logout")
    public Message logout(){
        Boolean status = SessionUtil.removeSession();

        if(status){
            return MessageUtil.makeMsg(MessageInfo.SUCCESS, MessageUtil.LOGOUT_SUCCESS_MSG);
        }
        return MessageUtil.makeMsg(MessageInfo.ERROR, MessageUtil.LOGOUT_ERR_MSG);
    }


    @RequestMapping("/checkSession")
    public Message checkSession(){
        JSONObject auth = SessionUtil.getAuth();

        if(auth == null){
            return MessageUtil.makeMsg(MessageInfo.NOT_LOGGED_IN_ERROR);
        }
        else{
            return MessageUtil.makeMsg(MessageInfo.SUCCESS, MessageUtil.LOGIN_SUCCESS_MSG, auth);
        }
    }

    @RequestMapping("/register")
    public  Boolean Register(@RequestBody Map<String, String> params){
        String username = params.get("username");
        String password = params.get("password");
        String email=params.get("email");
        String nickname=params.get("nickname");
        User user=userService.addUser(username,password,email,nickname);
        if(user.getUserId()>=0)
        {
            System.out.println("Register success");
            return true;
        }
        else return false;
    }
}
