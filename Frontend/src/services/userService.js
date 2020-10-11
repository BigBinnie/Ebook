import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';

export const login = (data) => {
    const url = `${config.apiUrl}/login`;
    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(data.data));
            console.log(data.data);
            if(data.data.banned===0){
                if(data.data.userType===0){
                    history.push("/");
                    message.success(data.msg);
                }
                else {
                    history.push("/admainBookList");
                    message.success(data.msg);
                }
            }
            else {
                message.error("您的账号已被禁用")
            }
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
    const url = `${config.apiUrl}/checkSession`;
    postRequest(url, {}, callback);
};

export const getUser= (id, callback) => {
    console.log(id);
    const data = {id: id};
    const url = `${config.apiUrl}/getUser`;
    postRequest_v2(url, data, callback);
    console.log(data.userId);
}
export const register = (data) => {
    const url = `${config.apiUrl}/register`;
    const callback = (data) => {
        if(data==true) {
            history.push("/login");
            message.success("注册成功");
        }
        else{
            message.error('注册失败');
        }
    };
    postRequest(url, data, callback);
};
export const checkUserName= (username, callback) => {
    const data = {username: username};
    const url = `${config.apiUrl}/checkUserName`;
    postRequest_v2(url, data, callback);
}
export const getAllUsers = (data, callback) => {
    const url = `${config.apiUrl}/getAllUsers`;
    postRequest(url, data, callback);
};
export const banUser= (id, callback) => {
    console.log(id);
    const data = {id: id};
    const url = `${config.apiUrl}/banUser`;
    postRequest_v2(url, data, callback);
    console.log(data.userId);
}
