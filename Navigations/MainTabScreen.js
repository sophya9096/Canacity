import React, {useContext, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import OrderScreen from './OrderScreen';
import ProfileScreen from './ProfileScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  useColorScheme,
  View,
  Platform
} from 'react-native';

// import IconBadge from 'react-native-icon-badge';
import CartContext from '../screens/Context/Cart/CartContext';
const Total = () => {
  const {cartItems} = useContext(CartContext);
  return (
    <Text
      style={{
        color: '#ffffff',
        fontSize: hp('1.25%'),
        fontWeight: 'bold',
      }}>
      {cartItems.length}
    </Text>
  );
};

const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const OrderStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      keyboardHidesTabBar: true,
      style: {
        postion: 'absolute',
        left: 0,
        right: 0,
        elevation: 0,
        height: hp('10%'),
        backgroundColor: '#ffffff',
        ...styles.shadow,
      },
    }}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({focused}) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: '10%',
            }}>
            <Image
              source={require('../source/assets/home11.png')}
              resizeMode="contain"
              style={{
                width: wp('15%'),
                height: hp('15%'),
                tintColor: focused ? '#bf1f1f' : '#2d2d2d',
              }}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartStackScreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({focused}) => (
          // <IconBadge
          //   MainElement={
          //     <View
          //       style={{
          //         alignItems: 'center',
          //         justifyContent: 'center',
          //         top: '10%',
          //       }}>
          //       <Image
          //         source={require('../source/assets/trolley11.png')}
          //         resizeMode="contain"
          //         style={{
          //           width: 50,
          //           height: 50,
          //           tintColor: focused ? '#bf1f1f' : '#2d2d2d',
          //         }}
          //       />
          //     </View>
          //   }
          //   BadgeElement={
          //     // <Text style={{color: '#ffffff', fontSize: 10}}>10</Text>
          //     <Total />
          //   }
          //   IconBadgeStyle={{width: 22, height: 22, backgroundColor: '#bf1f1f'}}
          //   Hidden={0}
          // />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: '10%',
            }}>
            <Image
              source={require('../source/assets/trolley11.png')}
              resizeMode="contain"
              style={{
                width: wp('15%'),
                height: hp('15%'),
                tintColor: focused ? '#bf1f1f' : '#2d2d2d',
              }}
            />
          </View>
        ),
        tabBarBadge: <Total />,
        tabBarBadgeStyle: {
          backgroundColor: '#bf1f1f',
          textAlign:'center',
        },
      }}
    />
    <Tab.Screen
      name="Orders"
      component={OrderStackScreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({focused}) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: '10%',
            }}>
            <Image
              source={require('../source/assets/sent11.png')}
              resizeMode="contain"
              style={{
                width: wp('15%'),
                height: hp('15%'),
                tintColor: focused ? '#bf1f1f' : '#2d2d2d',
              }}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({focused}) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: '10%',
            }}>
            <Image
              source={require('../source/assets/user11.png')}
              resizeMode="contain"
              style={{
                width: wp('15%'),
                height: hp('15%'),
                tintColor: focused ? '#bf1f1f' : '#2d2d2d',
              }}
            />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#bf1f1f',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    initialRouteName="HOME"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2d2d2d',
        height: hp('15%'),
      },
    }}>
    <HomeStack.Screen
      name="HOME"
      component={HomeScreen}
      options={{
        title: '',
        headerLeft: () => (
          <View>
          {Platform.OS === 'android' ? (
          <Image
          source={require('../source/assets/Canacity3.png')}
          style={{height: hp('15%'), width: wp('40%'), resizeMode: 'contain'}}
          />
            ) : (
          <Image
          source={require('../source/assets/Canacity3.png')}
          style={{height: hp('12%'), width: wp('28%'), resizeMode: 'contain'}}
          />
          )} 
          </View>
        ),
        headerRight: () => (
          <View>
            {Platform.OS === 'android' ? (
              <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('10%'),
            }}>
            <Text style={{color: '#ffffff', marginTop: hp('0.25%')}}>
              HOME
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../source/assets/navIcon.png')}
                style={{
                  height: hp('4%'),
                  width: wp('10%'),
                  resizeMode: 'contain',
                  marginRight: wp('2%'),
                  marginLeft: wp('0.5%'),
                }}
              />
            </TouchableOpacity>
          </View>
            ) : (
      <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('5.5%'),
            }}>
            <Text style={{color: '#ffffff', marginTop: hp('0.25%')}}>
              HOME
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../source/assets/navIcon.png')}
                style={{
                  height: hp('4%'),
                  width: wp('10%'),
                  resizeMode: 'contain',
                  marginRight: wp('2%'),
                  marginLeft: wp('0.5%'),
                }}
              />
            </TouchableOpacity>
          </View>
          )} 
          </View>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const CartStackScreen = ({navigation}) => (
  <CartStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2d2d2d',
        height: hp('15%'),
      },
    }}>
    <CartStack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        title: '',
        headerLeft: () => (
          <View>
          {Platform.OS === 'android' ? (
          <Image
          source={require('../source/assets/Canacity3.png')}
          style={{height: hp('15%'), width: wp('40%'), resizeMode: 'contain'}}
          />
            ) : (
          <Image
          source={require('../source/assets/Canacity3.png')}
          style={{height: hp('12%'), width: wp('28%'), resizeMode: 'contain'}}
          />
          )} 
          </View>
        ),
        headerRight: () => (
          <View>
            {Platform.OS === 'android' ? (
              <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('10%'),
            }}>
            <Text style={{color: '#ffffff', marginTop: hp('0.25%')}}>
              CART
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../source/assets/navIcon.png')}
                style={{
                  height: hp('4%'),
                  width: wp('10%'),
                  resizeMode: 'contain',
                  marginRight: wp('2%'),
                  marginLeft: wp('0.5%'),
                }}
              />
            </TouchableOpacity>
          </View>
            ) : (
      <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('5.5%'),
            }}>
            <Text style={{color: '#ffffff', marginTop: hp('0.25%')}}>
              CART
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../source/assets/navIcon.png')}
                style={{
                  height: hp('4%'),
                  width: wp('10%'),
                  resizeMode: 'contain',
                  marginRight: wp('2%'),
                  marginLeft: wp('0.5%'),
                }}
              />
            </TouchableOpacity>
          </View>
          )} 
          </View>
        ),
      }}
    />
  </CartStack.Navigator>
);
const OrderStackScreen = ({navigation}) => (
  <OrderStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2d2d2d',
        height: hp('15%'),
      },
    }}>
    <OrderStack.Screen
      name="Order"
      component={OrderScreen}
      options={{
        title: '',
        headerLeft: () => (
          <View>
          {Platform.OS === 'android' ? (
          <Image
          source={require('../source/assets/Canacity3.png')}
          style={{height: hp('15%'), width: wp('40%'), resizeMode: 'contain'}}
          />
            ) : (
          <Image
          source={require('../source/assets/Canacity3.png')}
          style={{height: hp('12%'), width: wp('28%'), resizeMode: 'contain'}}
          />
          )} 
          </View>
        ),
        headerRight: () => (
          <View>
            {Platform.OS === 'android' ? (
              <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('10%'),
            }}>
            <Text style={{color: '#ffffff', marginTop: hp('0.25%')}}>
              ORDERS
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../source/assets/navIcon.png')}
                style={{
                  height: hp('4%'),
                  width: wp('10%'),
                  resizeMode: 'contain',
                  marginRight: wp('2%'),
                  marginLeft: wp('0.5%'),
                }}
              />
            </TouchableOpacity>
          </View>
            ) : (
      <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('5.5%'),
            }}>
            <Text style={{color: '#ffffff', marginTop: hp('0.25%')}}>
              ORDERS
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../source/assets/navIcon.png')}
                style={{
                  height: hp('4%'),
                  width: wp('10%'),
                  resizeMode: 'contain',
                  marginRight: wp('2%'),
                  marginLeft: wp('0.5%'),
                }}
              />
            </TouchableOpacity>
          </View>
          )} 
          </View>
        ),
      }}
    />
  </OrderStack.Navigator>
);
const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2d2d2d',
        height: hp('15%'),
      },
    }}>
    <ProfileStack.Screen
      name="PROFILE"
      component={ProfileScreen}
      options={{
        title: '',
        headerLeft: () => (
          <View>
          {Platform.OS === 'android' ? (
          <Image
          source={require('../source/assets/Canacity3.png')}
          style={{height: hp('15%'), width: wp('40%'), resizeMode: 'contain'}}
          />
            ) : (
          <Image
          source={require('../source/assets/Canacity3.png')}
          style={{height: hp('12%'), width: wp('28%'), resizeMode: 'contain'}}
          />
          )} 
          </View>
        ),
        headerRight: () => (
          <View>
            {Platform.OS === 'android' ? (
              <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('10%'),
            }}>
            <Text style={{color: '#ffffff', marginTop: hp('0.25%')}}>
              PROFILE
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../source/assets/navIcon.png')}
                style={{
                  height: hp('4%'),
                  width: wp('10%'),
                  resizeMode: 'contain',
                  marginRight: wp('2%'),
                  marginLeft: wp('0.5%'),
                }}
              />
            </TouchableOpacity>
          </View>
            ) : (
      <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('5.5%'),
            }}>
            <Text style={{color: '#ffffff', marginTop: hp('0.25%')}}>
              PROFILE
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../source/assets/navIcon.png')}
                style={{
                  height: hp('4%'),
                  width: wp('10%'),
                  resizeMode: 'contain',
                  marginRight: wp('2%'),
                  marginLeft: wp('0.5%'),
                }}
              />
            </TouchableOpacity>
          </View>
          )} 
          </View>
        ),
      }}
    />
  </ProfileStack.Navigator>
);
