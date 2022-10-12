import React, {useState, useEffect, useContext, createRef} from 'react';
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
  Modal,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Color from './../../constant/Color';
import {ModalPicker} from './ModalPicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UserID} from '../../Navigations/App';

const DeliveryInfo = ({navigation, route}) => {
  const {cNum, cMonth, cYear, cCV} = route.params;
  const {jwtID, jwtSetID} = useContext(UserID);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const lastnameInputRef = createRef();
  const emailInputRef = createRef();
  const phoneInputRef = createRef();
  const addressInputRef = createRef();
  const cityInputRef = createRef();
  const stateInputRef = createRef();
  const zipInputRef = createRef();
  const countryInputRef = createRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [chooseData, setChooseData] = useState('State');

  const changeModalVisibility = bool => {
    setModalVisible(bool);
  };

  const setData2 = option => {
    setChooseData(option);
  };

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

  const validateEmail = userEmail => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regex.test(String(data.email).toLowerCase());
    return isValid;
  };

  const bookingDetails = () => {
    if (!data.first_name) {
      alert('Please enter First Name');
      return;
    }
    if (!data.last_name) {
      alert('Please enter Last Name');
      return;
    }
    if (!data.email) {
      alert('Please enter Email');
      return;
    }
    if (!validateEmail(data.email)) {
      alert('Please enter valid Email Address');
      return;
    }
    if (!data.phone) {
      alert('Please enter Phone Number');
      // console.log(age);
      return;
    }
    if (!data.address) {
      alert('Please enter Address');
      // console.log(age);
      return;
    }
    if (!data.city) {
      alert('Please enter City');
      // console.log(age);
      return;
    }
    if (chooseData === 'State') {
      alert('Please select State');
      // console.log(age);
      return;
    }
    if (!data.ZIP) {
      alert('Please enter ZIP Code');
      // console.log(age);
      return;
    }
    navigation.navigate('CheckOut', {
      card_number: cNum,
      expiry_month: cMonth,
      expiry_year: cYear,
      card_cvv: cCV,
      f_name: data.first_name,
      l_name: data.last_name,
      user_email: data.email,
      user_phone: data.phone,
      user_address: data.address,
      user_city: data.city,
      user_state: chooseData,
      user_zip: data.ZIP,
      // user_country: data.country,
    });
  };

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    ZIP: '',
    country: '',
    checkInput: false,
    secureTextEntry: true,
    isvalidUser: true,
    isvalidPassword: true,
  });
  const inputFirstNameChange = valFirstName => {
    setData({
      ...data,
      first_name: valFirstName,
    });
  };
  const inputLastNameChange = valLastName => {
    setData({
      ...data,
      last_name: valLastName,
    });
  };
  const inputEmailChange = valEmail => {
    setData({
      ...data,
      email: valEmail,
    });
  };
  const inputPhoneChange = valPhone => {
    setData({
      ...data,
      phone: valPhone,
    });
  };
  const inputAddressChange = valAddress => {
    setData({
      ...data,
      address: valAddress,
    });
  };
  const inputCityChange = valCity => {
    setData({
      ...data,
      city: valCity,
    });
  };
  const inputStateChange = valState => {
    setData({
      ...data,
      state: valState,
    });
  };
  const inputZIPChange = valZIP => {
    setData({
      ...data,
      ZIP: valZIP,
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
        <View style={{flex: 1}}>
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
              Delivery Info
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
          <View style={styles.main}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{paddingVertical: hp('0%'), marginHorizontal: wp('1%')}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.texts}>
                    <TextInput
                      placeholder="First Name"
                      autoCompleteType="name"
                      keyboardType="default"
                      placeholderTextColor="black"
                      style={styles.input}
                      onChangeText={valFirstName =>
                        inputFirstNameChange(valFirstName)
                      }
                      onSubmitEditing={() =>
                        lastnameInputRef.current &&
                        lastnameInputRef.current.focus()
                      }
                    />
                  </View>
                  <View style={styles.texts}>
                    <TextInput
                      placeholder="Last Name"
                      autoCompleteType="name"
                      keyboardType="default"
                      placeholderTextColor="black"
                      style={styles.input}
                      onChangeText={valLastName =>
                        inputLastNameChange(valLastName)
                      }
                      ref={lastnameInputRef}
                      onSubmitEditing={() =>
                        emailInputRef.current && emailInputRef.current.focus()
                      }
                    />
                  </View>
                </View>
                <View style={styles.text}>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Email Address"
                    autoCompleteType="email"
                    keyboardType="default"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={valEmail => inputEmailChange(valEmail)}
                    ref={emailInputRef}
                    onSubmitEditing={() =>
                      phoneInputRef.current && phoneInputRef.current.focus()
                    }
                  />
                </View>
                <View style={styles.text}>
                  <TextInput
                    placeholder="Phone"
                    autoCompleteType="tel"
                    keyboardType="numeric"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={valPhone => inputPhoneChange(valPhone)}
                    ref={phoneInputRef}
                    onSubmitEditing={() =>
                      addressInputRef.current && addressInputRef.current.focus()
                    }
                  />
                </View>
                <View style={styles.text}>
                  <TextInput
                    placeholder="Address"
                    autoCompleteType="street-address"
                    keyboardType="name-phone-pad"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={valAddress => inputAddressChange(valAddress)}
                    ref={addressInputRef}
                    onSubmitEditing={() =>
                      cityInputRef.current && cityInputRef.current.focus()
                    }
                  />
                </View>
                <View style={styles.text}>
                  <TextInput
                    placeholder="City"
                    autoCompleteType="name"
                    keyboardType="default"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={valCity => inputCityChange(valCity)}
                    ref={cityInputRef}
                    onSubmitEditing={() =>
                      stateInputRef.current && stateInputRef.current.focus()
                    }
                  />
                </View>
                <View style={styles.text}>
                  <TouchableOpacity onPress={() => changeModalVisibility(true)}>
                    <Text style={styles.texted}>{chooseData}</Text>
                  </TouchableOpacity>
                  <Modal
                    transparent={true}
                    animationType="fade"
                    visible={modalVisible}
                    nRequestClose={() => changeModalVisibility(false)}>
                    <ModalPicker
                      changeModalVisibility={changeModalVisibility}
                      setData2={setData2}
                    />
                  </Modal>
                </View>
                <View style={styles.text}>
                  <TextInput
                    placeholder="ZIP"
                    autoCompleteType="postal-code"
                    keyboardType="default"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={valZIP => inputZIPChange(valZIP)}
                    ref={zipInputRef}
                    onSubmitEditing={() =>
                      countryInputRef.current && countryInputRef.current.focus()
                    }
                  />
                </View>
              </View>
              <ScrollView></ScrollView>
              <TouchableOpacity activeOpacity={0.6} onPress={bookingDetails}>
                <View style={styles.signIn}>
                  <Text style={styles.signInText}>Confirm Address</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
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
  text: {
    borderColor: '#2d2d2d',
    borderRadius: wp('0.5%'),
    marginTop: hp('1.6%'),
    width: wp('90%'),
    height: hp('6%'),
    backgroundColor: 'transparent',
    borderWidth: wp('0.3%'),
  },
  texted: {
    borderColor: '#2d2d2d',
    borderRadius: wp('0.5%'),
    marginTop: hp('1.6%'),
    width: wp('90%'),
    height: hp('6%'),
    backgroundColor: 'transparent',
    // borderWidth: wp('0.3%'),
    color: '#2d2d2d',
    paddingHorizontal: wp('3%'),
  },
  texts: {
    borderColor: '#2d2d2d',
    borderRadius: wp('0.5%'),
    marginTop: hp('1.6%'),
    width: wp('42%'),
    height: hp('6%'),
    backgroundColor: 'transparent',
    borderWidth: wp('0.3%'),
  },
  input: {
    color: '#2d2d2d',
    paddingHorizontal: wp('3%'),
    flex: 1,
  },
  main: {
    flex: 1,
    resizeMode: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
  },
  Backgroundimage: {
    flex: 1,
    resizeMode: 'cover',
  },
  logo: {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp('0.25%'),
    borderColor: 'white',
    backgroundColor: Color.secondary,
    marginTop: hp('9.75%'),
    marginBottom: hp('1%'),
    borderRadius: wp('10%'),
    width: wp('50%'),
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
});
export default DeliveryInfo;
