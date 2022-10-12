import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Image,
  useColorScheme,
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Icon,
  Container,
  Header,
  Footer,
  Title,
  Text,
  Button,
  Tab,
  Tabs,
  Form,
  Input,
  Textarea,
  Content,
  Item,
  Right,
  Left,
  ListItem,
  Thumbnail,
  H3,
  Body,
} from 'native-base';
import Star from 'react-native-star-view';
import HTMLView from 'react-native-htmlview';
import CartContext from '../Context/Cart/CartContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Product = ({navigation, route}) => {
  const {addToCart} = useContext(CartContext);
  const {id} = route.params.id;
  const [selectedProduct, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [prevCount, setCount] = useState(prevCount);

  const setId = () => {
    navigation.navigate('Review', {
      rev: selectedProduct.id,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://canacitycannabis.ca/wp-json/wc/v3/products/${route.params.id}?consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356`,
      );
      const newData = await data.json();
      setBlogs(newData);
      setLoading(false);
    };
    fetchData();
  });

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
    <Container contentContainerStyle={styles.containerStyle}>
      <View
        style={{
          height: hp('45%'),
          width: wp('95.75%'),
          elevation: 5,
          borderRadius: wp('0.5%'),
          borderColor: '#2d2d2d',
          marginVertical: hp('1.5%'),
          marginHorizontal: wp('2%'),
          paddingRight: wp('1%'),
          paddingLeft: wp('1%'),
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}>
        <Content>
          <View
            style={{paddingVertical: hp('1.5%'), paddingHorizontal: wp('4%')}}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <View>
                <Button
                  style={{position: 'absolute', zIndex: 999}}
                  transparent
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../../source/assets/leftangle.png')}
                    style={{
                      width: wp('5%'),
                      height: hp('5%'),
                      resizeMode: 'contain',
                    }}
                  />
                </Button>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity>
                    <Image
                      source={{uri: selectedProduct.images[0].src}}
                      style={{
                        width: wp('100%'),
                        height: hp('24%'),
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp('0.75%'),
                  justifyContent: 'space-between',
                  display: 'flex',
                  width: wp('95%'),
                }}>
                <Text
                  style={{
                    backgroundColor: '#ffffff',
                    width: wp('50%'),
                    color: 'black',
                    fontSize: hp('2.8%'),
                    fontWeight: 'bold',
                  }}>
                  {selectedProduct.name}
                </Text>
                <Text
                  style={{
                    color: '#bf1f1f',
                    fontSize: hp('2.5%'),
                    fontWeight: 'bold',
                    width: wp('30%'),
                  }}>
                  $ {selectedProduct.price}
                </Text>
              </View>
              <Text
                style={{
                  color: 'grey',
                  width: wp('20%'),
                  fontSize: hp('1.8%'),
                  fontWeight: 'bold',
                  backgroundColor: '#ffffff',
                }}>
                {selectedProduct.categories[0].name}
              </Text>
              <View style={{backgroundColor: '#ffffff'}}>
                <Star
                  score={parseFloat(selectedProduct?.average_rating)}
                  style={styles.starStyle}
                />
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: hp('0.75%'),
                  display: 'flex',
                }}>
                <Button
                  style={{
                    borderRadius: wp('0.6%'),
                    height: hp('5%'),
                    paddingHorizontal: wp('2%'),
                    backgroundColor: '#bf1f1f',
                    justifyContent: 'center',
                  }}
                  onPress={() => addToCart(selectedProduct)}>
                  <Image
                    source={require('../../source/assets/trolley11.png')}
                    resizeMode="contain"
                    style={{
                      marginLeft: wp('2%'),
                      width: wp('8%'),
                      height: hp('8%'),
                      resizeMode: 'contain',
                      tintColor: 'white',
                    }}
                  />
                  <Text style={{fontSize: hp('1.6%'), color: 'white'}}>
                    ADD TO CART
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </Content>
      </View>
      <View>
        <View style={{height: hp('35%'), paddingTop: 0}}>
          <Tabs>
            <Tab
              tabStyle={{
                showsHorizontalScrollIndicator: false,
                backgroundColor: 'white',
                color: 'black',
              }}
              activeTextStyle={{
                color: '#bf1f1f',
                borderTopColor: '#black',
              }}
              activeTabStyle={{
                borderTopColor: '#bf1f1f',
                borderTopWidth: hp('0.2%'),
                borderBottomColor: '#bf1f1f',
                borderBottomWidth: hp('0.2%'),
                backgroundColor: 'white',
                borderRadius: 0,
                color: 'black',
              }}
              
              textStyle={{color: 'black'}}
              heading="Description">
              <View
                style={{
                  marginVertical: hp('1.5%'),
                  marginHorizontal: wp('1.5%'),
                  borderColor: 'black',
                  paddingHorizontal: wp('2%'),
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Content>
                    <View
                      style={{
                        paddingVertical: hp('0.5%'),
                        width: wp('85%'),
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontWeight: 'bold'}}>Description</Text>
                        <HTMLView value={selectedProduct.description} />
                        {/* <Text>
                          aghasgfhsgdakaghgsdhksgfhgfakdjsgfhdgfjakshgkdjsdkfnkjasnlfkjhsdjkfhjakshjlkhajklshjkfjhfjdsfhsdkhfjksdhkfhksdhjdadskjsjhfhjksjdfkjfdjjddhajdkhfdjklfdhdjklsdahfjkdhjkhfjldsahfjkhjkfhjkahjkfhajk
                        </Text>
                        <Text>
                          aghasgfhsgdakaghgsdhksgfhgfakdjsgfhdgfjakshgkdjsdkfnkjasnlfkjhsdjkfhjakshjlkhajklshjkfjhfjdsfhsdkhfjksdhkfhksdhjdadskjsjhfhjksjdfkjfdjjddhajdkhfdjklfdhdjklsdahfjkdhjkhfjldsahfjkhjkfhjkahjkfhajk
                        </Text> */}
                      </View>
                    </View>
                  </Content>
                </ScrollView>
              </View>
            </Tab>
            <Tab
              tabStyle={{
                showsHorizontalScrollIndicator: false,
                backgroundColor: 'white',
                color: 'black',
              }}
              activeTextStyle={{
                color: '#bf1f1f',
              }}
              activeTabStyle={{
                borderBottomWidth: 0,
                borderTopWidth: hp('0.2%'),
                borderTopColor: '#bf1f1f',
                borderEndColor: '#ffffff',
                borderStartColor: '#ffffff',
                backgroundColor: 'white',
                borderRadius: 0,
                color: 'black',
              }}
              textStyle={{color: 'black'}}
              heading="Reviews">
              <View
                style={{
                  marginVertical: hp('1.5%'),
                  marginHorizontal: wp('1.5%'),
                  borderColor: 'black',
                  paddingHorizontal: wp('2%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{paddingVertical: hp('0.5%'), width: wp('85%')}}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {selectedProduct.rating_count === 0 ? (
                      <View
                        style={{
                          marginVertical: hp('2%'),
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View>
                          <Text style={{fontWeight: 'bold'}}>
                            There are no Reviews yet
                          </Text>
                        </View>
                        <View
                          style={{
                            marginVertical: hp('2%'),
                          }}>
                          <Button
                            style={{
                              borderRadius: 3,
                              height: hp('5%'),
                              paddingHorizontal: wp('2%'),
                              backgroundColor: '#bf1f1f',
                              justifyContent: 'center',
                            }}
                            onPress={setId}>
                            <Text
                              style={{fontSize: hp('1.6%'), color: 'white'}}>
                              Post a Review
                            </Text>
                          </Button>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          marginVertical: hp('2%'),
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View>
                          <Text style={{fontWeight: 'bold'}}>
                            Reviews({selectedProduct.rating_count + 1})
                          </Text>
                        </View>
                        <View
                          style={{
                            marginVertical: hp('2%'),
                          }}>
                          <TouchableOpacity>
                            <Button
                              style={{
                                borderRadius: 3,
                                height: hp('5%'),
                                paddingHorizontal: wp('2%'),
                                backgroundColor: '#bf1f1f',
                                justifyContent: 'center',
                              }}
                              onPress={setId}>
                              <Text
                                style={{fontSize: hp('1.6%'), color: 'white'}}>
                                Check Reviews
                              </Text>
                            </Button>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </Tab>
          </Tabs>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  starStyle: {
    width: wp('18%'),
    height: hp('1.8%'),
  },
  containerStyle: {
    display: 'flex',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Product;
