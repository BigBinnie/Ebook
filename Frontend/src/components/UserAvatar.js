import React from 'react';
import { Avatar, Dropdown, Menu} from 'antd';
import '../css/index.css'
import * as userService from '../services/userService'
import avatr from './../assets/avatr.jpg';
import config from 'config'
import {getUser} from "../services/userService";


export class UserAvatar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user:null,
            userType:0
        };
    }

    componentWillMount(){
        let user= localStorage.getItem("user");
        var user_id=JSON.parse(user).userId;
        this.setState({userType: JSON.parse(user).userType});
        getUser(user_id, (data) => {this.setState({user: data})})
        console.log(this.state.user);
    }
    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                    <a href="#" onClick={userService.logout}>
                        Log Out
                    </a>
                </Menu.Item>
            </Menu>
        );
        if(this.state.user!=null) {
            if(this.state.userType===0){
            return (
                <div id="avatar">
                    <span className="name">Hi, {this.state.user.name}</span>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Avatar src={this.state.user.icon.iconBase64} style={{cursor: "pointer"}}/>
                    </Dropdown>
                </div>
            );}
            else{
                return (
                    <div id="avatar">
                        <span className="name">Hi, Manager {this.state.user.name}</span>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Avatar src={this.state.user.icon.iconBase64} style={{cursor: "pointer"}}/>
                        </Dropdown>
                    </div>
                )
            }
        }
        else {
            return <div>Loading</div>
        }
    }
}
