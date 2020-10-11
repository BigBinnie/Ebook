import React from "react";
import {changeBookInfo} from "../services/bookService";
import {Button, Col, Input, Modal, Row} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";
import {Uploader} from "./Uploader";
const { TextArea } = Input;
export class BookForm extends React.Component{

    constructor(props) {
        super(props);
        const book = this.props.book;
        this.state = {
            bookId:book.bookId,
            imageBase64:null,
            name:book.name,
            author:book.author,
            isbn:book.isbn,
            inventory:book.inventory,
            price:book.price,
            description:book.description
        };
    }

    changeValue = (e) => {
        console.log(e.target.id);
        console.log(e.target.value);
        switch (e.target.id) {
            case "1":this.setState({name:e.target.value});break;
            case "2":this.setState({author:e.target.value});break;
            case "3":this.setState({isbn:e.target.value});break;
            case "4":this.setState({inventory:e.target.value});break;
            case "5":this.setState({price:e.target.value});break;
            case "6":this.setState({description:e.target.value});break;
            default:break;
        }
    };

    submit = () => {
        console.log(this.state);
        const callback = (data) => {
            this.props.submitComplete(data);
        };
        changeBookInfo(this.state,callback);
    };

    uploadDone = (imageBase64) => {
        this.setState({imageBase64:imageBase64});
    };

    render() {
        const book = this.props.book;
        let imgUrl = null;
        if(book.bookimage != null){
            imgUrl = book.bookimage.imageBase64;
        }
        else imgUrl = require("../assets/nobookicon.png");
        return (
            <Modal
                title="书籍信息修改"
                centered
                visible={true}
                footer={null}
                onCancel={this.props.move}
            >
                <div className="modalImageSpace" style={{display:"flex",marginLeft:"105px"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minWidth:"102px",height:"102px",backgroundColor:"rgb(238,238,238)"}}>
                        <img alt="image" src={imgUrl} style={{width:"86px",height:"86px"}}/>
                    </div>
                    <div className="modalIcon">
                        <DoubleRightOutlined style={{marginTop:"30px",fontSize: '25px'}}/>
                    </div>
                    <Uploader changeImageState={this.uploadDone}/>
                </div>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">书名：</text>
                    </Col>
                    <Col span={15}>
                        <Input defaultValue={book.name} onChange={this.changeValue} id={"1"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">作者：</text>
                    </Col>
                    <Col span={15}>
                        <Input defaultValue={book.author} onChange={this.changeValue} id={"2"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">ISBN：</text>
                    </Col>
                    <Col span={15}>
                        <Input defaultValue={book.isbn} onChange={this.changeValue} id={"3"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">库存：</text>
                    </Col>
                    <Col span={15}>
                        <Input defaultValue={book.inventory} onChange={this.changeValue} id={"4"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">价格：</text>
                    </Col>
                    <Col span={15}>
                        <Input defaultValue={book.price} onChange={this.changeValue} id={"5"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={3} offset={3}>
                        <text className="modalLabel">简介：</text>
                    </Col>
                    <Col span={15}>
                        <TextArea
                            defaultValue={book.description}
                            onChange={this.changeValue}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            id={"6"}
                        />
                    </Col>
                </Row>
                <Button type="primary" size="large" style={{marginLeft:"180px",marginTop:"20px"}} onClick={this.submit}>
                    确认修改
                </Button>
            </Modal>
        )
    }
}
