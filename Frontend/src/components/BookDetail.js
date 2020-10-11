import React from 'react';
import {Descriptions, Button, Modal, List, Avatar} from 'antd';
import {addOrder} from '../services/orderService';
import {string} from "prop-types";
import {addCart} from "../services/cartService";
import {OneOrderConfirm} from "./OneOrderConfirm";
export class BookDetail extends React.Component{

    state={
        modalVisible:false
    };

    addcartClick=(i)=>{
        console.log(i.bookId);
        let user = localStorage.getItem("user");
        console.log(user);
        var user_id=JSON.parse(user).userId;
        var param={"bookId":i.bookId.toString(),"userId":user_id.toString()};
        console.log(param);
        addCart(param);
    };
    addOrder=()=>{
        var i=this.props.info;
        let user = localStorage.getItem("user");
        var user_id=JSON.parse(user).userId;
        var param={"bookId":i.bookId.toString(),"userId":user_id.toString()};
        console.log(param);
        addOrder(param);
        this.setState({modalVisible:false});
    };
    moveOutModal = () => {
        this.setState({modalVisible: false})
    };
    renderOrderModal = () => {
        var arr=[];
        arr.push(this.props.info);
        if (this.state.modalVisible === true) return (
            <OneBookConfirm book={arr} handleOk={this.addOrder}
                             handleCancel={this.moveOutModal}/>);
        else return null;
    };
    render() {

        const {info} = this.props;
        if(info == null){
            return null;
        }

        return (
            <div className={"content"}>
                <div className={"book-detail"}>
                    <div className={"book-image"}><img alt="image" src={info.image===null?info.bookimage.imageBase64:info.image} style={{width:"350px", height:"350px"}}/></div>
                    <div className={"descriptions"}>
                        <Descriptions>
                            <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                            <Descriptions.Item label={"作者"} span={3}>{info.author}</Descriptions.Item>
                            <Descriptions.Item label={"分类"} span={3}>{info.type}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={3}>{<span className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>{info.inventory !== 0? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"作品简介"} span={3}>{info.description}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div className={"button-groups"}>
                    <Button type="danger" icon="shopping-cart" size={"large"} onClick={()=>this.addcartClick(info)}>
                        加入购物车
                    </Button>

                    <Button type="danger" icon="pay-circle" size={"large"} style={{marginLeft:"15%"}}ghost onClick={()=>this.setState({modalVisible:true})}>
                        立即购买
                    </Button>
                </div>
                {this.renderOrderModal()}
            </div>


        )

    }

}
class OneBookConfirm extends React.Component{
    render(){
        let {book}=this.props;
        return(
            <Modal
                visible={"true"}
                title="订单确认"
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button key="back" onClick={this.props.handleCancel}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.props.handleOk}>
                        确认
                    </Button>,
                ]}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={book}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta avatar={<Avatar src={item.image}/>}
                                            title={<a >{item.name}</a>}
                                            description={<p color="FF3030">{'¥'+item.price}</p>}
                            />
                            <p>{'x 1'}</p>
                        </List.Item>

                    )}
                />
            </Modal>)
    }

}
