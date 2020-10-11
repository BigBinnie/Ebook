import React from "react";
import {List, message, Avatar, Spin, Button, Card,Row,Col} from 'antd';
import { Descriptions, Badge } from 'antd';
import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';
import {getBooks} from "../services/bookService";
import {getAllOrders, getOrders} from "../services/orderService";
import {Link} from "react-router-dom";
import {getUser} from "../services/userService";
import {OrderItemList} from "./OrderItemList";
import {SearchForOrderList} from "./SearchForOrderList";


export class AdminOrderList extends React.Component {
    state = {
        orders: [],
        showorders: []
    };

    componentDidMount() {

        const callback =  (data) => {
            this.setState({orders:data,showorders:data});
        };
        getAllOrders({"search":null}, callback);
    }
    searchOrdersByDate = (val) => {
        var len = this.state.orders.length;
        var arr = [];
        for(var i=0;i<len;i++){
            if(this.state.orders[i].date.indexOf(val)>=0){
                arr.push(this.state.orders[i]);
            }
        }
        this.setState({showorders:arr});
    }
    cancelSearch=()=>{
        this.setState({showorders:this.state.orders});
    }
    render() {
        if (this.state.orders != []) {
            console.log(this.state.orders);
            return (
                <div>
                    <SearchForOrderList search={this.searchOrdersByDate} cancel={this.cancelSearch}/>
                <List
                    itemLayout="horizontal"
                    size="large"
                    split={false}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 12,
                    }}
                    dataSource={this.state.showorders}
                    renderItem={item => (
                        <List.Item>
                            <Card hoverable>
                                    <Descriptions title="" layout="horizontal" bordered size={"large"} column={"6"}>
                                        <Descriptions.Item label="订单号">{item.orderID}</Descriptions.Item>
                                        <Descriptions.Item label="用户id">{item.userId}</Descriptions.Item>
                                        <Descriptions.Item label="订单总价">¥{item.totPrice.toFixed(2)}</Descriptions.Item>
                                        <Descriptions.Item label="下单时间" span={2}>
                                            {item.date}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="订单状态" span={3}>
                                            <Badge status="processing" text={item.state}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="订单详情">
                                            <OrderItemList orderid={item.orderID}/>
                                        </Descriptions.Item>
                                    </Descriptions>
                            </Card>
                        </List.Item>

                    )}
                />
                </div>
            );
        }
        else return (<p>Loading</p>)
    }
}
