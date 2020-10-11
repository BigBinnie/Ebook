import config from 'config';
import {postRequest} from "../utils/ajax";

export const getBookSale = (data,callback) => {
    const url = `${config.apiUrl}/getBooksSale`;
    console.log(data);
    postRequest(url, data, callback);
};
export const getUserBookSale = (data,callback) => {
    const url = `${config.apiUrl}/getUserBooksSale`;
    console.log(data);
    postRequest(url, data, callback);
};
export const getUserSale = (data,callback) => {
    const url = `${config.apiUrl}/getUsersSale`;
    console.log(data);
    postRequest(url, data, callback);
};
export const getUserStatistic = (data,callback) => {
    const url = `${config.apiUrl}/getUserStatistic`;
    console.log(data);
    postRequest(url, data, callback);
};
