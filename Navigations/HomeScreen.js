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

import Review from '../screens/Home/Review';
import ProductsDisplay from '../screens/Home/ProductsDisplay';
import Product from '../screens/Home/Product';
import AllCategoryProducts from '../screens/Home/AllCategoryProducts';
import Category1 from '../screens/Home/Category1';
import Category2 from '../screens/Home/Category2';
import Category3 from '../screens/Home/Category3';
import Category4 from '../screens/Home/Category4';
import SearchBar from '../screens/Home/SearchBar';
import {screensEnabled} from 'react-native-screens';

// const {colors} = useTheme();

// const themes = useTheme();

const HomeStack = createStackNavigator();

const HomeScreen = ({navigation}) => (
  <HomeStack.Navigator initialRouteName="ProductsDisplay" headerMode="none">
    <HomeStack.Screen name="ProductsDisplay" component={ProductsDisplay} />
    <HomeStack.Screen name="Product" component={Product} />
    <HomeStack.Screen name="SearchBar" component={SearchBar} />
    <HomeStack.Screen
      name="AllCategoryProducts"
      component={AllCategoryProducts}
    />
    <HomeStack.Screen name="Review" component={Review} />
    <HomeStack.Screen name="Category1" component={Category1} />
    <HomeStack.Screen name="Category2" component={Category2} />
    <HomeStack.Screen name="Category3" component={Category3} />
    <HomeStack.Screen name="Category4" component={Category4} />
  </HomeStack.Navigator>
);

export default HomeScreen;
