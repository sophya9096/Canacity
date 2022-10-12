import React, {useState, useEffect, createContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import InternetConnectionAlert from "react-native-internet-connection-alert";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NavigationContainer,
  useTheme,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import SplashScreen from './../screens/SplashScreen/SplashScreen';
import RootStackScreen from '../screens/RootStackScreen/RootStackScreen';
import MainTabScreen from './MainTabScreen';
import DrawerContent from './DrawerContent';
import CartState from '../screens/Context/Cart/CartState';

export const UserID = createContext();

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [jwtID, jwtSetID] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('user_id').then(value => jwtSetID(value));
  }, []);
  console.log(jwtID);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const themes = useTheme();

  const theme = darkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const mainNavigator = () => {
    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
      </Drawer.Navigator>
    );
  };

  return (
    <InternetConnectionAlert
  onChange={(connectionState) => {
    // console.log("Connection State: ", connectionState);
  }}>
    <PaperProvider theme={theme}>
      <UserID.Provider value={{jwtID, jwtSetID}}>
        <CartState>
          <NavigationContainer theme={theme}>
            <StatusBar
              barStyle={themes.dark ? 'dark-content' : 'light-content'}
            />
            <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen
                name="RootStackScreen"
                component={RootStackScreen}
              />
              <Stack.Screen name="mainNavigator" component={mainNavigator} />
            </Stack.Navigator>
            <FlashMessage position="top" />
          </NavigationContainer>
        </CartState>
      </UserID.Provider>
    </PaperProvider>
  {/* {... Your whole application should be here ... } */}
</InternetConnectionAlert>
  );
};

export default App;
