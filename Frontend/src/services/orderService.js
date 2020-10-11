import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {history} from "../utils/history";
import {message} from "antd";

export const addOrder = (data) => {
    const url = `${config.apiUrl}/addOrder`;
    const callback = (data) => {
        if(data!=null) {
            message.success("购买成功");
        }
        else{
            message.error("遇到错误");
        }
    };
    postRequest(url, data, callback);
};

export const getOrders = (id, callback) => {
    console.log(id);
    const url = `${config.apiUrl}/getOrders`;
    postRequest(url, id, callback);

};
export const getOrderItems = (id, callback) => {
    const url = `${config.apiUrl}/getOrderItems`;
    postRequest(url, id, callback);

};
export const getAllOrders = (data, callback) => {
    console.log("try to get");
    const url = `${config.apiUrl}/getAllOrders`;
    postRequest(url, data, callback);
};
