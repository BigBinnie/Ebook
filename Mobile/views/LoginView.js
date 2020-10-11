import React, {useState} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  Alert,
  ImageBackground,
} from 'react-native';
import {Button} from '@ant-design/react-native';
import {AuthContext} from '../context';
import {apiUrl} from '../urlconfig';
let {width, height} = Dimensions.get('window');

const LOGIN_URL = apiUrl + '/login';
var isSuccess;

function fetchData({name, password, signIn}) {
  fetch(LOGIN_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: name,
      password: password,
    }),
  })
    .then((response) => {
      let _storeData = async () => {
        try {
          await AsyncStorage.setItem('@eBook:token', 'exist');
        } catch (error) {}
      };
      _storeData();
      return response.json();
    })
    .then((responseData) => {
      isSuccess = responseData.status == 0 ? true : false;
      if (isSuccess) {
        let user = responseData.data;
        let _storeUser = async () => {
          try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
          } catch (error) {}
        };
        _storeUser();
        signIn();
      } else {
        Alert.alert('用户名或密码错误！');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function LoginView() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = React.useContext(AuthContext);
  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/login.jpg')}>
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/logo.jpg')}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder={'请输入用户名'}
          autoCapitalize={'none'}
          autoCorrect={'false'}
        />

        <TextInput
          style={styles.textInputStyle}
          placeholder={'请输入密码'}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          value={password}
          password={true}
          autoCapitalize={'none'}
          autoCorrect={'false'}
        />

        <Button
          type="primary"
          style={styles.loginBtnStyle}
          title="登录"
          onPress={() => {
            fetchData({name, password, signIn});
          }}>
          <Text style={{color: 'white'}}>登录</Text>
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    width: width * 0.7,
    height: 45,
    backgroundColor: 'white',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 6,
  },
  loginBtnStyle: {
    height: 45,
    width: width * 0.4,
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 10,
  },
  settingStyle: {
    width: width * 0.85,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 40,
    alignItems: 'center',
    paddingBottom: 10,
  },
  imageStyle: {
    width: 160,
    height: 160,
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 100,
  },
});
