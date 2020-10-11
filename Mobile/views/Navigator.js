import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from 'react-native-tab-navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ProfileView} from './ProfileView';
import {View, StyleSheet, Image} from 'react-native';
import {HomeView} from './HomeView';
import {BookView} from './BookView';
import {CartList} from '../components/CartList';
import TabNavigatorItem from 'react-native-tab-navigator/TabNavigatorItem';
import {OrderList} from '../components/OrderList';
const Stack = createStackNavigator();
function BookListAndDetail() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="商城"
          component={HomeView}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Book Detail" component={BookView} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '首页',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator tabBarStyle={styles.tab}>
          <TabNavigator.Item
            selected={this.state.selectedTab === '首页'}
            title="首页"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => (
              <Image
                source={require('../assets/home.png')}
                style={styles.icon}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={styles.icon}
                source={require('../assets/home-selected.png')}
              />
            )}
            onPress={() => this.setState({selectedTab: '首页'})}>
            <BookListAndDetail />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === '购物车'}
            title="购物车"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => (
              <Image
                source={require('../assets/cart.png')}
                style={styles.icon}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={styles.icon}
                source={require('../assets/cart-selected.png')}
              />
            )}
            onPress={() => this.setState({selectedTab: '购物车'})}>
            <CartList />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === '订单'}
            title="订单"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => (
              <Image
                source={require('../assets/order.png')}
                style={styles.icon}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={styles.icon}
                source={require('../assets/order-selected.png')}
              />
            )}
            onPress={() => this.setState({selectedTab: '订单'})}
          >
            <OrderList />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === '我的'}
            title="我的"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => (
              <Image
                source={require('../assets/profile.png')}
                style={styles.icon}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={styles.icon}
                source={require('../assets/proflie-selected.png')}
              />
            )}
            onPress={() => this.setState({selectedTab: '我的'})}>
            <ProfileView />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    height: 65,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  tabText: {
    marginTop: 1,
    color: '#000000',
    fontSize: 13,
    paddingBottom: 9,
  },
  selectedTabText: {
    marginTop: 1,
    color: '#63B8FF',
    fontSize: 13,
    paddingBottom: 9,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'stretch',
    marginTop: 8,
  },
});
