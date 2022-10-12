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

import Order from './../screens/Order/Order';
import ListOrders from './../screens/Order/ListOrders';

// const {colors} = useTheme();

// const themes = useTheme();

const OrderStack = createStackNavigator();

const OrderScreen = ({navigation}) => (
  <OrderStack.Navigator headerMode="none">
    <OrderStack.Screen name="Order" component={Order} />
    <OrderStack.Screen name="ListOrders" component={ListOrders} />
  </OrderStack.Navigator>
);

export default OrderScreen;
