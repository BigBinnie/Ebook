import React from "react";
import {Layout} from "antd";
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import {UserProfile} from "../components/UserProfile";
import {withRouter} from "react-router-dom";
import {getUser} from "../services/userService";

const { Header, Content, Footer } = Layout;
class UserProfileView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {user:null};
    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        var user_id=JSON.parse(user).userId;
        getUser(user_id, (data) => {this.setState({userInfo: data})})
    }

    render(){
        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar  selected={'4'}/>
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <UserProfile info={this.state.userInfo} />

                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(UserProfileView);
