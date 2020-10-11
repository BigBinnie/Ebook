import React from 'react';
import {Book} from '../components/Book';
export class BookView extends React.Component {
  render() {
    let info = this.props.route.params.detail;
    return <Book detail={info} />;
  }
}
