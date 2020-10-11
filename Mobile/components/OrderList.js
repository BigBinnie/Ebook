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
  ScrollView,
} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {Button, Card, WingBlank, WhiteSpace} from '@ant-design/react-native';
import {postRequest, postRequest_v2} from '../utils/Ajax';
let {width, height} = Dimensions.get('window');
import {apiUrl} from '../urlconfig';
import {OrderItemList} from './OrderItemList';
const GET_CART = apiUrl + '/getCarts';
const DELETE_CART = apiUrl + '/deleteCart';
const ADD_ORDER_BY_CART = apiUrl + '/addOrderByCart';
const GET_ORDER = apiUrl + '/getOrders';

export class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      orders: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('UPDATE_ORDER', () => {
      this.getUser();
    });
    this.getUser();
  }
  componentWillUnmount() {
    this.subscription.remove();
  }

  getUser() {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          this.setState({
            user: value,
          });
          this.fetchData();
        }
      } catch (error) {}
    };
    _retrieveData();
  }

  fetchData() {
    var user_id = JSON.parse(this.state.user).userId;
    var parm = {userId: user_id};
    const callback = (data) => {
      this.setState({orders: data});
    };
    postRequest(GET_ORDER, parm, callback);
  }

  renderOrder = ({item}) => {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header
            title={<Text style={styles.orderId}>订单号：{item.orderID}</Text>}
            extra={<Text style={styles.orderId}>总价：¥{item.totPrice}</Text>}
          />
          <Card.Body>
            <OrderItemList orderId={item.orderID} />
          </Card.Body>
          <Card.Footer content="订单状态" extra={<Text>{item.state}</Text>} />
        </Card>
        <WhiteSpace size="lg" />
      </WingBlank>
    );
  };
  render() {
    return (
      <ScrollView style={styles.page}>
        <FlatList
          data={this.state.orders}
          renderItem={this.renderOrder}
          style={styles.list}
          keyExtractor={(item) => item.orderID}
          numColumns={1}
          horizontal={false}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // paddingBottom: 15,
    paddingTop: 8,
    paddingLeft: 15,
  },
  page: {
    backgroundColor: '#F5FCFF',
    paddingTop: 8,
  },
  orderId: {
    fontSize: 16,
  },
  state: {
    fontSize: 16,
    marginBottom: 7,
    marginLeft: 10,
  },
  price: {
    fontSize: 16,
    //color: '#FF4500',
    marginBottom: 15,
    marginLeft: 10,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
  },
  list: {
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#F5FCFF',
  },
  settingStyle: {
    width: width * 0.4,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    marginLeft: 40,
  },
  icon: {
    width: 18,
    height: 18,
    // resizeMode: 'stretch',
    paddingTop: 18,
    justifyContent: 'center',
  },
});
