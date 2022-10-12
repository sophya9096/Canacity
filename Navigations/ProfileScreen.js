import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  useColorScheme,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {Container, Text, Content, Body} from 'native-base';

import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserID} from '../Navigations/App';
import CartContext from '../screens/Context/Cart/CartContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProfileScreen = ({navigation}) => {
  const {cartItems} = useContext(CartContext);
  const {jwtID, jwtSetID} = useContext(UserID);
  const [text, onChangeText] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(
        `https://canacitycannabis.ca/wp-json/wc/v3/customers/${jwtID}?consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356`,
      );
      const newData = await data.json();
      setUserInfo(newData);
      setLoading(false);
      // console.log(route.params.userid);
    };
    fetchData();
  }, []);

  // console.log({myId});

  return (
    <Container
      contentContainerStyle={{
        display: 'flex',
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animatable.View
        animation="slideInDown"
        style={{
          backgroundColor: '#2d2d2d',
          paddingHorizontal: wp('1%'),
          height: hp('30%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Content>
            <View style={{
              justifyContent:'center',
              alignItems:'center',
              marginTop: hp('1%'),
              marginBottom: hp('0%'),
              }}
              >
            <View>
            <Image
              style={{
                height: hp('20%'),
                width: wp('25%'),
                // borderRadius: 180,
                resizeMode:'contain'
              }}
              source={{uri: userInfo.avatar_url}}
              resizeMode="contain"
              />
              </View>
          <View>
            <Text
              style={{
                fontSize: hp('2.5%'),
                color: 'white',
                textTransform: 'capitalize',
              }}>
              {userInfo.username}
            </Text>
          </View>
          </View>
        </Content>
      </Animatable.View>
      <ScrollView>
        <View
          style={{
            marginVertical: hp('2%'),
            height: hp('35%'),
            // backgroundColor: 'red',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderBottomColor: 'lightgrey',
              borderBottomWidth: hp('0.1%'),
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.register}
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.registerText}>My Cart</Text>
              {/* <Text style={styles.registerIcon}>{cartItems.length}</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.register}
            onPress={() => {
              navigation.navigate('Orders');
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.registerText}>My Orders</Text>
              {/* <Text style={styles.registerIcon}>0</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.register}
            onPress={() => {
              Alert.alert(
                'Signout',
                'Are you sure? You want to Signout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      return null;
                    },
                    style:'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      AsyncStorage.clear();
                      navigation.replace('RootStackScreen');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.registerText}>Sign Out</Text>
              <Image
                source={require('../source/assets/SignOut.png')}
                resizeMode="contain"
                style={{
                  width: wp('10%'),
                  height: hp('10%'),
                  tintColor: '#bf1f1f',
                  marginRight: '5%',
                }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'lightgrey',
              borderBottomWidth: hp('0.1%'),
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  register: {
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderTopWidth: hp('0.1%'),
    borderBottomWidth: hp('0.1%'),
    width: wp('100%'),
    // height: 70,
    height: hp('8.5%'),
  },
  registerText: {
    marginLeft: wp('6%'),
    color: '#2d2d2d',
    fontSize: hp('2.35%'),
  },
  registerIcon: {
    marginRight: wp('6%'),
    color: '#ffffff',
    fontSize: hp('2.85%'),
    backgroundColor: '#bf1f1f',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
