package com.ebook.ebook.utils.message;

import net.sf.json.JSONObject;

public class MessageUtil {
    public static final int SUCCESS = 0;
    public static final int ERROR = -1;
    public static final int LOGIN_USER_ERROR = -100;
    public static final int NOT_LOGGED_IN_ERROR = -101;

    public static final String SUCCESS_MSG = "成功！";
    public static final String LOGIN_SUCCESS_MSG = "登录成功！";
    public static final String LOGOUT_SUCCESS_MSG = "登出成功！";
    public static final String LOGOUT_ERR_MSG = "登出异常！";
    public static final String ERROR_MSG = "错误！";
    public static final String LOGIN_USER_ERROR_MSG = "用户名或密码错误，请重新输入！";
    public static final String NOT_LOGGED_IN_ERROR_MSG = "登录失效，请重新登录！";



    public static Message makeMsg(MessageInfo code, JSONObject data){
        return new Message(code, data);
    }

    public static Message makeMsg(MessageInfo code, String msg, JSONObject data){
        return new Message(code, msg, data);
    }

    public static Message makeMsg(MessageInfo code){
        return new Message(code);
    }

    public static Message makeMsg(MessageInfo code, String msg){
        return new Message(code, msg);
    }

    public static Message makeMsg(int status, String msg, JSONObject data){
        return new Message(status, msg, data);
    }

    public static Message makeMsg(int status, String msg){
        return new Message(status, msg);
    }
}
