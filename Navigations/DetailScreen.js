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

const CartScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Cart Screen</Text>
      <Button
        title="Go to HomeScreen"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CartScreen;
