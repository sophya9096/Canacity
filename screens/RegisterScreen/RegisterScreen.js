import React, {useState, createRef} from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import bgimage from '../../source/assets/BgImage.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import moment from 'moment';
// import DateTimePickerModal from 'react-native-datetimepicker-modal';
import Loader from './../../components/Loader/Loader';
import Color from '../../constant/Color';

function RegisterScreen({navigation}) {
  const [birthDate, setBirthDate] = useState(new Date());
  var month_diff = Date.now() - birthDate.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
  const [show, showModal] = useState(false);
  const toggle = () => showModal(!show);
  

  // console.log(age);

  const [data, setData] = useState({
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState(age);
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const firstnameInputRef = createRef();
  const lastnameInputRef = createRef();
  const usernameInputRef = createRef();
  const emailInputRef = createRef();

  const validateEmail = userEmail => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regex.test(String(userEmail).toLowerCase());
    return isValid;
  };

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userFirstName) {
      alert('Please enter First Name');
      return;
    }
    if (!userLastName) {
      alert('Please enter Last Name');
      return;
    }
    if (!userName) {
      alert('Please enter Name');
      return;
    }
    if (age < 19) {
      alert('You are under age');
      // console.log(age);
      return;
    }
    if (!userEmail) {
      alert('Please enter Email Address');
      return;
    }
    if (!validateEmail(userEmail)) {
      alert('Please enter valid Email');
      return;
    }

    if (!userPassword) {
      alert('Please enter Password');
      return;
    }
    //Show Loader
    setLoading(true);
    setUserAge(age);

    var dataToSend = {
      first_name: userFirstName,
      last_name: userLastName,
      username: userName,
      age: userAge,
      email: userEmail,
      password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(
      'https://canacitycannabis.ca/wp-json/wc/v3/customers?consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356',
      {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched

        if (responseJson.code === 'registration-error-username-exists') {
          setUserName('');
          // setErrortext(responseJson.message);
          alert('Username Already Exist. Please try to use another Name.');
        } else if (responseJson.code === 'registration-error-email-exists') {
          setUserEmail('');
          // setErrortext(responseJson.message);
          alert('Email Already Exist. Please try to use another Email.');
        } else {
          Alert.alert(
            'Registration Successful.',
            'Plesase Login to proceed',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.replace('LoginScreen');
                },
              },
            ],
            {cancelable: false},
          );
          setUserFirstName('');
          setUserLastName('');
          setUserName('');
          setUserEmail('');
          setUserPassword('');
          // setBirthDate('');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <Loader loading={loading} />
          <ImageBackground source={bgimage} style={styles.Backgroundimage}>
            <View style={styles.main}>
              <View style={{paddingTop: hp('2.5%')}}>
                <Image
                  style={styles.logo}
                  source={require('../../source/assets/Canacity.png')}
                />
              </View>
              <ScrollView>
                <View
                  style={{
                    paddingVertical: hp('2.5%'),
                  }}>
                  <View style={styles.texts}>
                    <TextInput
                      onChangeText={UserFirstName =>
                        setUserFirstName(UserFirstName)
                      }
                      blurOnSubmit={false}
                      returnKeyType="next"
                      placeholder="First Name"
                      keyboardType="default"
                      placeholderTextColor="white"
                      style={styles.input}
                      onSubmitEditing={() =>
                        firstnameInputRef.current &&
                        firstnameInputRef.current.focus()
                      }
                    />
                  </View>
                  <View style={styles.text}>
                    <TextInput
                      onChangeText={UserLastName =>
                        setUserLastName(UserLastName)
                      }
                      returnKeyType="next"
                      placeholder="Last Name"
                      keyboardType="default"
                      placeholderTextColor="white"
                      style={styles.input}
                      ref={firstnameInputRef}
                      onSubmitEditing={() =>
                        lastnameInputRef.current &&
                        lastnameInputRef.current.focus()
                      }
                    />
                  </View>
                  <View style={styles.text}>
                    <TextInput
                      style={styles.input}
                      onChangeText={UserName => setUserName(UserName)}
                      returnKeyType="next"
                      placeholder="Username"
                      placeholderTextColor="white"
                      ref={lastnameInputRef}
                      onSubmitEditing={() =>
                        usernameInputRef.current &&
                        usernameInputRef.current.focus()
                      }
                    />
                  </View>
                  {/* <DateTimePickerModal
                    value={birthDate}
                    onChange={(event, date) => setBirthDate(date)}
                    show={show}
                    toggle={toggle}>
                    <View style={styles.datepicker}>
                      <Text style={styles.Date}>Date of Birth</Text>
                      <View style={styles.containerProducts}>
                        <Text style={styles.Date}>
                          {birthDate
                            ? moment(birthDate).format('MMMM DD, YYYY')
                            : '-'}
                        </Text>
                      </View>
                    </View>
                  </DateTimePickerModal> */}
                  <View style={styles.text}>
                    <TextInput
                      returnKeyType="next"
                      onChangeText={UserEmail => setUserEmail(UserEmail)}
                      placeholder="Email"
                      autoCapitalize="none"
                      autoCompleteType="email"
                      placeholderTextColor="white"
                      style={styles.input}
                      ref={usernameInputRef}
                      onSubmitEditing={() =>
                        emailInputRef.current && emailInputRef.current.focus()
                      }
                    />
                  </View>
                  <View style={styles.text}>
                    <TextInput
                      minLength={8}
                      maxLength={15}
                      returnKeyType="next"
                      secureTextEntry={data.secureTextEntry ? true : false}
                      autoCompleteType="password"
                      keyboardType="default"
                      placeholder="Password"
                      placeholderTextColor="white"
                      style={styles.input}
                      onChangeText={UserPassword =>
                        setUserPassword(UserPassword)
                      }
                      ref={emailInputRef}
                    />
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
                </View>
              </ScrollView>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: hp('1.5%'),
                  marginBottom: hp('4%'),
                  // backgroundColor:'red'
                }}>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmitButton}>
                    <View style={styles.register}>
                      <Text style={styles.registerText}>Register</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.signInText}>
                  <Text
                    style={styles.accText}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    Already have an account ?
                  </Text>
                </View>
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
  datepicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    display: 'flex',
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: wp('10%'),
    paddingVertical: 14,
    width: wp('85%'),
    height: hp('6.5%'),
    paddingHorizontal: wp('6%'),
    backgroundColor: 'transparent',
    borderColor: 'white',
    marginTop: hp('3%'),
    borderWidth: wp('0.5%'),
  },
  Date: {
    color: 'white',
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
    textAlign: 'center',
  },
  signInText: {
    marginTop: hp('2%'),
    color: 'white',
    width: '100%',
  },
  texts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    borderRadius: wp('10%'),
    width: wp('85%'),
    height: hp('6.5%'),
    paddingHorizontal: wp('6%'),
    borderWidth: wp('0.5%'),
    display: 'flex',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    borderRadius: wp('10%'),
    width: wp('85%'),
    height: hp('6.5%'),
    paddingHorizontal: wp('6%'),
    borderWidth: wp('0.5%'),
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
    resizeMode: 'contain',
    width: wp('100%'),
    height: hp('100%'),
    // marginTop:-47
  },
  logo: {
    marginTop: hp('5%'),
    width: wp('50%'),
    height: hp('20%'),
    resizeMode: 'contain',
  },
  register: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp('0.25%'),
    borderColor: 'white',
    backgroundColor: Color.secondary,
    borderRadius: wp('10%'),
    width: wp('45%'),
    height: hp('5%'),
  },
  registerText: {
    marginRight: 'auto',
    marginLeft: 'auto',
    color: 'white',
    fontSize: hp('1.8%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
