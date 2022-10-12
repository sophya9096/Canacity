import React, {useState, useContext} from 'react';
import btoa from 'btoa';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from './../../constant/Color';
import CartContext from '../Context/Cart/CartContext';
import Star from 'react-native-star-view';
import {UserID} from '../../Navigations/App';
const CheckOut = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const {jwtID, jwtSetID} = useContext(UserID);
  const [paymentMethod, setPaymentMethod] = useState('Paysafe');
  const [paymentTitle, setPaymentTitle] = useState('Paysafe');
  const {clearCart} = useContext(CartContext);
  const {
    card_number,
    expiry_month,
    expiry_year,
    card_cvv,
    f_name,
    l_name,
    user_email,
    user_phone,
    user_address,
    user_city,
    user_state,
    user_zip,
    // user_country,
  } = route.params;
  // console.log(f_name);
  const {cartItems} = useContext(CartContext);
  const total = cartItems
    .reduce(
      (price, item) =>
        parseFloat(item.price * item.quantity) + parseFloat(price),
      0,
    )
    .toFixed(2);

  var stateSelection = () => {
    if (user_state == 'Alberta') {
      return 'AB';
    } else if (user_state == 'British Columbia') {
      return 'BC';
    } else if (user_state == 'Manitoba') {
      return 'MB';
    } else if (user_state == 'New Brunswick') {
      return 'NB';
    } else if (user_state == 'Newfoundland and Labrador') {
      return 'NL';
    } else if (user_state == 'Northwest Territories') {
      return 'NT';
    } else if (user_state == 'Nova Scotia') {
      return 'NS';
    } else if (user_state == 'Nunavut') {
      return 'NU';
    } else if (user_state == 'Ontario') {
      return 'ON';
    } else if (user_state == 'Prince Edward Island') {
      return 'PE';
    } else if (user_state == 'Quebec') {
      return 'QC';
    } else if (user_state == 'Saskatchewan') {
      return 'SK';
    } else if (user_state == 'Yukon') {
      return 'YT';
    } else {
      return 'NaN';
    }
  };
  var a = Math.random()
  var b = JSON.stringify(a)
  var refNum = new Date().getTime()+ b;
  // console.log(refNum)

  const PaymentPlacement = () => {
    setLoading(true);
    var province = stateSelection();
    // console.log('thfijjkl ' + province);
    const formsData = {
      merchantRefNum: refNum,
      // merchantRefNum: new Date().getTime(),
      amount: Math.round(total),
      settleWithAuth: false,
      card: {
        cardNum: card_number,
        cardExpiry: {
          month: expiry_month,
          year: 20 + expiry_year,
        },
      },
      billingDetails: {
        street: user_address,
        city: user_city,
        state: province,
        country: 'CA',
        zip: user_zip,
      },
    };
    
    // fetch(
    //   'https://api.test.paysafe.com/cardpayments/v1/accounts/1002182040/auths',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(formsData),
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Basic dGVzdF9zYW1lZXJtb2hzaW46Qi1xYTItMC02MTE2MGRmMi0wLTMwMmMwMjE0MDQzMWE4OWQ1Y2ZiY2RiYjc1MGU1ZjlmZDA0NGNmOTNiMzMwMGY5MzAyMTQ3YjkzODc3Mzk5YmJkOTA5OTkwNjBkOGE0OWE1NmUyNzUwZWFiODA1`,
    //     },
    //   },
    // )
    fetch(
      'https://api.paysafe.com/cardpayments/v1/accounts/1003030754/auths',
      {
        method: 'POST',
        body: JSON.stringify(formsData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic UE1MRSA0MTA0NzQ6Qi1wMS0wLTYwZGIzMTE2LTAtMzAyZTAyMTUwMDkyYTAwM2Q5YzU1NjNjZTEyZWZhYzI1ZDcyMjZlZDRlNGZiZDQ0NzQwMjE1MDA4MWQxNzI3NjVlZWZlZTg1OTYwNTdkZmI2NmFkNDkyMzFlYmIzNTA3`,
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // console.log(20 + total);
        // If server response message same as Data Matched
        if (responseJson.status == 'COMPLETED') {
          setLoading(false);
          // alert('Payment Done');
          OrderPlacement();
        } 
        else if (responseJson.error.message == 'The transaction was declined by our Risk Management department.') {
          Alert.alert(
            'Request Cancelled!',
            "The transaction was declined by our Risk Management department.",
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.push('Payment');
                },
              },
            ],
            {cancelable: false},
          );
        }
        else {
          // alert('Something Went Wrong');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  const OrderPlacement = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('payment_method', paymentMethod);
    formData.append('payment_method_title', paymentTitle);
    formData.append('customer_id', jwtID);
    formData.append('set_paid', true);
    formData.append('billing[first_name]', f_name);
    formData.append('billing[last_name]', l_name);
    formData.append('billing[email]', user_email);
    formData.append('billing[phone]', user_phone);
    formData.append('billing[address_1]', user_address);
    formData.append('billing[city]', user_city);
    formData.append('billing[state]', user_state);
    formData.append('billing[postcode]', user_zip);
    formData.append('billing[country]', 'Canada');
    // formData.append('shipping[first_name]', f_name);
    // formData.append('shipping[last_name]', l_name);
    // formData.append('shipping[email]', user_email);
    // formData.append('shipping[phone]', user_phone);
    // formData.append('shipping[address_1]', user_address);
    // formData.append('shipping[city]', user_city);
    // formData.append('shipping[state]', user_state);
    // formData.append('shipping[postcode]', user_zip);
    // formData.append('shipping[country]', user_country);

    cartItems.forEach((item, i) => {
      var productID = item.id;
      var productQuantity = item.quantity;
      formData.append(`line_items[${i}][product_id]`, productID);
      formData.append(`line_items[${i}][quantity]`, productQuantity);
    });
    fetch(
      'https://canacitycannabis.ca/wp-json/wc/v3/orders?consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356',
      {
        method: 'POST',
        body: formData,
        headers: {
          //Header Defination
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        // navigation.navigate('OrderPlaced');
        clearCart();
        setLoading(false);
        Alert.alert(
          'Congratulations',
          "You're Order has been placed",
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.popToTop();
              },
            },
          ],
          {cancelable: false},
        );
        // RNRestart.Restart();
        cartItems.forEach((item, i) => {
          var productID = item.id;
          var productQuantity = item.quantity;

          // console.log(productID);
          // console.log(productQuantity);
        });
        console.log(responseJson);
        // If server response message same as Data Matched
        // if (responseJson.data.status != 400) {
        //   navigation.navigate('OrderPlaced');
        // } else {
        //   alert('Something Went Wrong');
        // }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size="large"
          color="#bf1f1f"
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            elevation: 10,
          }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.main}>
          <View
            style={{
              paddingVertical: hp('1%'),
              paddingHorizontal: wp('2.5%'),
              backgroundColor: '#ffffff',
              justifyContent:'space-between',
              alignItems:'center',
              flexDirection:'row'
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: hp('3%'),
              }}>
              Checkout
            </Text>
          <TouchableOpacity
                transparent
                style={{justifyContent: 'center', paddingRight: wp('1.5%')}}
                onPress={()=> {navigation.goBack()}}
                >
                <Image
                  source={require('../../source/assets/leftangle.png')}
                  style={{
                    height: hp('4%'),
                    width: wp('4%'),
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {cartItems.map(item => (
                <View
                  key={item.id}
                  item={item}
                  style={{
                    flex: 1,
                    width: wp('100%'),
                    paddingHorizontal: wp('1%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <ScrollView> */}
                  <View
                    style={{
                      height: hp('13.5%'),
                      // height: 100,
                      width: wp('96%'),
                      elevation: 1,
                      marginVertical: hp('0.75%'),
                      borderColor: '#2d2d2d',
                      display: 'flex',
                      flexDirection: 'row',
                      borderRadius: wp('0.5%'),
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <View>
                      <TouchableOpacity activeOpacity={0.9}>
                        <Image
                          source={{uri: item.images[0].src}}
                          style={{
                            width: wp('20%'),
                            height: hp('10%'),
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        alignItems: 'flex-start',
                        width: wp('25%'),
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: hp('1.75%'),
                          fontWeight: 'bold',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: 'grey',
                          fontSize: hp('1.25%'),
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
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: wp('35%'),
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: hp('2%'),
                            fontWeight: 'bold',
                          }}>
                          Qty: {item.quantity}
                        </Text>
                      </View>
                      <View style={{marginLeft:wp('2%')}}>
                        <Text
                          style={{
                            color: '#bf1f1f',
                            fontSize: hp('2%'),
                            fontWeight: 'bold',
                          }}>
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* </ScrollView> */}
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <TouchableOpacity activeOpacity={0.6} onPress={PaymentPlacement}>
              <View style={styles.signIn}>
                <Text style={styles.signInText}>Book Order</Text>
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
                TOTAL:
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
  },
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
  starStyle: {
    // width: 50,
    // height: 10,
    width: wp('11.5%'),
    height: hp('1.3%'),
  },
});
export default CheckOut;
