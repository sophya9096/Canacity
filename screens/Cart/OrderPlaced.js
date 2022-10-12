import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StatusBar,
} from 'react-native';
import Color from './../../constant/Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const OrderPlaced = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.main}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: hp('1%'),
              paddingHorizontal: wp('1%'),
              backgroundColor: '#ffffff',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{
                  width: wp('90%'),
                  height: hp('40%'),
                  resizeMode: 'contain',
                }}
                source={require('./../../source/assets/Image.png')}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: hp('4.5%'),
                }}>
                Your order has been place succesfully
              </Text>
            </View>
          </View>
          {/* <ScrollView showsVerticalScrollIndicator={false}></ScrollView> */}
          <View style={{marginTop: hp('11.5%'), marginBottom: hp('1%')}}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <View style={styles.signIn}>
                <Text style={styles.signInText}>OK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    resizeMode: 'contain',
    display: 'flex',
    alignItems: 'center',
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp('0.25%'),
    borderColor: 'white',
    backgroundColor: Color.secondary,
    marginVertical: hp('2.5%'),
    borderRadius: wp('10%'),
    width: wp('50%'),
    height: hp('5%'),
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  signInText: {
    marginRight: 'auto',
    marginLeft: 'auto',
    color: 'white',
    fontSize: hp('1.8%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default OrderPlaced;
