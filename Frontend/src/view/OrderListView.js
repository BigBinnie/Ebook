import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/OrderList.css'
import {withRouter} from "react-router-dom";
import {OrderList} from "../components/OrderList";
import {OrderManage} from "../components/OrderManage";

const { Header, Content, Footer } = Layout;

class OrderListView extends React.Component{


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
                            <OrderManage/>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(OrderListView);
