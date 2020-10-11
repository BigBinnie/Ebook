import React from 'react';
import { Button, Col, Descriptions, List, Row, Switch, Modal, Card, Input, Form, Icon, Checkbox} from 'antd';
import { DoubleRightOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {changeBookInfo, getBooks,deleteBook} from "../services/bookService";
import {Uploader} from "./Uploader";
import {BookInsertForm} from "./InsertForm";
import {Link} from "react-router-dom";
import {BookItem} from "./AdminBook";
import {BookForm} from "./EditForm";
import {SearchForBookList} from "./SearchForBookList";

const { TextArea } = Input;

export class AdminBookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            showbooks:[],
            chooseBook: null,
            chooseIndex: null,
            modalVisible: false,
            insertModalVisible: false
        };
    }

    componentDidMount() {

        const callback = (data) => {
            console.log(data);
            this.setState({books: data, showbooks:data,chooseBook: data[0]});
        };
        getBooks({},callback)
    }

    insertNewBook = () => {
        const callback = (data) => {
            console.log(data);
            this.setState({books: data, showbooks:data,chooseBook: data[0],insertModalVisible:false});
        };
        getBooks({},callback)
    };

    renderInsertModal = () => {
        if(this.state.insertModalVisible === true) return (<BookInsertForm move={this.moveOutInsertModal} insertComplete={this.insertNewBook}/>);
        else return null;
    };

    moveOutInsertModal = () => {
        this.setState({insertModalVisible:false})
    };


    deleteOneBook = (bookId) => {
        const callback2 = (data) => {
            this.setState({books: data, showbooks:data,chooseBook: data[0]});
        };
        const callback = () => {
            getBooks({},callback2)
        };
        deleteBook(bookId,callback);
    };


    chooseOneBook = (book, index) => {
        this.setState({chooseBook: book, chooseIndex:index},() => {this.setState({modalVisible:true});});
    };

    renderModal = () => {
        if(this.state.modalVisible === true) return (<BookForm book={this.state.chooseBook} move={this.moveOutModal} submitComplete={this.modalSubmitAndReturn}/>);
        else return null;
    };

    moveOutModal = () => {
        this.setState({modalVisible:false})
    };

    modalSubmitAndReturn = (data) => {
        const callback = (data) => {
            console.log(data);
            this.setState({books: data, chooseBook: data[0],ModalVisible:false});
        };
        getBooks({},callback)
        let books = this.state.showbooks;
        books[this.state.chooseIndex] = data;
        this.setState({showbooks:books},() => {this.setState({modalVisible:false})});
    };

    searchBooksByName = (val) => {
        var len = this.state.books.length;
        var arr = [];
        for(var i=0;i<len;i++){
            if(this.state.books[i].name.indexOf(val)>=0){
                arr.push(this.state.books[i]);
            }
        }
        this.setState({showbooks:arr});
    }
    cancelSearch=()=>{
        this.setState({showbooks:this.state.books});
    }

    render() {
        if (this.state.books.length === 0) {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            )
        } else return (
            <div style={{marginLeft:"20px"}}>
                <SearchForBookList search={this.searchBooksByName} cancel={this.cancelSearch}/>
                <Button type="primary" shape="circle" onClick={() => {this.setState({insertModalVisible:true})}}>
                    <PlusOutlined />
                </Button>
                <List
                    itemLayout="vertical"
                    size="small"
                    split={false}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 12,
                    }}
                    dataSource={this.state.showbooks}

                    renderItem={(item,index) => (
                        <List.Item>
                            <BookItem book={item} idx={index} edit={this.chooseOneBook} delete={this.deleteOneBook}/>
                        </List.Item>
                    )}
                />
                {this.renderModal()}
                {this.renderInsertModal()}
            </div>
        )
    }
}
