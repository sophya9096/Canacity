import React, {useState, useContext, useEffect} from 'react';
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
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Color from './../../constant/Color';
import {UserID} from './../../Navigations/App';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Order = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const {jwtID, jwtSetID} = useContext(UserID);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const order = await fetch(
        `https://canacitycannabis.ca/wp-json/wc/v3/orders?customer=${jwtID}&consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356`,
      );
      const getOrder = await order.json();
      setOrders(getOrder);
      setLoading(false);
      // console.log(order);
    };
    fetchData();
  }, []);

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
          {orders.length === 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: hp('3%'),
                  fontWeight: 'bold',
                }}>
                Order Empty
              </Text>
            </View>
          ) : (
            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingVertical: hp('1%'),
                  paddingHorizontal: wp('2.5% '),
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: hp('3%'),
                  }}>
                  Previous Orders
                </Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {orders?.map((blog, index) => (
                  <View
                    key={index}
                    style={{
                      width: wp('100%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: wp('95%'),
                        borderColor: '#2d2d2d',
                        borderWidth: wp('0.25%'),
                        marginVertical: hp('1%'),
                        marginHorizontal: wp('1%'),
                        paddingHorizontal: wp('3%'),
                        paddingVertical: hp('2%'),
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        // onPress={() => {
                        //  navigation.navigate('ListOrders');
                        // }}
                      >
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginVertical: hp('0.5%'),
                          }}>
                          <Text
                            style={{
                              color: '#bf1f1f',
                              fontSize: hp('2%'),
                              fontWeight: 'bold',
                            }}>
                            Order ID: {blog?.id}
                          </Text>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: hp('2%'),
                              }}>
                              Date:
                            </Text>
                            <Text> </Text>
                            <Text
                              style={{
                                textTransform: 'capitalize',
                                color: '#2d2d2d',
                                fontSize: hp('2%'),
                                fontWeight: 'bold',
                              }}>
                              {blog?.date_created.split('T')[0]}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: hp('2%'),
                              }}>
                              Method:
                            </Text>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: hp('2%'),
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                              }}>
                              {blog?.payment_method}
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: hp('2%'),
                                fontWeight: 'bold',
                              }}>
                              Total:
                            </Text>
                            <Text> </Text>
                            <Text
                              style={{
                                color: '#bf1f1f',
                                fontSize: hp('2%'),
                                fontWeight: 'bold',
                              }}>
                              ${blog?.total}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate('ProductsDisplay');
                }}>
                <View style={styles.signIn}>
                  <Text style={styles.signInText}>Order More</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
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
    width: '100%',
    flex: 1,
    resizeMode: 'contain',
    display: 'flex',
    alignItems: 'center',
  },
  // signIn: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: 'auto',
  //   marginLeft: 'auto',
  //   borderWidth: 1,
  //   borderColor: 'white',
  //   backgroundColor: Color.secondary,
  //   marginVertical: 20,
  //   borderRadius: 30,
  //   width: 180,
  //   height: 40,
  // },
  // signInText: {
  //   marginRight: 'auto',
  //   marginLeft: 'auto',
  //   color: 'white',
  //   fontSize: 14,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  signIn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp('0.25%'),
    borderColor: 'white',
    backgroundColor: Color.secondary,
    marginVertical: hp('1.25%'),
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
});
export default Order;
