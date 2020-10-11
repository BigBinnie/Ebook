import React from 'react';
import {List} from 'antd'
import {Book} from './Book'
import {getBooks} from "../services/bookService";
import {SearchForBookList} from "./SearchForBookList";
import {BookCarousel} from "./BookCarousel";


export class BookList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            books:[],
            showbooks:[]
        };
    }

    componentDidMount() {

        const callback =  (data) => {
           this.setState({books:data,showbooks:data});
        };

        getBooks({"search":null}, callback);

    }
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
        return (
           <div>
               <SearchForBookList search={this.searchBooksByName} cancel={this.cancelSearch}/>
               <BookCarousel />
            <List
                grid={{gutter: 10, column: 4}}
                dataSource={this.state.showbooks}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 16,
                }}

                renderItem={item => (
                    <List.Item>
                        <Book info={item} />
                    </List.Item>
                )}
            />
           </div>
        );
    }

}
