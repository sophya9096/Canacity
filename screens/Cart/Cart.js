import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TextInput,
  Image,
  useColorScheme,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Container, Text, Button, Content} from 'native-base';
import CartContext from '../Context/Cart/CartContext';
import Star from 'react-native-star-view';
import Color from './../../constant/Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CartItem = ({item}) => {
  const {removeItem, subItems, addItems} = useContext(CartContext);
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: wp('100%'),
          paddingBottom: hp('2.5%'),
        }}>
        <View
          style={{
            height: hp('19%'),
            // height: 160,
            width: wp('95%'),
            elevation: 2,
            // marginTop: hp('0.05%'),
            borderColor: '#2d2d2d',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: wp('0.25%'),
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View>
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={{uri: item.images[0].src}}
                style={{
                  // width: 100,
                  // height: 140,
                  resizeMode: 'contain',
                  width: wp('22%'),
                  height: hp('15%'),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wp('25%'),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: hp('1.9%'),
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: hp('1.4%'),
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
              width: wp('30%'),
            }}>
            <View
              style={{
                bottom: hp('2%'),
                left: wp('3.25%'),
              }}>
              <Button
                style={{position: 'absolute', zIndex: 999}}
                transparent
                onPress={() => removeItem(item.id)}>
                <Image
                  source={require('../../source/assets/cross.png')}
                  style={{
                    width: wp('10%'),
                    height: hp('10%'),
                  }}
                  resizeMode="contain"
                />
              </Button>
            </View>
            <View
              style={{
                marginTop: hp('4%'),
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View>
                {/* <Button
                  style={{
                    backgroundColor: '#ffffff',
                    elevation: 0,
                  }}
                  onPress={() => removeItem(item.id)}>
                  <Image
                    source={require('../../source/assets/Minus.png')}
                    style={{
                      backgroundColor: 'transparent',
                      width: wp('6%'),
                      height: hp('6%'),
                      tintColor: '#bf1f1f',
                      resizeMode: 'contain',
                    }}
                  />
                </Button> */}
                {item.quantity === 1 ? (
                  <Button
                    style={{
                      elevation: 0,
                      backgroundColor: '#ffffff',
                    }}
                    onPress={() => removeItem(item.id)}>
                    <Image
                      source={require('../../source/assets/Minus.png')}
                      style={{
                        backgroundColor: 'transparent',
                        width: wp('6%'),
                        height: hp('6%'),
                        tintColor: '#bf1f1f',
                        resizeMode: 'contain',
                      }}
                    />
                  </Button>
                ) : (
                  <Button
                    style={{
                      elevation: 0,
                      backgroundColor: '#ffffff',
                    }}
                    onPress={() => subItems(item)}>
                    <Image
                      source={require('../../source/assets/Minus.png')}
                      style={{
                        backgroundColor: 'transparent',
                        width: wp('6%'),
                        height: hp('6%'),
                        tintColor: '#bf1f1f',
                        resizeMode: 'contain',
                      }}
                    />
                  </Button>
                )}
              </View>
              <View style={{paddingHorizontal: wp('1%')}}>
                <Text
                  style={{
                    borderColor: '#2d2d2d',
                    paddingVertical: hp('1%'),
                    paddingHorizontal: wp('2.5%'),
                    borderWidth: wp('0.3%'),
                    borderRadius: wp('1.5%'),
                    fontSize:hp('2%')
                  }}>
                  {item.quantity}
                </Text>
              </View>
              <View>
                <Button
                  style={{
                    backgroundColor: '#ffffff',
                    elevation: 0,
                  }}
                  onPress={() => addItems(item)}>
                  <Image
                    source={require('../../source/assets/Plus.png')}
                    style={{
                      backgroundColor: 'transparent',
                      width: wp('6%'),
                      height: hp('6%'),
                      tintColor: '#bf1f1f',
                      resizeMode: 'contain',
                    }}
                  />
                </Button>
              </View>
            </View>
            <View style={{right: 2}}>
              <Text
                style={{
                  color: '#bf1f1f',
                  fontSize: hp('2.5%'),
                  fontWeight: 'bold',
                }}>
                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const CartScreen = ({navigation, item}) => {
  const {cartItems} = useContext(CartContext);
  // const {cartItems} = useContext(CartContext) && useState(getProductData());
  // const {cartItems} =  useState(getProductData());

  // useEffect(() => {
  //   const getProductData = async () => {
  //     try {
  //       let orders = await AsyncStorage.getItem('orders');
  //       console.log({orders});

  //       orders = await JSON.parse(orders);
  //       console.log({orders});
  //     } catch (err) {
  //       console.log(err.messsage);
  //     }
  //     console.log(orders, 'Cart Items');

  //     //   if (orders) {
  //     //     console.log(orders, 'Cart items Exist');
  //     //     return orders;
  //     //   } else {
  //     //     return [];
  //     //   }
  //   };

  //   getProductData();
  // }, []);

  const total = cartItems
    .reduce(
      (price, item) =>
        parseFloat(item.price * item.quantity) + parseFloat(price),
      0,
    )
    .toFixed(2);

  return (
    <>
      <Container>
        {cartItems.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: 'black', fontSize: hp('3%'), fontWeight: 'bold'}}>
              Cart Empty
            </Text>
          </View>
        ) : (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <View
              style={{
                // backgroundColor: 'yellow',
                paddingVertical: hp('1%'),
                paddingHorizontal: wp('2.5%'),
              }}>
              <Text
                style={{
                  color: '#bf1f1f',
                  fontWeight: 'bold',
                  fontSize: hp('3%'),
                }}>
                Cart ({cartItems.length})
              </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  display: 'flex',
                  backgroundColor: '#ffffff',
                  paddingBottom: hp('2.5%'),
                }}>
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </Container>
      {cartItems.length != 0 ? (
        <View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('Payment');
                // navigation.navigate('OrderPlaced');
              }}>
              <View style={styles.signIn}>
                <Text style={styles.signInText}>Checkout</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: hp('2%'),
              paddingHorizontal: wp('4%'),
              backgroundColor: 'black',
            }}>
            <View>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: hp('2.5%'),
                }}>
                TOTAL :
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: hp('2.5%'),
                }}>
                ${total}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp('0.25%'),
    borderColor: 'white',
    backgroundColor: Color.secondary,
    marginVertical: hp('0.5%'),
    borderRadius: wp('10%'),
    width: wp('45%'),
    height: hp('5%'),
  },
  signInText: {
    marginRight: 'auto',
    marginLeft: 'auto',
    color: 'white',
    fontSize: hp('1.8%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  starStyle: {
    // width: 50,
    // height: 10,
    width: wp('11.5%'),
    height: hp('1.3%'),
  },
});

export default CartScreen;
