import React from "react";
import {Avatar, Descriptions, List} from "antd";
import {Link} from "react-router-dom";
import {getBook} from "../services/bookService";
import {getOrderItems} from "../services/orderService";

export class OrderItemList extends React.Component {

   state = {
       orderitems: []
    };

    componentDidMount() {
        const {orderid} = this.props;
        var parm = {"orderId": orderid.toString()};
        getOrderItems(parm, (data) => {
            this.setState({orderitems: data})
            console.log(this.state.orderitems)
        })

    }

    render() {
        if (this.state.orderitems != null) {
            return (
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.orderitems}
                    renderItem={item1 => (
                        <Link to={{
                            pathname: '/bookDetails',
                            search: '?id=' + item1.book.bookId
                        }}
                              target="_blank"
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item1.book.image}/>}
                                title={<a>{item1.book.name}</a>}
                                description={<p color="FF3030">{item1.amount}</p>}
                            />
                        </Link>
                    )}
                />)
        }
        else return(<p>Loading</p>)
    }

}
