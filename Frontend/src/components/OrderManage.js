import React from "react";
import {Button, DatePicker, Empty, Row, Table, Tabs,Statistic,Col} from 'antd';
import {OrderList} from "./OrderList";
import {getBookSale, getUserBookSale, getUserStatistic} from "../services/StatisticService";
import {BarChartOutlined} from "@ant-design/icons";
import { LikeOutlined ,PayCircleOutlined,MoneyCollectOutlined,ReadOutlined} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
export class OrderManage extends React.Component{
    render() {
        return(
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="订单列表" key="1">
                    <OrderList/>
                </TabPane>
                <TabPane tab="购书状况" key="2">
                    <UserSalesList/>
                </TabPane>
            </Tabs>
        )
    }
}
class UserSalesList extends React.Component{
    state={
        date1:null,
        date2:null,
        filteredInfo: null,
        sortedInfo: {
            order: 'descend',
            columnKey: 'sales',
        },
        books:[],
        user:null,
    };
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    onChange=(dates,dateStrings)=>{
        console.log(dateStrings[0]);

        this.setState({date1:dateStrings[0],date2:dateStrings[1]},() => {
            console.log(this.state);//2
            console.log('加载完成')
            let user = localStorage.getItem("user");
            var user_id = JSON.parse(user).userId;
            var param={"date1":this.state.date1,"date2":this.state.date2,"userId":user_id};
            getUserBookSale(param,(data)=>this.setState({books:data}));
            getUserStatistic(param,(data)=>{this.setState({user:data});console.log(this.state.user);});
        });
    };
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'ISBN',
                dataIndex: 'book.isbn',
                key: 'book.isbn',
                sorter: (a, b) => a.book.isbn-b.book.isbn,
                sortOrder: sortedInfo.columnKey === 'book.isbn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '书名',
                dataIndex: 'book.name',
                key: 'book.name',
                sorter: (a, b) => a.book.name.length - b.book.name.length,
                sortOrder: sortedInfo.columnKey === 'book.name' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '购买数量',
                dataIndex: 'sales',
                key: 'sales',

                sorter: (a, b) => a.sales - b.sales,
                sortOrder: sortedInfo.columnKey === 'sales' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '总价',
                dataIndex: 'prices',
                key: 'prices',
                sorter: (a, b) => a.prices-b.prices,
                sortOrder: sortedInfo.columnKey === 'prices' && sortedInfo.order,
                ellipsis: true,
            },
        ];
        return (
            <div>
                <Row >
                    <Col span={14}>
                    <RangePicker showTime onChange={(dates, dateStrings)=>this.onChange(dates,dateStrings)}/>
                    </Col>
                    <Col span={5}>
                        <Statistic title="购书总数" value={this.state.user===null?0:this.state.user.buys} prefix={<ReadOutlined />}suffix={"本"} />
                    </Col>
                    <Col span={5}>
                        <Statistic title="总消费" value={this.state.user===null?0:this.state.user.costs.toFixed(2)} prefix={< MoneyCollectOutlined />} />
                    </Col>
                </Row>
                <Row>
                    {this.state.books!=null?<Table columns={columns} style={{marginTop:"20px"}} dataSource={this.state.books} onChange={this.handleChange} />:<Empty></Empty>}
                </Row>
            </div>
        )
    }
}
