import React, {useState, useEffect} from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import splash from '../../source/assets/BgImage.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_token').then(value =>
        navigation.replace(
          value === null ? 'RootStackScreen' : 'mainNavigator',
          // console.log(user_token),
        ),
      );
    }, 3000);
  }, []);

  return (
    <Animatable.View style={styles.container} easing="ease-out">
      <ImageBackground source={splash} style={styles.Splash}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginBottom: 6}}>
            {/* <Image source={require('../../source/assets/AnimatableLogo.gif')} /> */}
            <Animatable.Image
              animation="flipInX"
              source={require('../../source/assets/Group3.png')}
              style={styles.logo3}
            />
          </View>
          <View style={{marginBottom: 6}}>
            <Animatable.Image
              animation="slideInLeft"
              source={require('../../source/assets/Group2.png')}
              style={styles.logo2}
            />
          </View>
          <View>
            <Animatable.Image
              animation="slideInRight"
              source={require('../../source/assets/Group1.png')}
              style={styles.logo1}
            />
          </View>
        </View>
      </ImageBackground>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Splash: {
    flex: 1,
    resizeMode: 'cover',
    width: wp('100%'),
    height: hp('100%'),
  },
  logo3: {
    width: wp('14%'),
    height: hp('7%'),
    resizeMode: 'contain',
  },
  logo2: {
    width: wp('45%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  logo1: {
    width: wp('30.25%'),
    height: hp('1.5%'),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
