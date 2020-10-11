import React from "react";
import {Button, Card, Col, Descriptions, Row} from "antd";
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export class BookItem extends React.Component{

    render() {
        let {book} = this.props;

        let imgUrl = null;
        if(book.bookimage != null){
            imgUrl = book.bookimage.imageBase64;
        }
        else imgUrl = require("../assets/nobookicon.png");
        return (
            <Card hoverable>
                <Row>
                    <Link to={{
                        pathname: '/bookDetails',
                        search: '?id=' + book.bookId}}
                          target="_blank"
                    >
                        <Col span={6}>
                            <img alt="image" src={imgUrl} className={"bookImg"}/>
                        </Col>
                    </Link>
                    <Col span={6}>
                        <Descriptions title={book.name}>
                            <Descriptions.Item label={"作者"} span={3}>{book.author}</Descriptions.Item>
                            <Descriptions.Item label={"ISBN"} span={3}>{book.isbn}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>{book.inventory !== 0 ?
                                <span>有货 <span className={"inventory"}>库存{book.inventory}件</span></span> :
                                <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={5}>{<span
                                className={"price"}>{'¥' + book.price}</span>}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={3} offset={6}>
                        <Button type="primary" onClick={() => this.props.edit(book, this.props.idx)}>
                            <EditOutlined />
                            编辑
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button onClick={() => {this.props.delete(book.bookId)}}>
                            <DeleteOutlined />
                            删除
                        </Button>
                    </Col>
                </Row>
            </Card>
        )
    }
}
