package com.ebook.ebook.utils.message;

public enum  MessageInfo {
    SUCCESS(MessageUtil.SUCCESS, MessageUtil.SUCCESS_MSG),
    ERROR(MessageUtil.ERROR,MessageUtil.ERROR_MSG),
    LOGIN_USER_ERROR(MessageUtil.LOGIN_USER_ERROR,MessageUtil.LOGIN_USER_ERROR_MSG),
    NOT_LOGGED_IN_ERROR(MessageUtil.NOT_LOGGED_IN_ERROR,MessageUtil.NOT_LOGGED_IN_ERROR_MSG);

    private int status;
    private String msg;

    public int getStatus() {
        return status;
    }

    public String getMsg() {
        return msg;
    }

    private MessageInfo(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }
}
