import React, {useState, createRef, createContext, useContext} from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './../../components/Loader/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../constant/Color';
import bgimage from '../../source/assets/BgImage.png';
import {UserID} from '../../Navigations/App';

export const UserContext = createContext();

function LoginScreen({navigation, props}) {
  const {jwtID, jwtSetID} = useContext(UserID);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [jwtToken, jwtSetToken] = useState('');
  // console.log({id, myId});

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //Fetching Token
    fetch('https://canacitycannabis.ca/?rest_route=/login/v1/auth/', {
      method: 'POST',
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson.success === true) {
          AsyncStorage.setItem('user_token', responseJson.data.jwt);
          jwtSetToken(responseJson.data.jwt);
          fetch(
            `https://canacitycannabis.ca/?rest_route=/login/v1/auth/validate&JWT=${responseJson.data.jwt}`,
          )
            .then(response => response.json())
            .then(responseJson => {
              // console.log(responseJson);
              AsyncStorage.setItem('user_id', responseJson.data.user.ID);
              responseJson.data.user.ID && setLoading(false);
              jwtSetID(responseJson.data.user.ID);
              navigation.replace('mainNavigator');
            });
        } else {
          setLoading(false);
          alert(responseJson.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(responseJson.data.message);
        alert(responseJson.data.message);
      });
  };

  const [data, setData] = useState({
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container} animation="fadeInRight">
          <Loader loading={loading} />
          <ImageBackground source={bgimage} style={styles.Backgroundimage}>
            <View style={styles.main}>
              <View style={{paddingTop: hp('2.5%')}}>
                <Image
                  style={styles.logo}
                  source={require('../../source/assets/Canacity.png')}
                />
              </View>
              <View style={{paddingTop: hp('14.5%')}}>
                <View style={styles.text}>
                  <TextInput
                    autoCapitalize="none"
                    autoCompleteType="email"
                    placeholder="Email"
                    placeholderTextColor="white"
                    style={styles.input}
                    onChangeText={UserEmail => setUserEmail(UserEmail)}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.text}>
                  <TextInput
                    minLength={8}
                    maxLength={15}
                    secureTextEntry={data.secureTextEntry ? true : false}
                    autoCompleteType="password"
                    keyboardType="default"
                    placeholder="Password"
                    placeholderTextColor="white"
                    style={styles.input}
                    onChangeText={UserPassword => setUserPassword(UserPassword)}
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                  {errortext != '' ? (
                    <Text style={styles.errorTextStyle}>{errortext}</Text>
                  ) : null}
                  <TouchableOpacity onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ? (
                      <Image
                        source={require('../../source/assets/eyeOff.png')}
                        style={styles.iconsText}
                      />
                    ) : (
                      <Image
                        source={require('../../source/assets/eyeOn.png')}
                        style={styles.iconsText}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}>{errortext}</Text>
                ) : null}
              </View>
              <TouchableOpacity activeOpacity={0.6} onPress={handleSubmitPress}>
                <View style={styles.signIn}>
                  <Text style={styles.signInText}>Sign In</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.signinText}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('RegisterScreen')}>
                  <Text style={styles.accText}>Create an Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <Text style={styles.accText}>Forget Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconsText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('6.5%'),
    height: hp('5%'),
    tintColor: 'white',
  },
  accText: {
    color: 'white',
    fontSize: hp('1.85%'),
  },
  signinText: {
    color: 'white',
    width: '100%',
    marginTop: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('85%'),
    borderColor: '#ffffff',
    borderRadius: wp('10%'),
    height: hp('6.5%'),
    borderWidth: wp('0.5%'),
    paddingHorizontal: wp('6%'),
    marginTop: hp('3%'),
    display: 'flex',
  },
  input: {
    color: 'white',
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: hp('1.8%'),
  },
  main: {
    flex: 1,
    resizeMode: 'contain',
    display: 'flex',
    alignItems: 'center',
  },
  Backgroundimage: {
    flex: 1,
    resizeMode: 'cover',
    width: wp('100%'),
    height: hp('100%'),
  },
  logo: {
    marginTop: hp('5%'),
    width: wp('50%'),
    height: hp('20%'),
    resizeMode: 'contain',
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp('0.25%'),
    borderColor: 'white',
    backgroundColor: Color.secondary,
    marginTop: hp('3%'),
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

export default LoginScreen;
