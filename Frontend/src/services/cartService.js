import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {history} from "../utils/history";
import {message} from "antd";
import {useCallback} from "react";

export const addCart = (data) => {
    const url = `${config.apiUrl}/addCart`;
    const callback = (data) => {
        if(data!=null) {
            message.success("已成功加入购物车");
        }
        else{
            message.error("加入购物车失败");
        }
    };
    postRequest(url, data, callback);
};

export const getCarts = (id, callback) => {
    console.log(id);
    const url = `${config.apiUrl}/getCarts`;
    postRequest(url, id, callback);

};
export const clearCart=(id,callback)=>{
    const url = `${config.apiUrl}/clearCart`;
    postRequest(url, id, callback);
}
export const deleteCart = (id, callback) => {
    const data = {id: id};
    const url = `${config.apiUrl}/deleteCart`;
    postRequest_v2(url, data, callback);

};
