import React from 'react'
import { Menu,Layout, Icon} from 'antd'
import {history} from "../utils/history";
import {getOrders} from "../services/orderService";
import {getUser} from "../services/userService";


const { SubMenu } = Menu;
const { Sider } = Layout;


export class SideBar extends React.Component {
    state = {
        collapsed: false,
        selectedKey: this.props.selected,
        user: null
    };

    onCollapse = collapsed => {
        if (collapsed) {

        }
        console.log(collapsed);
        this.setState({collapsed});
    };

    bookOnClick = () => {
        history.push("/");
        //this.setState({selectedKey: '1'});
    };
    cartOnClick = () => {
        history.push("/ShoppingCart");
        //this.setState({selectedKey:'2'});
    }
    orderOnclick = () => {
        history.push("/OrderList");
        //this.setState({selectedKey: '3'});
    }
    profileOnclick = () => {
        history.push("/UserProfile");
        //this.setState({selectedKey: '4'});
    }
    bookListOnClck=()=>{
        history.push("/admainBookList")
    }
    orderListOnClick=()=>{
        history.push("/admainOrderList")
    }
    userListOnClick=()=>{
        history.push("/admainUserList")
    }
    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({user: JSON.parse(user)});
        console.log(user);
    }

    render() {
        if (this.state.user != null) {
            console.log(this.state.user.userType);
            if (this.state.user.userType === 0) {
                return (
                    <div style={{
                        width: this.state.collapsed ? "80px" : "180px",
                        maxWidth: this.state.collapsed ? "80px" : "180px",
                        minWidth: this.state.collapsed ? "80px" : "180px"
                    }}>
                        <div className="mySider">
                            <Sider collapsible collapsed={this.state.collapsed} width="180px"
                                   onCollapse={this.onCollapse}
                                   className="sider" style={{background: '#fff'}}>
                                <Menu defaultSelectedKeys={this.state.selectedKey} mode="inline">
                                    <Menu.Item key="1" onClick={this.bookOnClick}>
                                        <Icon type="read" style={{fontSize: '18px'}}/>
                                        <span style={{fontSize: '16px'}}>商城</span>
                                    </Menu.Item>
                                    <Menu.Item key="2" onClick={this.cartOnClick}>
                                        <Icon type="shopping-cart" style={{fontSize: '18px'}}/>
                                        <span style={{fontSize: '16px'}}>购物车</span>
                                    </Menu.Item>
                                    <Menu.Item key="3" onClick={this.orderOnclick}>
                                        <Icon type="solution" style={{fontSize: '18px'}}/>
                                        <span style={{fontSize: '16px'}}>订单</span>
                                    </Menu.Item>
                                    <Menu.Item key="4" onClick={this.profileOnclick}>
                                        <Icon type="user" style={{fontSize: '18px'}}/>
                                        <span style={{fontSize: '16px'}}>我的资料</span>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                        </div>
                    </div>

                );
            } else {
                console.log("manager");
                return (
                    <div style={{
                        width: this.state.collapsed ? "80px" : "180px",
                        maxWidth: this.state.collapsed ? "80px" : "180px",
                        minWidth: this.state.collapsed ? "80px" : "180px"
                    }}>
                        <div className="mySider">
                            <Sider collapsible collapsed={this.state.collapsed} width="180px"
                                   onCollapse={this.onCollapse}
                                   className="sider" style={{background: '#fff'}}>
                                <Menu defaultSelectedKeys={this.state.selectedKey} mode="inline">
                                    <Menu.Item key="1" onClick={this.bookListOnClck}>
                                        <Icon type="read" style={{fontSize: '18px'}}/>
                                        <span style={{fontSize: '16px'}}>图书管理</span>
                                    </Menu.Item>
                                    <Menu.Item key="2" onClick={this.orderListOnClick}>
                                        <Icon type="shopping-cart" style={{fontSize: '18px'}}/>
                                        <span style={{fontSize: '16px'}}>订单管理</span>
                                    </Menu.Item>
                                    <Menu.Item key="3" onClick={ this.userListOnClick}>
                                        <Icon type="solution" style={{fontSize: '18px'}}/>
                                        <span style={{fontSize: '16px'}}>用户管理</span>
                                    </Menu.Item>
                                    <Menu.Item key="4" onClick={this.profileOnclick}>
                                        <Icon type="user" style={{fontSize: '18px'}}/>
                                        <span style={{fontSize: '16px'}}>我的资料</span>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                        </div>
                    </div>

                );
            }
        }
        else return (<p>Loading</p>)
    }
}
