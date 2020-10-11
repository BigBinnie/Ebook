import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
let {width, height} = Dimensions.get('window');

export class BookList extends React.Component {
  static defaultProps: {
    BookDetail: {},
  };
  renderBook = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.BookDetail({item});
        }}>
        <View style={styles.container}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.bottomContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.price}>¥{item.price}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  render() {
    return (
      <FlatList
        data={this.props.books}
        renderItem={this.renderBook}
        style={styles.list}
        keyExtractor={(item) => item.bookId}
        numColumns={2}
        horizontal={false}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width * 0.5,
    height: 260,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 15,
    paddingTop: 8,
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  author: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FF4500',
    marginBottom: 15,
  },
  bottomContainer: {
    flex: 1,
    paddingTop: 10,
  },
  image: {
    width: 140,
    height: 180,
  },
  list: {
    paddingLeft: 3,
    paddingRight: 4,
    backgroundColor: '#F5FCFF',
  },
});
