import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Button,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import Color from '../../constant/Color';
import bgimage from '../../source/assets/BgImage.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function ForgetPassword({navigation}) {
  const [userEmail, setUserEmail] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setNewPassword = () => {
    setErrortext('');
    if (!userEmail) {
      Alert.alert('Warning!', 'Please Enter Email to Reset Password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //Fetching Token
    fetch('https://canacitycannabis.ca/wp-json/bdpwr/v1/reset-password', {
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
        if (responseJson.data.status === 200) {
          Alert.alert(
            'Password Reset Succesfully!',
            'A password reset email has been sent to your email address.',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.replace('ActivationScreen', {email: userEmail});
                },
              },
            ],
            {cancelable: false},
          );
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

  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ImageBackground source={bgimage} style={styles.Backgroundimage}>
          <View style={styles.main}>
            <View style={{paddingTop: hp('2.5%')}}>
              <Image
                style={styles.logo}
                source={require('../../source/assets/Canacity.png')}
              />
            </View>
            <View style={{paddingTop: hp('19.5%')}}>
              <View style={{marginBottom: hp('1%')}}>
                <Text style={styles.forgetText}>
                  Enter your email to Reset Password
                </Text>
              </View>
              <View style={styles.text}>
                <TextInput
                  placeholder="Email"
                  autoCompleteType="email"
                  keyboardType="default"
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  style={styles.input}
                  onChangeText={userEmail => setUserEmail(userEmail)}
                />
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={setNewPassword}>
              <View style={styles.forgetPassword}>
                <Text style={styles.forgetPasswordText}>Reset Password</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.signInText}>
              <Text
                style={styles.accText}
                onPress={() => navigation.navigate('LoginScreen')}>
                Remember Password? Go to Login
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accText: {
    color: 'white',
    marginTop: hp('2%'),
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
    borderWidth: wp('0.5'),
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
  forgetPassword: {
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
  forgetPasswordText: {
    marginRight: 'auto',
    marginLeft: 'auto',
    color: 'white',
    fontSize: hp('1.8%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgetText: {
    marginRight: 'auto',
    marginLeft: 'auto',
    color: 'white',
    fontSize: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForgetPassword;
