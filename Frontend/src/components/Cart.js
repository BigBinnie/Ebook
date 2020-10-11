import React from 'react';
import {Button, Col, Descriptions, List, Row, Switch, Modal, Card, Input, Form, Icon, Checkbox, Avatar,message} from 'antd';
import {SearchForBookList} from "./SearchForBookList";
import {getCarts,clearCart,deleteCart} from "../services/cartService";
import {CartItem} from "./CartItem";
import {addOrder} from "../services/orderService";
import {OneOrderConfirm} from "../components/OneOrderConfirm";
const { TextArea } = Input;

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            showcarts: [],
            chooseCart: null,
            chooseIndex: null,
            modalVisible: false,
            orderModalVisible: false,
        };
    }

    componentDidMount() {

        let user = localStorage.getItem("user");
        const callback = (data) => {
            this.setState({carts: data, showcarts: data});
            console.log(this.state.data);
        };
        var user_id = JSON.parse(user).userId;
        var parm = {"userId": user_id};
        getCarts(parm, callback);
    }

    chooseOneCart = (cart, index) => {
        console.log(cart);
        this.setState({chooseCart: cart, chooseIndex: index,orderModalVisible:true
        });
    };
    renderOrderModal = () => {
        var arr=[];
        arr.push(this.state.chooseCart);
        if (this.state.orderModalVisible === true) return (
            <OneOrderConfirm chooseCart={arr} handleOk={this.addOrder}
                          handleCancel={this.moveOutModal}/>);
        else return null;
    };
    addOrder=()=>{
        let i=this.state.chooseCart;
        let user = localStorage.getItem("user");
        var user_id=JSON.parse(user).userId;
        var param={"bookId":i.book.bookId.toString(),"userId":user_id.toString()};
        console.log(param);
        addOrder(param);
        this.setState({orderModalVisible:false});
        const callback2 = (data) => {
            this.setState({carts: data,showcarts:data,chooseCart: data[0]});
        };
        const callback = () => {
            let user = localStorage.getItem("user");
            var user_id = JSON.parse(user).userId;
            var parm = {"userId": user_id};
            getCarts(parm, callback2);
        };
        deleteCart(i.cartId,callback);
    };
    moveOutModal = () => {
        this.setState({modalVisible: false,orderModalVisible: false})
    };

    clearCart=()=>{
        let user = localStorage.getItem("user");
        var user_id=JSON.parse(user).userId;
        var parm={"userId":user_id};
        clearCart(parm, (data) =>
        {
            this.setState({carts: data,showcarts:data,modalVisible: false});
            message.success("购买成功");
        })
    }
    renderModal = () => {

        if (this.state.modalVisible === true) return (<OrderConfirm carts={this.state.carts} handleOk={this.clearCart}
                                                                    handleCancel={this.moveOutModal}/>);
        else return null;
    };
    deleteOneCart = (cartId) => {
        console.log(cartId);
        const callback2 = (data) => {
            this.setState({carts: data,showcarts:data,chooseCart: data[0]});
            message.success("删除成功");
        };
        const callback = () => {
            let user = localStorage.getItem("user");
            var user_id = JSON.parse(user).userId;
            var parm = {"userId": user_id};
            getCarts(parm, callback2);
        };
        deleteCart(cartId,callback);
    };
    searchBooksByName = (val) => {
        var len = this.state.carts.length;
        var arr = [];
        for (var i = 0; i < len; i++) {
            if (this.state.carts[i].book.name.indexOf(val) >= 0) {
                arr.push(this.state.carts[i]);
            }
        }
        this.setState({showcarts: arr});
    }
    cancelSearch = () => {
        this.setState({showcarts: this.state.carts});
    }


    render() {
        if (this.state.showcarts===null) {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            )
        } else {
            console.log(this.state.showcarts);
            return (
                <div style={{marginLeft: "20px"}}>
                    <SearchForBookList search={this.searchBooksByName} cancel={this.cancelSearch}/>
                    <Button type="danger" icon="pay-circle" size={"large"} disabled={this.state.carts.length===0?true:false} style={{marginLeft:"2%",marginBottom:"5%",marginTop:"3%"}}ghost onClick={()=>this.setState({modalVisible:true})}>
                        清空购物车
                    </Button>
                    <List
                        itemLayout="vertical"
                        size="small"
                        split={false}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 12,
                        }}
                        dataSource={this.state.showcarts}

                        renderItem={(item, index) => (
                            <List.Item>
                                <CartItem cart={item} idx={index} addOrder={this.chooseOneCart}
                                          delete={this.deleteOneCart}/>
                            </List.Item>
                        )}
                    />
                    {this.renderModal()}
                    {this.renderOrderModal()}
                </div>
            )
        }
    }
}
class  OrderConfirm extends React.Component{
    render(){
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
                dataSource={this.props.carts}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta avatar={<Avatar src={item.book.image}/>}
                                        title={<a >{item.book.name}</a>}
                                        description={<p color="FF3030">{'¥'+item.book.price}</p>}
                        />
                        <p>{'x' +item.amount}</p>
                    </List.Item>

                )}
            />
        </Modal>)
    }

}
