import React from 'react';
import {View, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {SearchBar} from '../components/SearchBar';
import Carousel from '../components/Carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {apiUrl} from '../urlconfig';
import {BookList} from '../components/BookList';
import {NoticeBar, WhiteSpace, Icon} from '@ant-design/react-native';
const GETBOOKS_URL = apiUrl + '/getBooks';
export class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBooks: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('@Bookstore:token');
        if (value !== null) {
          this.fetchData();
        }
      } catch (error) {}
    };
    _retrieveData();
  }
  fetchData() {
    fetch(GETBOOKS_URL, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: 'null',
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          isLoading: false,
          books: responseData,
          showBooks: responseData,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getText(data) {
    var arr = [];
    var list = this.state.books;
    for (var i = 0; i < list.length; i++) {
      if (
        list[i].name.indexOf(data) >= 0 ||
        list[i].type.indexOf(data) >= 0 ||
        list[i].author.indexOf(data) >= 0 ||
        list[i].description.indexOf(data) >= 0
      ) {
        arr.push(list[i]);
      }
    }
    this.setState({
      showBooks: arr,
    });
  }
  cancel() {
    this.setState({
      showBooks: this.state.books,
    });
  }
  navigateToDetail({item}) {
    this.props.navigation.push('Book Detail', {detail: item});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 2}}>
          <SearchBar
            searchBooks={(data) => this.getText(data)}
            cancelSearching={() => this.cancel()}
          />
          <ScrollView>
            <Carousel />
            {/*<NoticeBar icon={null} mode="closable" marqueeProps={{loop: true}}>*/}
            {/*  520心动节大促销！！！！！！！！！编程类书籍一律五折起！！！！！！！！更有好礼大放送！！！！！！！*/}
            {/*</NoticeBar>*/}
            <BookList
              books={this.state.showBooks}
              BookDetail={(item) => this.navigateToDetail(item)}
            />
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}
