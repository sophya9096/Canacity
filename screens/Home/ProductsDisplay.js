import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  TextInput,
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';

import Star from 'react-native-star-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Icon,
  Container,
  Header,
  Footer,
  Title,
  Button,
  Content,
  Item,
  Right,
  Left,
  ListItem,
  Thumbnail,
  H3,
  Body,
} from 'native-base';
import CartContext from '../Context/Cart/CartContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function ProductsDisplay({navigation}) {
  const [indica, setBlogs1] = useState([]);
  const [hybrid, setBlogs2] = useState([]);
  const [sativa, setBlogs3] = useState([]);
  const [highcbd, setBlogs4] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {addToCart} = useContext(CartContext);
  const {cartItems} = useContext(CartContext);

  const refreshData = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  });

  const dataFetch1 = useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data1 = await fetch(
        'https://canacitycannabis.ca/wp-json/wc/v3/products?category=18&consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356',
      );
      const newData1 = await data1.json();
      setBlogs1(newData1);
      setLoading(false);
      // console.log(data1);
    };
    fetchData();
  }, []);

  const dataFetch2 = useEffect(() => {
    const fetchData = async () => {
      const data2 = await fetch(
        'https://canacitycannabis.ca/wp-json/wc/v3/products?category=20&consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356',
      );
      const newData2 = await data2.json();
      setBlogs2(newData2);
      // console.log(data2);
    };
    fetchData();
  }, []);

  const dataFetch3 = useEffect(() => {
    const fetchData = async () => {
      const data3 = await fetch(
        'https://canacitycannabis.ca/wp-json/wc/v3/products?category=19&consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356',
      );
      const newData3 = await data3.json();
      setBlogs3(newData3);
      // console.log(data3);
    };
    fetchData();
  }, []);

  const dataFetch4 = useEffect(() => {
    const fetchData = async () => {
      const data4 = await fetch(
        'https://canacitycannabis.ca/wp-json/wc/v3/products?category=23&consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356',
      );
      const newData4 = await data4.json();
      setBlogs4(newData4);
      // console.log(data4);
    };
    fetchData();
  }, []);

  const [searchValue, setSearchValue] = useState('');
  const onSearchHandler = () => {
    // if (searchValue) {
    navigation.navigate('SearchBar', {searchContent: searchValue});
    setSearchValue('');
    // } else {
    //   alert('Enter Something to Search');
    // }
  };

  const handleLocalStorage = async order => {
    const newOrders = [...cartItems, order];

    addToCart(order);
    newOrders.push(order);

    // console.log({newOrders});

    try {
      await AsyncStorage.setItem('orders', JSON.stringify(newOrders));
    } catch (err) {
      console.log(err.message);
    }
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
    <Container
      contentContainerStyle={{
        display: 'flex',
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          paddingHorizontal: wp('2.5%'),
          backgroundColor: '#ffffff',
          height: hp('13%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp('0.5%'),
            width: '100%',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              value={searchValue}
              keyboardType="default"
              returnKeyType="search"
              onSubmitEditing={onSearchHandler}
              placeholder="Search"
              placeholderTextColor='#2d2d2d'
              style={{
                fontSize: hp('1.6%'),
                paddingHorizontal: wp('2.5%'),
                color: 'black',
                backgroundColor: '#f9ebeb',
                width: wp('75%'),
                height: hp('5%'),
                borderRadius: wp('0.8%'),
                borderColor: 'black',
                borderWidth: wp('0.2%'),
              }}
              onChangeText={searchValue => {
                setSearchValue(searchValue);
              }}
            />
            <Right>
              <Button
                transparent
                style={{justifyContent: 'center', paddingRight: wp('1.5%')}}
                onPress={onSearchHandler}
                disabled={searchValue === ''}>
                <Image
                  source={require('../../source/assets/search1.png')}
                  style={{
                    height: hp('7%'),
                    width: wp('7%'),
                    resizeMode: 'contain',
                    tintColor: '#bf1f1f',
                  }}
                />
              </Button>
            </Right>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('17.5%'),
            }}>
            <Button
              style={{
                borderRadius: wp('0.6%'),
                height: hp('5%'),
                borderWidth: wp('0.2%'),
                borderColor: '#dbdbdb',
                paddingHorizontal: wp('2%'),
                backgroundColor: '#dbdbdb',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('AllCategoryProducts');
              }}>
              <Image
                source={require('../../source/assets/filter1.png')}
                resizeMode="contain"
                style={{
                  height: hp('5%'),
                  width: wp('5%'),
                  tintColor: '#bf1f1f',
                }}
              />
              <Text style={{fontSize: hp('1.6%'), color: '#bf1f1f'}}>
                Filter
              </Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            marginTop: hp('1%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
            width: '100%',
          }}>
          <Text style={{color: '#bf1f1f', fontSize: hp('2.1%')}}>Explore</Text>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={refreshData}
            title="Refreshing..."
            tintColor="#ffffff"
            titleColor="#000000"
            colors={['#bf1f1f']}
          />
        }>
        <Content
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingBottom: hp('5%'),
            // backgroundColor: '#2d2d2d',
          }}>
          <View
            style={{
              display: 'flex',
              width: '100%',
              paddingHorizontal: wp('3%'),
              paddingVertical: hp('1%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: wp('96%'),
                height: hp('30%'),
                resizeMode: 'contain',
              }}
              source={require('../../source/assets/b1.jpg')}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp('2%'),
              marginBottom: hp('1%'),
              paddingRight: wp('2%'),
              paddingLeft: wp('2%'),
              width: '100%',
            }}>
            <Text style={{color: '#bf1f1f', fontSize: hp('2.1%')}}>Indica</Text>
            <Right>
              <Text
                style={{
                  color: 'black',
                  fontSize: hp('1.8%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('Category1')}>
                See all
              </Text>
            </Right>
          </View>
          <View style={{paddingVertical: hp('2%')}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {indica?.map((blog1, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    backgroundColor: '#ffffff',
                    height: hp('31.5%'),
                    width: wp('29.15%'),
                    marginHorizontal: wp('2%'),
                    paddingVertical: wp('1.5 %'),
                    // marginLeft: 10,
                    // marginRight: 10,
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Product', {id: blog1.id})
                      }>
                      <Image
                        source={{uri: blog1?.images[0].src}}
                        style={{
                          width: wp('29%'),
                          height: hp('15%'),
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginLeft: wp('1.6%')}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: hp('1.8%'),
                        fontWeight: 'bold',
                      }}>
                      {blog1?.name}
                    </Text>
                    <Text
                      style={{
                        color: '#2d2d2d',
                        fontSize: hp('1%'),
                        fontWeight: 'bold',
                      }}>
                      {blog1?.categories[0].name}
                    </Text>
                    <Text
                      style={{
                        color: '#bf1f1f',
                        fontSize: hp('1.6%'),
                        fontWeight: 'bold',
                      }}>
                      $ {blog1?.price}
                    </Text>
                    <View>
                      <Star
                        score={parseFloat(blog1?.average_rating)}
                        style={styles.starStyle}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: hp('2%'),
                      paddingHorizontal: wp('0.75%'),
                    }}>
                    <View style={{width: wp('20%')}}>
                      <Button
                        style={{
                          // paddingLeft: wp('0.5%'),
                          // paddingRight: 10,
                          borderRadius: wp('0.35%'),
                          height: hp('3%'),
                          paddingHorizontal: wp('1%'),
                          backgroundColor: '#bf1f1f',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => handleLocalStorage(blog1)}>
                        <Image
                          source={require('../../source/assets/trolley11.png')}
                          resizeMode="contain"
                          style={{
                            width: wp('5%'),
                            height: hp('5%'),
                            marginLeft: wp('0.5%'),
                            marginRight: wp('0.5%'),
                            tintColor: 'white',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1%'),
                            color: 'white',
                            marginRight: wp('0.85%'),
                          }}>
                          ADD TO CART
                        </Text>
                      </Button>
                    </View>
                    <View>
                      <Button
                        style={{
                          backgroundColor: 'black',
                          height: hp('3%'),
                          borderRadius: wp('0.35%'),
                          paddingHorizontal: wp('0.6%'),
                          // paddingLeft: 2,
                          // paddingRight: 2,
                        }}
                        onPress={() =>
                          navigation.navigate('Product', {id: blog1.id})
                        }>
                        <Image
                          source={require('../../source/assets/eye1.png')}
                          resizeMode="contain"
                          style={{
                            width: wp('5%'),
                            height: hp('4%'),
                            tintColor: 'white',
                          }}
                        />
                      </Button>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp('2%'),
              marginBottom: hp('1%'),
              paddingRight: wp('2%'),
              paddingLeft: wp('2%'),
              width: '100%',
            }}>
            <Text style={{color: '#bf1f1f', fontSize: hp('2.1%')}}>Hybrid</Text>
            <Right>
              <Text
                style={{
                  color: 'black',
                  fontSize: hp('1.8%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('Category2')}>
                See all
              </Text>
            </Right>
          </View>
          <View style={{paddingVertical: hp('2%')}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {hybrid?.map((blog2, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    backgroundColor: '#ffffff',
                    height: hp('31.5%'),
                    width: wp('29.15%'),
                    marginHorizontal: wp('2%'),
                    paddingVertical: wp('1.5 %'),
                    // marginLeft: 10,
                    // marginRight: 10,
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Product', {id: blog2.id})
                      }>
                      <Image
                        source={{uri: blog2?.images[0].src}}
                        style={{
                          width: wp('29%'),
                          height: hp('15%'),
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginLeft: wp('1.6%')}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: hp('1.8%'),
                        fontWeight: 'bold',
                      }}>
                      {blog2?.name}
                    </Text>
                    <Text
                      style={{
                        color: '#2d2d2d',
                        fontSize: hp('1%'),
                        fontWeight: 'bold',
                      }}>
                      {blog2?.categories[0].name}
                    </Text>
                    <Text
                      style={{
                        color: '#bf1f1f',
                        fontSize: hp('1.6%'),
                        fontWeight: 'bold',
                      }}>
                      $ {blog2?.price}
                    </Text>
                    <View>
                      <Star
                        score={parseFloat(blog2?.average_rating)}
                        style={styles.starStyle}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: hp('2%'),
                      paddingHorizontal: wp('0.75%'),
                    }}>
                    <View style={{width: wp('20%')}}>
                      <Button
                        style={{
                          // paddingLeft: wp('0.5%'),
                          // paddingRight: 10,
                          borderRadius: wp('0.35%'),
                          height: hp('3%'),
                          paddingHorizontal: wp('1%'),
                          backgroundColor: '#bf1f1f',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => handleLocalStorage(blog2)}>
                        <Image
                          source={require('../../source/assets/trolley11.png')}
                          resizeMode="contain"
                          style={{
                            width: wp('5%'),
                            height: hp('5%'),
                            marginLeft: wp('0.5%'),
                            marginRight: wp('0.5%'),
                            tintColor: 'white',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1%'),
                            color: 'white',
                            marginRight: wp('0.85%'),
                          }}>
                          ADD TO CART
                        </Text>
                      </Button>
                    </View>
                    <View>
                      <Button
                        style={{
                          backgroundColor: 'black',
                          height: hp('3%'),
                          borderRadius: wp('0.35%'),
                          paddingHorizontal: wp('0.6%'),
                          // paddingLeft: 2,
                          // paddingRight: 2,
                        }}
                        onPress={() =>
                          navigation.navigate('Product', {id: blog2.id})
                        }>
                        <Image
                          source={require('../../source/assets/eye1.png')}
                          resizeMode="contain"
                          style={{
                            width: wp('5%'),
                            height: hp('4%'),
                            tintColor: 'white',
                          }}
                        />
                      </Button>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View
            style={{
              display: 'flex',
              width: '100%',
              paddingHorizontal: wp('3%'),
              paddingVertical: hp('1%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: wp('96%'),
                height: hp('30%'),
                resizeMode: 'contain',
              }}
              source={require('../../source/assets/b2.jpg')}
            />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp('2%'),
              marginBottom: hp('1%'),
              paddingRight: wp('2%'),
              paddingLeft: wp('2%'),
              width: '100%',
            }}>
            <Text style={{color: '#bf1f1f', fontSize: hp('2.1%')}}>Sativa</Text>
            <Right>
              <Text
                style={{
                  color: 'black',
                  fontSize: hp('1.8%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('Category3')}>
                See all
              </Text>
            </Right>
          </View>
          <View style={{paddingVertical: hp('2%')}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {sativa?.map((blog3, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    backgroundColor: '#ffffff',
                    height: hp('31.5%'),
                    width: wp('29.15%'),
                    marginHorizontal: wp('2%'),
                    paddingVertical: wp('1.5 %'),
                    // marginLeft: 10,
                    // marginRight: 10,
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Product', {id: blog3.id})
                      }>
                      <Image
                        source={{uri: blog3?.images[0].src}}
                        style={{
                          width: wp('29%'),
                          height: hp('15%'),
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginLeft: wp('1.6%')}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: hp('1.8%'),
                        fontWeight: 'bold',
                      }}>
                      {blog3?.name}
                    </Text>
                    <Text
                      style={{
                        color: '#2d2d2d',
                        fontSize: hp('1%'),
                        fontWeight: 'bold',
                      }}>
                      {blog3?.categories[0].name}
                    </Text>
                    <Text
                      style={{
                        color: '#bf1f1f',
                        fontSize: hp('1.6%'),
                        fontWeight: 'bold',
                      }}>
                      $ {blog3?.price}
                    </Text>
                    <View>
                      <Star
                        score={parseFloat(blog3?.average_rating)}
                        style={styles.starStyle}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: hp('2%'),
                      paddingHorizontal: wp('0.75%'),
                    }}>
                    <View style={{width: wp('20%')}}>
                      <Button
                        style={{
                          // paddingLeft: wp('0.5%'),
                          // paddingRight: 10,
                          borderRadius: wp('0.35%'),
                          height: hp('3%'),
                          paddingHorizontal: wp('1%'),
                          backgroundColor: '#bf1f1f',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => handleLocalStorage(blog3)}>
                        <Image
                          source={require('../../source/assets/trolley11.png')}
                          resizeMode="contain"
                          style={{
                            width: wp('5%'),
                            height: hp('5%'),
                            marginLeft: wp('0.5%'),
                            marginRight: wp('0.5%'),
                            tintColor: 'white',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1%'),
                            color: 'white',
                            marginRight: wp('0.85%'),
                          }}>
                          ADD TO CART
                        </Text>
                      </Button>
                    </View>
                    <View>
                      <Button
                        style={{
                          backgroundColor: 'black',
                          height: hp('3%'),
                          borderRadius: wp('0.35%'),
                          paddingHorizontal: wp('0.6%'),
                          // paddingLeft: 2,
                          // paddingRight: 2,
                        }}
                        onPress={() =>
                          navigation.navigate('Product', {id: blog3.id})
                        }>
                        <Image
                          source={require('../../source/assets/eye1.png')}
                          resizeMode="contain"
                          style={{
                            width: wp('5%'),
                            height: hp('4%'),
                            tintColor: 'white',
                          }}
                        />
                      </Button>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp('2%'),
              marginBottom: hp('1%'),
              paddingRight: wp('2%'),
              paddingLeft: wp('2%'),
              width: '100%',
            }}>
            <Text style={{color: '#bf1f1f', fontSize: hp('2.1%')}}>
              High CBD
            </Text>
            <Right>
              <Text
                style={{
                  color: 'black',
                  fontSize: hp('1.8%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('Category4')}>
                See all
              </Text>
            </Right>
          </View>
          <View style={{paddingVertical: hp('2%')}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {highcbd?.map((blog4, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    backgroundColor: '#ffffff',
                    height: hp('31.5%'),
                    width: wp('29.15%'),
                    marginHorizontal: wp('2%'),
                    paddingVertical: wp('1.5 %'),
                    // marginLeft: 10,
                    // marginRight: 10,
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Product', {id: blog4.id})
                      }>
                      <Image
                        source={{uri: blog4?.images[0].src}}
                        style={{
                          width: wp('29%'),
                          height: hp('15%'),
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginLeft: wp('1.6%')}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: hp('1.8%'),
                        fontWeight: 'bold',
                      }}>
                      {blog4?.name}
                    </Text>
                    <Text
                      style={{
                        color: '#2d2d2d',
                        fontSize: hp('1%'),
                        fontWeight: 'bold',
                      }}>
                      {blog4?.categories[0].name}
                    </Text>
                    <Text
                      style={{
                        color: '#bf1f1f',
                        fontSize: hp('1.6%'),
                        fontWeight: 'bold',
                      }}>
                      $ {blog4?.price}
                    </Text>
                    <View>
                      <Star
                        score={parseFloat(blog4?.average_rating)}
                        style={styles.starStyle}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: hp('2%'),
                      paddingHorizontal: wp('0.75%'),
                    }}>
                    <View style={{width: wp('20%')}}>
                      <Button
                        style={{
                          // paddingLeft: wp('0.5%'),
                          // paddingRight: 10,
                          borderRadius: wp('0.35%'),
                          height: hp('3%'),
                          paddingHorizontal: wp('1%'),
                          backgroundColor: '#bf1f1f',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => handleLocalStorage(blog4)}>
                        <Image
                          source={require('../../source/assets/trolley11.png')}
                          resizeMode="contain"
                          style={{
                            width: wp('5%'),
                            height: hp('5%'),
                            marginLeft: wp('0.5%'),
                            marginRight: wp('0.5%'),
                            tintColor: 'white',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1%'),
                            color: 'white',
                            marginRight: wp('0.85%'),
                          }}>
                          ADD TO CART
                        </Text>
                      </Button>
                    </View>
                    <View>
                      <Button
                        style={{
                          backgroundColor: 'black',
                          height: hp('3%'),
                          borderRadius: wp('0.35%'),
                          paddingHorizontal: wp('0.6%'),
                          // paddingLeft: 2,
                          // paddingRight: 2,
                        }}
                        onPress={() =>
                          navigation.navigate('Product', {id: blog4.id})
                        }>
                        <Image
                          source={require('../../source/assets/eye1.png')}
                          resizeMode="contain"
                          style={{
                            width: wp('5%'),
                            height: hp('4%'),
                            tintColor: 'white',
                          }}
                        />
                      </Button>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </Content>
        <View
          style={{
            paddingBottom: hp('4%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: hp('2.5%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('AllCategoryProducts')}>
              See all Products
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  starStyle: {
    width: wp('11.5%'),
    height: hp('1.3%'),
    // width: 50,
    // height: 10,
  },
});
// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: 'red',
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
// });
export default ProductsDisplay;
