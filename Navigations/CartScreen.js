import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  Text,
  Image,
  View,
  StatusBar,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
// import {useTheme} from '@react-navigation/native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

import Cart from './../screens/Cart/Cart';
import DeliveryInfo from './../screens/Cart/DeliveryInfo';
import Payment from './../screens/Cart/Payment';
import CheckOut from './../screens/Cart/CheckOut';
// import OrderPlaced from './../screens/Cart/OrderPlaced';

// const {colors} = useTheme();

// const themes = useTheme();

const CartStack = createStackNavigator();

const CartScreen = ({navigation}) => (
  <CartStack.Navigator headerMode="none">
    <CartStack.Screen name="Cart" component={Cart} />
    <CartStack.Screen name="Payment" component={Payment} />
    <CartStack.Screen name="DeliveryInfo" component={DeliveryInfo} />
    <CartStack.Screen name="CheckOut" component={CheckOut} />
    {/* <CartStack.Screen name="OrderPlaced" component={OrderPlaced} /> */}
  </CartStack.Navigator>
);

export default CartScreen;
