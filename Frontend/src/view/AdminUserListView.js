import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/ShoppingCart.css'
import {withRouter} from "react-router-dom";

import {AdminUserList} from "../components/AdminUserList";
import {AdminUserrManage} from "../components/AdminUserManage";

const { Header, Content, Footer } = Layout;

class AdminUserListView extends React.Component{


    render(){
        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar  selected={'3'}/>
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <AdminUserrManage/>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(AdminUserListView);
