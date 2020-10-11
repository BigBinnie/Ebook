import React from "react";
import {Button, Card, Col, Descriptions, Row} from "antd";
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export class CartItem extends React.Component{

    render() {
        let {cart} = this.props;
        console.log(cart);
        let imgUrl = null;
        if(cart.book.image != null){
            imgUrl = cart.book.image;
        }
        else if(cart.book.bookimage!=null)
                imgUrl=cart.book.bookimage.imageBase64;
            else imgUrl = require("../assets/nobookicon.png");
        return (
            <Card hoverable>
                <Row>
                    <Link to={{
                        pathname: '/bookDetails',
                        search: '?id=' + cart.book.bookId}}
                          target="_blank"
                    >
                        <Col span={6}>
                            <img alt="image" src={imgUrl} className={"bookImg"}/>
                        </Col>
                    </Link>
                    <Col span={6}>
                        <Descriptions title={cart.book.name}>
                            <Descriptions.Item label={"作者"} span={4}>{cart.book.author}</Descriptions.Item>
                            <Descriptions.Item label={"ISBN"} span={4}>{cart.book.isbn}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={4}>{cart.book.inventory !== 0 ?
                                <span>有货 <span className={"inventory"}>库存{cart.book.inventory}件</span></span> :
                                <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={4}>{<span
                                className={"price"}>{'¥' + cart.book.price}</span>}</Descriptions.Item>
                            <Descriptions.Item  span={5}>{<span
                                className={"amount"}>{'x' + cart.amount}</span>}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={3} offset={6}>
                        <Button type="danger" icon="pay-circle"ghost onClick={() => this.props.addOrder(cart, this.props.idx)}>
                            购买
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button onClick={() => {this.props.delete(cart.cartId)}}>
                            <DeleteOutlined />
                            删除
                        </Button>
                    </Col>
                </Row>
            </Card>
        )
    }
}
