import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/ShoppingCart.css'
import {withRouter} from "react-router-dom";
import {Cart} from "../components/Cart";

const { Header, Content, Footer } = Layout;

class ShoppingCartView extends React.Component{

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
                            <Cart/>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(ShoppingCartView);
