import React from 'react';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search} = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
export class SearchForBookList extends React.Component{
    state={
        Search:1
    };

    handleSearch=(value)=>{
        this.setState({Search:0});
        this.props.search(value);
    }
    cancel=()=>{
        this.setState({Search:1});
        this.props.cancel();
    }

    render() {
        return(
            <div style={{marginTop:"20px",marginBottom:"20px"}}>
                <Search
                placeholder="请输入书名"
                enterButton={this.state.Search?"搜索":"取消"}
                size="large"
                onSearch={this.state.Search?(value) => this.handleSearch(value):()=>this.cancel()}
                />
            </div>);
    }
}
