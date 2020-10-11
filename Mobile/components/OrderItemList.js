import * as React from 'react';
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  DeviceEventEmitter,
} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {postRequest, postRequest_v2} from '../utils/Ajax';
let {width, height} = Dimensions.get('window');
import {apiUrl} from '../urlconfig';
const GET_ORDERITEMS = apiUrl + '/getOrderItems';
export class OrderItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const {orderId} = this.props;
    console.log(orderId);
    this.fetchData(orderId);
  }

  fetchData(orderId) {
    var parm = {orderId: orderId};
    const callback = (data) => {
      this.setState({orderItems: data});
    };
    postRequest(GET_ORDERITEMS, parm, callback);
  }
  renderBook = ({item}) => {
    return (
      <View style={styles.container}>
        <Image source={{uri: item.book.image}} style={styles.image} />
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{item.book.name}</Text>
          {/*<Text style={styles.author}>{item.book.author}</Text>*/}
          <Text style={styles.price}>¥{item.book.price}</Text>
          <Text style={styles.amount}>x{item.amount}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.page}>
        <FlatList
          data={this.state.orderItems}
          renderItem={this.renderBook}
          style={styles.list}
          keyExtractor={(item) => item.orderItemID}
          numColumns={1}
          horizontal={false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: 160,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    // paddingBottom: 15,
    paddingLeft: 15,
  },
  page: {
    //backgroundColor: '#F5FCFF',
    paddingLeft: 15,
  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  amount: {
    fontSize: 16,
    marginBottom: 7,
  },
  price: {
    fontSize: 16,
    color: '#FF4500',
    marginBottom: 15,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 50,
  },
  image: {
    width: 80,
    height: 120,
  },
  list: {
    paddingLeft: 3,
    paddingRight: 4,
    //backgroundColor: '#F5FCFF',
  },
  settingStyle: {
    width: width * 0.4,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    marginLeft: 40,
  },
});
