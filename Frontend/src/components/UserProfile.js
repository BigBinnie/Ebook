import {Button, Descriptions} from "antd";
import React from "react";
import '../css/userProfile.css'
import {FormOutlined} from '@ant-design/icons';
export class UserProfile extends React.Component{
    render() {

        const {info} = this.props;

        if (info == null) {
            return null;
        }

        return (
            <div className={"content"}>
                <div className={"user-detail"}>
                    <div className={"user-icon"}><img alt="image" src={info.icon.iconBase64}
                                                       style={{width: "300px", height: "300px"}}/></div>
                    <div className={"profile-descriptions"}>
                        <Descriptions>
                            <Descriptions.Item className={"description-item"} span={3}>ID：{info.userId}</Descriptions.Item>
                            <Descriptions.Item className={"description-item"} span={3}>昵称：{info.nickname}</Descriptions.Item>
                            <Descriptions.Item className={"description-item"} span={3}>名字：{info.name}</Descriptions.Item>
                            <Descriptions.Item className={"description-item"} span={3}>电话：{info.tel===null?"还没有绑定手机号哦":info.tel}</Descriptions.Item>
                            <Descriptions.Item className={"description-item"} span={3}>邮箱：{info.email}</Descriptions.Item>
                        </Descriptions>
                        <Button style={{marginTop:"5px"}}block size="large" type="primary"><FormOutlined />修改资料</Button>
                    </div>
                </div>
            </div>


        )

    }
}
