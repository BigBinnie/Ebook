import React from 'react';
import Swiper from 'react-native-swiper';
import {Image, View, Text, Dimensions, StyleSheet} from 'react-native';
let {width, height} = Dimensions.get('window');

export default function Carousel() {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        height={140}
        onMomentumScrollEnd={(e, state, context) =>
          console.log('index:', state.index)
        }
        dot={
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,.2)',
              width: 5,
              height: 5,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#000',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
            }}
          />
        }
        paginationStyle={{
          bottom: 0,
          left: null,
          right: 10,
        }}
        autoplay={true}>
        <View style={styles.slide}>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={require('../assets/carousel/book1.jpg')}
          />
        </View>
        <View style={styles.slide}>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={require('../assets/carousel/book2.jpg')}
          />
        </View>
        <View style={styles.slide}>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={require('../assets/carousel/book3.jpg')}
          />
        </View>
        <View style={styles.slide}>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={require('../assets/carousel/book4.jpg')}
          />
        </View>
      </Swiper>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 250,
    width: width,
    paddingTop: 3,
  },
  wrapper: {},
  slide: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width,
    height: 250,
  },
});
