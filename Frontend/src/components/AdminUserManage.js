import React from "react";
import {Button, DatePicker, Empty, Row, Table, Tabs} from 'antd';
import {AdminOrderList} from "./AdminOrderList";
import {AdminUserList} from "./AdminUserList";
import {getBookSale, getUserSale} from "../services/StatisticService";
import {BarChartOutlined} from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
export class AdminUserrManage extends React.Component{
    render() {
        return(
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="用户列表" key="1">
                    <AdminUserList/>
                </TabPane>
                <TabPane tab="销售榜" key="2">
                    <UserSaleList/>
                </TabPane>
            </Tabs>
        )
    }
}
class UserSaleList extends React.Component{
    state={
        date1:null,
        date2:null,
        filteredInfo: null,
        sortedInfo: {
            order: 'descend',
            columnKey: 'costs',
        },
        users:[]
    };
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    setSalesSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'costs',
            },
        });
    };

    onChange=(dates,dateStrings)=>{
        console.log(dateStrings[0]);

        this.setState({date1:dateStrings[0],date2:dateStrings[1]},() => {
            console.log(this.state);//2
            console.log('加载完成')

            var param={"date1":this.state.date1,"date2":this.state.date2};
            getUserSale(param,callback2);
        });
        const callback2 =  (data) => {
            this.setState({users:data});
            console.log(this.state.users);
        };

    };
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'ID',
                dataIndex: 'user.userId',
                key: 'user.userId',
                sorter: (a, b) => a.user.userId-b.user.userId,
                sortOrder: sortedInfo.columnKey === 'user.userId' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '昵称',
                dataIndex: 'user.nickname',
                key: 'user.nickname',
                sorter: (a, b) => a.user.nickname.length - b.user.nickname.length,
                sortOrder: sortedInfo.columnKey === 'user.nickname' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '购书总数',
                dataIndex: 'buys',
                key: 'buys',

                sorter: (a, b) => a.buys - b.buys,
                sortOrder: sortedInfo.columnKey === 'buys' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '总消费',
                dataIndex: 'costs',
                key: 'costs',
                sorter: (a, b) => a.costs-b.costs,
                sortOrder: sortedInfo.columnKey === 'costs' && sortedInfo.order,
                ellipsis: true,
            },
        ];
        return (
            <div>
                <Row>
                    <RangePicker showTime onChange={(dates, dateStrings)=>this.onChange(dates,dateStrings)}/>
                    <Button style={{marginLeft:"10px"}} onClick={this.setSalesSort}><BarChartOutlined />销售排行</Button>
                </Row>
                <Row>

                </Row>
                {this.state.users!=null?<Table columns={columns} style={{marginTop:"20px"}} dataSource={this.state.users} onChange={this.handleChange} />:<Empty></Empty>}
            </div>
        )
    }
}
