import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const stateVal = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = props => {
  const onPressItem = option => {
    props.changeModalVisibility(false);
    props.setData2(option);
  };

  const option = stateVal.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.optioned}
        key={index}
        onPress={() => onPressItem(item)}>
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.changeModalVisibility(false)}>
      <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT / 2}]}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: wp('1%'),
  },
  optioned: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    borderColor: '#2d2d2d',
    borderRadius: wp('0.5%'),
    borderWidth: wp('0.1%'),
    color: '#2d2d2d',
    paddingHorizontal: wp('1%'),
    paddingVertical: wp('0.001%'),
  },
  text: {
    marginVertical: hp('1%'),
    marginHorizontal: hp('1%'),
    fontSize: hp('1.6%'),
    // fontWeight: 'bold',
  },
});

export {ModalPicker};
