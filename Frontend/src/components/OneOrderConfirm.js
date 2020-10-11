import React from "react";
import {Avatar, Button, List, Modal} from "antd";

export class  OneOrderConfirm extends React.Component{
    render(){
        let {chooseCart}=this.props;
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
                    dataSource={chooseCart}
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
