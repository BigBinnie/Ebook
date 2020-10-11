import React from "react";
import { Tabs ,DatePicker,Button,Table,Empty,Row} from 'antd';
import {AdminOrderList} from "./AdminOrderList";
import {getBookSale} from "../services/StatisticService";
import {BarChartOutlined} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}
export class AdminOrderManage extends React.Component{
    render() {
        return(
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="订单列表" key="1">
                    <AdminOrderList/>
                </TabPane>
                <TabPane tab="热销榜" key="2">
                    <SalesList/>
                </TabPane>
            </Tabs>
        )
    }
}

class SalesList extends React.Component{
    state={
        date1:null,
        date2:null,
        filteredInfo: null,
        sortedInfo: {
                order: 'descend',
                columnKey: 'sales',
        },
        books:[]
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
                columnKey: 'sales',
            },
        });
    };

    onChange=(dates,dateStrings)=>{
        console.log(dateStrings[0]);

        this.setState({date1:dateStrings[0],date2:dateStrings[1]},() => {
            console.log(this.state);//2
            console.log('加载完成')

            var param={"date1":this.state.date1,"date2":this.state.date2};
            getBookSale(param,callback2);
        });
        const callback2 =  (data) => {
            for(var i=0;i<data.length;i++)
                data[i].prices=data[i].prices.toFixed(1);
            this.setState({books:data});
            console.log(this.state.books);
        };

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
                sortOrder: sortedInfo.columnKey === 'book.name' && sortedInfo.order,
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
                title: '销量',
                dataIndex: 'sales',
                key: 'sales',

                sorter: (a, b) => a.sales - b.sales,
                sortOrder: sortedInfo.columnKey === 'sales' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '销售额',
                dataIndex: 'prices',
                key: 'prices',
                sorter: (a, b) => a.prices-b.prices,
                sortOrder: sortedInfo.columnKey === 'prices' && sortedInfo.order,
                ellipsis: true,
            },
        ];
        return (
            <div>
                <Row>
            <RangePicker showTime onChange={(dates, dateStrings)=>this.onChange(dates,dateStrings)}/>
                    <Button style={{marginLeft:"10px"}} onClick={this.setSalesSort}><BarChartOutlined />销量排行</Button>
                </Row>
            <Row>

            </Row>
                {this.state.books!=null?<Table columns={columns} style={{marginTop:"20px"}} dataSource={this.state.books} onChange={this.handleChange} />:<Empty></Empty>}
            </div>
            )
    }
}
