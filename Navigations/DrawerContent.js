import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, StyleSheet, Alert, Dimensions} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  useTheme,
  Drawer,
  Switch,
  TouchableRipple,
  ToggleButton,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {DrawerActions} from '@react-navigation/native';
import {UserID} from './App';

import {Header, Left, Right, Button} from 'native-base';
import {set} from 'react-native-reanimated';
import {fonts} from 'react-native-elements/dist/config';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

function DrawerContent({navigation, props}) {
  const {jwtID, jwtSetID} = useContext(UserID);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(
        `https://canacitycannabis.ca/wp-json/wc/v3/customers/${jwtID}?consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356`,
      );
      const newData = await data.json();
      setUserInfo(newData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // console.log(`width: ${WIDTH}`)
  // console.log(`height: ${HEIGHT}`)

  const paperTheme = useTheme();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#2d2d2d',
          height: hp('15%'),
        }}>
        {Platform.OS === 'android' ? (
        <View style={{marginTop:('1.25%')}}>
          <Image
            source={require('../source/assets/Canacity3.png')}
            style={{
              height: hp('15%'),
              width: wp('38%'),
              resizeMode: 'contain',
            }}
          />
        </View>
          ):(
        <View style={{marginTop: hp('1.25%')}}>
          <Image
            source={require('../source/assets/Canacity3.png')}
            style={{
              height: hp('15%'),
              width: wp('38%'),
              resizeMode: 'contain',
            }}
          />
        </View>
          )}
          {Platform.OS === 'android' ? (
        <View style={{marginTop: hp('9.5%'), marginRight: wp('3.5%')}}>
          <Button
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 0,
              elevation: 0,
            }}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <Image
              style={{height: hp('5%'), width: wp('9%'), resizeMode:'contain'}}
              source={require('../source/assets/navIcon.png')}
            />
          </Button>
        </View>
          ):(
        <View style={{marginTop: hp('10%'), marginRight: wp('3.5%')}}>
          <Button
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 0,
              elevation: 0,
            }}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <Image
              style={{height: hp('5%'), width: wp('9%'), resizeMode:'contain'}}
              source={require('../source/assets/navIcon.png')}
            />
          </Button>
        </View>
          )}
      </View>
      <DrawerContentScrollView>
        <View style={styles.drawerContainer}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('2%'),
              }}>
              <Avatar.Image source={{uri: userInfo.avatar_url}} size={70} />
              <View
                style={{
                  marginLeft: wp('2%'),
                  marginTop: hp('1%'),
                  flexDirection: 'column',
                }}>
                <Title style={styles.title}>{userInfo.username}</Title>
                <Caption style={styles.caption}>{userInfo.email}</Caption>
              </View>
            </View>
            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraph, styles.caption)}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraph, styles.caption)}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}
          </View>
          <Drawer.Section style={styles.drawerContainer}>
            <DrawerItem
              icon={({focused}) => (
                <View>
                  <Image
                    source={require('../source/assets/home11.png')}
                    resizeMode="contain"
                    style={{
                      width: wp('12%'),
                      height: hp('6%'),
                      tintColor: focused ? '#bf1f1f' : '#2d2d2d',
                    }}
                  />
                </View>
              )}
              label="Home"
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <View>
                  <Image
                    source={require('../source/assets/trolley11.png')}
                    resizeMode="contain"
                    style={{
                      width: wp('12%'),
                      height: hp('6%'),
                      tintColor: focused ? '#bf1f1f' : '#2d2d2d',
                    }}
                  />
                </View>
              )}
              label="Cart"
              onPress={() => {
                navigation.navigate('Cart');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <View>
                  <Image
                    source={require('../source/assets/sent11.png')}
                    resizeMode="contain"
                    style={{
                      width: wp('12%'),
                      height: hp('6%'),
                      tintColor: focused ? '#bf1f1f' : '#2d2d2d',
                    }}
                  />
                </View>
              )}
              label="Order"
              onPress={() => {
                navigation.navigate('Orders');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <View>
                  <Image
                    source={require('../source/assets/user11.png')}
                    resizeMode="contain"
                    style={{
                      width: wp('12%'),
                      height: hp('6%'),
                      tintColor: focused ? '#bf1f1f' : '#2d2d2d',
                    }}
                  />
                </View>
              )}
              label="Profile"
              onPress={() => {
                navigation.navigate('Profile');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => {}}>
              <View style={styles.preference}>
                <Text style={{fontSize: hp('2%')}}>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch
                    trackColor={{false: '#2d2d2d', true: '#bf1f1f'}}
                    thumbColor={paperTheme.dark ? '#bf1f1f' : '#ffffff'}
                    ios_backgroundColor="#3e3e3e"
                    value={paperTheme.dark}
                  />
                </View>
              </View>
              MlvT8zq0
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({focused}) => (
            <View>
              <Image
                source={require('../source/assets/SignOut.png')}
                resizeMode="contain"
                style={{
                  width: wp('10%'),
                  height: hp('5%'),
                  tintColor: focused ? '#bf1f1f' : '#2d2d2d',
                }}
              />
            </View>
          )}
          label="Sign Out"
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                  style:'cancel',
                },
                {
                  text: 'Confirm',
                  
                  onPress: () => {
                    AsyncStorage.clear();
                    navigation.replace('RootStackScreen');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    marginTop: hp('0.5%'),
  },
  userInfoSection: {
    paddingLeft: wp('4%'),
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    width: wp('90%'),
  },
  caption: {
    fontSize: hp('1.5%'),
    width: wp('50%'),
    marginBottom: hp('1%'),
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    // width: wp('71.25%'),
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
