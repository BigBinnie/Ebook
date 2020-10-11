import * as React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../context';
import {apiUrl} from '../urlconfig';
import {useState} from 'react';
import {Card, WingBlank, Button} from '@ant-design/react-native';
const LOGOUT_URL = apiUrl + '/logout';
const GET_USER = apiUrl + '/getUser';
let {width, height} = Dimensions.get('window');

function SignOut() {
  const {signOut} = React.useContext(AuthContext);
  return (
    <Button
      style={styles.BtnStyle}
      title="切换账号"
      type="primary"
      onPress={() => {
        AsyncStorage.removeItem('@eBook:token');
        signOut();
        fetch(LOGOUT_URL, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })
          .then((response) => {})
          .then((responseData) => {})
          .catch((error) => {});
      }}>
      <Text style={{color: 'white'}}>切换账号</Text>
    </Button>
  );
}

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: true,
    };
  }

  componentWillMount() {
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
    let formData = new FormData();
    var user_id = JSON.parse(this.state.user).userId;
    formData.append('id', user_id);
    fetch(GET_USER, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          user: responseData,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      console.log(this.state.user.icon.iconBase64);
      return (
        <View style={styles.container}>
          <WingBlank size="lg">
            <Card>
              <Card.Header
                thumbStyle={{width: 350, height: 360}}
                thumb={this.state.user.icon.iconBase64}
              />
              <Card.Body>
                <View style={{height: 370}}>
                  <Text style={styles.title}>
                    UserId: {this.state.user.userId}
                  </Text>
                  <Text style={styles.detail}>
                    Name: {this.state.user.name}
                  </Text>
                  <Text style={styles.detail}>
                    Nickname：{this.state.user.nickname}
                  </Text>
                  <Text style={styles.detail}>
                    Address：{this.state.user.address}
                  </Text>
                  <Text style={styles.detail}>Tel：{this.state.user.tel}</Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 80,
                    }}>
                    <SignOut />
                  </View>
                </View>
              </Card.Body>
            </Card>
          </WingBlank>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    marginLeft: 16,
    marginTop: 18,
    fontStyle: 'italic',
  },
  detail: {
    fontSize: 24,
    marginLeft: 16,
    marginTop: 10,
    fontStyle: 'italic',
  },
  BtnStyle: {
    width: width * 0.45,
    borderRadius: 10,
  },
});
