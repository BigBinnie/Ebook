import React from 'react';
import { Card } from 'antd';

import {Link} from 'react-router-dom'

const { Meta } = Card;

export class Book extends React.Component{


    render() {

        const {info} = this.props;

        return (
            <Link to={{
                pathname: '/bookDetails',
                search: '?id=' + info.bookId}}
                target="_blank"
            >
            <Card
                hoverable
                style={{width: 181}}
                cover={<img alt="image" src={info.image===null?info.bookimage.imageBase64:info.image} className={"bookImg"}/>}
            >
                <Meta title={info.name} description={'¥' + info.price}/>
            </Card>
            </Link>
        );
    }

}

