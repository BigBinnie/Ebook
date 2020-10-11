import React from "react";
import { List, Avatar, Button, Skeleton,Modal,Card } from 'antd';
import {Link} from 'react-router-dom'
import {addOrder, getAllOrders, getOrders} from "../services/orderService";
import {clearCart, getCarts} from "../services/cartService";
import {banUser, getAllUsers, getUser} from "../services/userService";
import {CloseOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import {SearchForBookList} from "./SearchForBookList";
import {SearchForUserList} from "./SearchForUserList";
export class AdminUserList extends React.Component {
    state = {
        users: [],
        showusers:[],
        user: null,
        loading: false,
        visible: false,
    };
    showModal = (item) => {
        this.setState({
            visible: true,
            user: item
        });
    };
    handleOk = () => {
        this.setState({visible: false});
        this.ban();
    };
    handleCancel = () => {
        this.setState({visible: false});
    };
    ban = () => {
        var user_id=this.state.user.userId;
        banUser(user_id, (data) => {
            this.setState({user: data});
            getAllUsers({"search":null},(data)=>{this.setState({users:data,showusers:data})});
        });

        console.log(this.state.data);
    }
    searchUsersByName = (val) => {
        var len = this.state.users.length;
        var arr = [];
        for(var i=0;i<len;i++){
            if(this.state.users[i].name.indexOf(val)>=0){
                arr.push(this.state.users[i]);
            }
        }
        this.setState({showusers:arr});
    }
    cancelSearch=()=>{
        this.setState({showusers:this.state.users});
    }
    componentDidMount() {
        const callback = (data) => {
            this.setState({users: data,showusers:data});
            console.log(this.state.users);
        };

        getAllUsers({"search": null}, callback);

    }

    render() {
        const {visible, loading} = this.state;
        if (this.state.users != null&&this.state.user!=null) {
            console.log(this.state.users);
            return (
                <div>
                    <SearchForUserList search={this.searchUsersByName} cancel={this.cancelSearch}/>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.showusers}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.icon.iconBase64}/>}
                                    title={<a>{item.name}</a>}
                                    description={<p color="FF3030">{item.tel}</p>}
                                />
                                {item.banned===0? <Button color={"blue"} type="danger" danger size={"large"}
                                        style={{marginLeft: "2%", marginBottom: "5%", marginTop: "3%"}}
                                        onClick={() => this.showModal(item)}>
                                    <ExclamationCircleOutlined />禁用
                                </Button>:<Button color={"blue"} disabled={"true"} type="danger" danger size={"large"}
                                                  style={{marginLeft: "2%", marginBottom: "5%", marginTop: "3%"}}
                                                  >
                                    <CloseOutlined />已禁用
                                </Button>}
                            </List.Item>

                        )}
                    />
                    <Modal
                        visible={visible}
                        title="是否确认禁用以下用户"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                返回
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                确认
                            </Button>,
                        ]}
                    >
                        <p>用户名：{this.state.user.name}</p>
                        <p>id: {this.state.user.userId}</p>
                        {/*<Card*/}
                        {/*    avatar={<Avatar src={this.state.user.icon.iconBase64}/>}*/}
                        {/*    title={<a >{this.state.user.name}</a>}*/}
                        {/*    description={<p color="FF3030">{this.state.user.tel}</p>}*/}
                        {/*            />*/}
                    </Modal>
                </div>

            )
        }
        else if(this.state.user===null&&this.state.users!=null)
            return (
                <div>
                    <SearchForUserList search={this.searchUsersByName} cancel={this.cancelSearch}/>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.showusers}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.icon.iconBase64}/>}
                                    title={<a>{item.name}</a>}
                                    description={<p color="FF3030">{item.tel}</p>}
                                />
                                {item.banned===0? <Button color={"blue"} type="danger" danger size={"large"}
                                                        style={{marginLeft: "2%", marginBottom: "5%", marginTop: "3%"}}
                                                        onClick={() => this.showModal(item)}>
                                    <ExclamationCircleOutlined />禁用
                                </Button>:<Button color={"blue"} disabled={"true"} type="danger" danger size={"large"}
                                                  style={{marginLeft: "2%", marginBottom: "5%", marginTop: "3%"}}
                                >
                                    <CloseOutlined />已禁用
                                </Button>}
                            </List.Item>

                        )}
                    />
                    <Modal
                        visible={visible}
                        title="是否确认禁用以下用户"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                返回
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                确认
                            </Button>,
                        ]}
                    >
                    </Modal>
                </div>
            )
        else return (<p>Loading</p>)

    }
}
