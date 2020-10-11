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
import {Button, Card, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {OrderItemList} from './OrderItemList';
const GET_CART = apiUrl + '/getCarts';
const DELETE_CART = apiUrl + '/deleteCart';
const ADD_ORDER_BY_CART = apiUrl + '/addOrderByCart';
const CLEAER_CART = apiUrl + '/clearCart';
export class CartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      carts: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('UPDATE_CART', () => {
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
          console.log(this.state.cart);
        }
      } catch (error) {}
    };
    _retrieveData();
  }

  fetchData() {
    var user_id = JSON.parse(this.state.user).userId;
    var parm = {userId: user_id};
    const callback = (data) => {
      this.setState({carts: data});
    };
    postRequest(GET_CART, parm, callback);
  }

  deleteCart = (cart) => {
    var cart = {id: cart.cartId};
    const callback = () => {
      this.getUser();
    };
    postRequest_v2(DELETE_CART, cart, callback);
  };

  addOrder = (cart) => {
    var user_id = JSON.parse(this.state.user).userId;
    var parm = {cartId: cart.cartId, userId: user_id};
    const callback = () => {
      Toast.showSuccess('购买成功');
      DeviceEventEmitter.emit('UPDATE_ORDER');
    };
    postRequest(ADD_ORDER_BY_CART, parm, callback);
  };
  clearCart = () => {
    var user_id = JSON.parse(this.state.user).userId;
    var parm = {userId: user_id};
    const callback = () => {
      Toast.showSuccess('下单成功');
      this.getUser();
      DeviceEventEmitter.emit('UPDATE_ORDER');
    };
    postRequest(CLEAER_CART, parm, callback);
  };
  renderBook = ({item}) => {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />

        <View style={styles.container}>
          <Image source={{uri: item.book.image}} style={styles.image} />
          <View style={styles.bottomContainer}>
            <Text style={styles.name}>{item.book.name}</Text>
            {/*<Text style={styles.author}>{item.book.author}</Text>*/}
            <Text style={styles.price}>¥{item.book.price}</Text>
            <Text style={styles.amount}>x{item.amount}</Text>
            <View style={styles.settingStyle}>
              <Button
                type={'ghost'}
                inline-size={'small'}
                style={styles.Btn1Style}
                title="加入购物车"
                icon="check-circle-o"
                onPress={() => {
                  console.log(item);
                  this.deleteCart(item);
                }}>
                <Text style={{fontSize: 15, color: '#1E90FF'}}>删除</Text>
              </Button>
              <Button
                type="warning"
                style={styles.Btn2Style}
                title="购买"
                onPress={() => {
                  console.log(item);
                  this.addOrder(item);
                }}>
                <Text style={{fontSize: 15, color: 'white'}}>购买</Text>
              </Button>
            </View>
          </View>
        </View>
        <WhiteSpace size="lg" />
      </WingBlank>
    );
  };
  render() {
    return (
      <View style={styles.page}>
        <Button
          type="warning"
          style={styles.BtnStyle}
          title="购买"
          disabled={this.state.carts.length == 0 ? true : false}
          onPress={() => {
            this.clearCart();
          }}>
          <Text style={{fontSize: 18, color: 'white'}}>清空购物车</Text>
        </Button>
        <FlatList
          data={this.state.carts}
          renderItem={this.renderBook}
          style={styles.list}
          keyExtractor={(item) => item.cartId}
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
    paddingBottom: 15,
    paddingTop: 8,
    paddingLeft: 15,
  },
  page: {
    backgroundColor: '#F5FCFF',
    paddingTop: 8,
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
    width: 95,
    height: 140,
  },
  list: {
    paddingLeft: 3,
    paddingRight: 4,
    backgroundColor: '#F5FCFF',
  },
  settingStyle: {
    width: width * 0.4,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    marginLeft: 35,
  },
  BtnStyle: {
    height: 40,
    width: width * 0.5,
    marginLeft: 0,
    marginTop: 10,
    borderRadius: 10,
  },
  Btn1Style: {
    height: 32,
    width: width * 0.2,
    marginLeft: 0,
    borderRadius: 10,
  },
  Btn2Style: {
    height: 32,
    width: width * 0.2,
    marginLeft: 15,
    borderRadius: 10,
  },
  icon: {
    width: 18,
    height: 18,
    // resizeMode: 'stretch',
    paddingTop: 18,
    justifyContent: 'center',
  },
});
