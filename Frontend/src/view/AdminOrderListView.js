import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/OrderList.css'
import {withRouter} from "react-router-dom";
import {AdminOrderList} from "../components/AdminOrderList";
import {AdminOrderManage} from "../components/AdminOrderManage";

const { Header, Content, Footer } = Layout;

class AdminOrderListView extends React.Component{


    render(){
        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar  selected={'2'}/>
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <AdminOrderManage/>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(AdminOrderListView);
