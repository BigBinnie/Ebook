import React from 'react';
import {View, Text, Dimensions, AsyncStorage} from 'react-native';
import {Button, Card, WingBlank} from '@ant-design/react-native';
import {Image, StyleSheet, DeviceEventEmitter} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {postRequest, postRequest_v2} from '../utils/Ajax';
import {apiUrl} from '../urlconfig';
const ADD_CART = apiUrl + '/addCart';
const ADD_ORDER = apiUrl + '/addOrder';
let {width, height} = Dimensions.get('window');
function successToast() {
  Toast.fail('Load success !!!', 3000);
}
export class Book extends React.Component {
  addCart = (book) => {
    console.log('add cart');
    const _retrieveData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
          this.addCartData(user, book);
        }
      } catch (error) {}
    };
    _retrieveData();
  };

  addCartData(user, book) {
    var user_id = JSON.parse(user).userId;
    console.log(book);
    console.log(user_id);
    var param = {bookId: book.bookId.toString(), userId: user_id.toString()};
    const callback = (data) => {
      Toast.showSuccess('成功加入购物车');
      DeviceEventEmitter.emit('UPDATE_CART');
    };
    postRequest(ADD_CART, param, callback);
  }

  addOrder = (book) => {
    console.log('add cart');
    const _retrieveData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
          this.addOrderData(user, book);
        }
      } catch (error) {}
    };
    _retrieveData();
  };
  addOrderData = (user, book) => {
    var user_id = JSON.parse(user).userId;
    console.log(book);
    console.log(user_id);
    var param = {bookId: book.bookId.toString(), userId: user_id.toString()};
    const callback = (data) => {
      Toast.showSuccess('成功购买');
      DeviceEventEmitter.emit('UPDATE_ORDER');
    };
    postRequest(ADD_ORDER, param, callback);
  };

  render() {
    return (
      <View style={styles.container}>
        <WingBlank size="lg">
          <Card>
            <Card.Header
              thumbStyle={{width: 330, height: 280}}
              thumb={this.props.detail.image}
            />
            <Card.Body>
              <View style={{height: 340}}>
                <Text style={styles.title}>{this.props.detail.name}</Text>
                <Text style={styles.detail}>
                  作者：{this.props.detail.author}
                </Text>
                <Text style={styles.detail}>
                  ISBN：{this.props.detail.isbn}
                </Text>
                <Text style={styles.detail}>
                  类型：{this.props.detail.type}
                </Text>
                <Text style={styles.price}>
                  价格： ¥{this.props.detail.price}
                </Text>
                <Text style={styles.description}>
                  {this.props.detail.description}
                </Text>
              </View>
            </Card.Body>
            <Card.Footer content="库存" extra={this.props.detail.inventory} />
          </Card>
        </WingBlank>
        <View style={styles.settingStyle}>
          <Button
            type="warning"
            style={styles.BtnStyle}
            title="加入购物车"
            onPress={() => {
              this.addCart(this.props.detail);
            }}>
            <Text style={{color: 'white'}}>加入购物车</Text>
          </Button>
          <Button
            type="warning"
            style={styles.BtnStyle}
            title="购买"
            onPress={() => {
              this.addOrder(this.props.detail);
            }}>
            <Text style={{color: 'white'}}>立即购买</Text>
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    marginLeft: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 5,
  },
  image: {
    width: 182,
    height: 245,
  },
  price: {
    fontSize: 17,
    color: '#FF4500',
    marginBottom: 10,
    marginLeft: 16,
    marginTop: 10,
  },
  description: {
    marginLeft: 16,
    fontSize: 18,
    marginTop: 10,
  },
  settingStyle: {
    width: width * 0.9,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  BtnStyle: {
    height: 45,
    width: width * 0.45,
    marginLeft: 12,
    borderRadius: 10,
  },
});
