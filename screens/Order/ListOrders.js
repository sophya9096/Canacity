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

const ListOrders = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ScrollView>
          <View
            style={{
              height: 160,
              width: '94%',
              elevation: 1,
              margin: 10,
              borderColor: '#2d2d2d',
              display: 'flex',
              flexDirection: 'row',
              borderRadius: 2,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View>
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={{uri: item.images[0].src}}
                  style={{width: 100, height: 140, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                width: '30%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                {item.categories[0].name}
              </Text>
              <Star
                score={parseFloat(item.average_rating)}
                style={styles.starStyle}
              />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  bottom: 20,
                  left: 0,
                }}>
                <Button
                  style={{position: 'absolute', zIndex: 999}}
                  transparent
                  onPress={() => removeItem(item.id)}>
                  <Image
                    source={require('../../source/assets/cross.png')}
                    style={{
                      width: 42,
                      height: 42,
                    }}
                    resizeMode="contain"
                  />
                </Button>
              </View>
              <View
                style={{
                  marginTop: 32,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    borderColor: '#2d2d2d',
                    padding: 10,
                    borderWidth: 0.6,
                    borderRadius: 6,
                  }}>
                  {item.quantity}
                </Text>
              </View>
              <View style={{right: 3}}>
                <Text
                  style={{
                    color: '#bf1f1f',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: Color.secondary,
    marginVertical: 10,
    borderRadius: 30,
    width: 180,
    height: 40,
  },
  signInText: {
    marginRight: 'auto',
    marginLeft: 'auto',
    color: 'white',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ListOrders;
