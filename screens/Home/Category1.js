import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Image,
  useColorScheme,
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Star from 'react-native-star-view';

import {
  Icon,
  Container,
  Header,
  Footer,
  Title,
  Button,
  Input,
  Content,
  Item,
  Right,
  Left,
  ListItem,
  Thumbnail,
  H3,
  Body,
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CartContext from '../Context/Cart/CartContext';

function Category1({navigation}) {
  const [indica, setBlogs1] = useState([]);
  const [loading, setLoading] = useState(false);
  const {addToCart} = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data1 = await fetch(
        'https://canacitycannabis.ca/wp-json/wc/v3/products?category=18&consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356&per_page=100',
      );
      const newData1 = await data1.json();
      setBlogs1(newData1);
      setLoading(false);
      // console.log(data1);
    };
    fetchData();
  }, []);

  const [searchValue, setSearchValue] = useState('');

  const onSearchHandler = () => {
    navigation.navigate('SearchBar', {searchContent: searchValue});
    setSearchValue('');
  };

  const [prevCount, setCount] = useState(0);

  const increaseCart = () => {
    setCount(prevCount => prevCount + 1, console.log(prevCount), {
      cartCount: prevCount,
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
          height: hp('14%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp('2.5%'),
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
            <Text style={{fontSize: hp('1.6%'), color: '#bf1f1f'}}>Filter</Text>
          </Button>
        </View>
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
            width: '100%',
            alignItems:'center',
          }}>
          <Text style={{color: '#bf1f1f', fontSize: hp('2.1%')}}>Indica</Text>
          <TouchableOpacity
                transparent
                style={{justifyContent: 'center', paddingRight: wp('1.5%')}}
                onPress={()=> {navigation.popToTop()}}
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
      </View>
      <ScrollView>
        <Content
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: wp('5%'),
            paddingBottom: wp('10%'),
          }}>
          <View
            style={{
              // paddingTop: 20,
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              width: '100%',
            }}>
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
                      onPress={() => addToCart(blog1)}>
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
          </View>
        </Content>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  starStyle: {
    width: 50,
    height: 10,
  },
});

export default Category1;
