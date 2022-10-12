import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Container, Button, Form, Textarea} from 'native-base';
import Color from '../../constant/Color';
import HTMLView from 'react-native-htmlview';
import Star from 'react-native-star-view';
import {UserID} from '../../Navigations/App';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const nullstar =
  'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';
const star =
  'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';

const Review = ({navigation, route}) => {
  const {id} = route.params.rev;
  const {jwtID, jwtSetID} = useContext(UserID);
  const [userInfo, setUserInfo] = useState([]);
  const [review, setReviews] = useState([]);
  const [msgReview, setMsgReview] = useState('');
  const [section, setSection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [errortext, setErrortext] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const data = await fetch(
        `https://canacitycannabis.ca/wp-json/wc/v3/customers/${jwtID}?consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356`,
      );
      const newData = await data.json();
      setUserInfo(newData);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleSubmitButton = () => {
    setErrortext('');
    if (!rating) {
      alert('Please set Rating');
      return;
    }
    if (!msgReview) {
      alert('Please enter your Review');
      return;
    }
    //Show Loader
    setLoading(true);

    var dataToSend = {
      product_id: route.params.rev,
      reviewer: userInfo.username,
      reviewer_email: userInfo.email,
      rating: rating,
      review: msgReview,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(
      'https://canacitycannabis.ca/wp-json/wc/v3/products/reviews?consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356',
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
        // console.log(responseJson);
        // If server response message same as Data Matched

        if (responseJson.code === 'woocommerce_rest_comment_duplicate') {
          setMsgReview('');
          alert('This review already exists. Please try another.');
        } else {
          Alert.alert(
            `Dear ${
              userInfo.username.split('')[0].toUpperCase() +
              userInfo.username.slice(1)
            }`,
            'Your Review has been posted, Succesfully',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Product');
                },
              },
            ],
            {cancelable: false},
          );
          setRating(0);
          setMsgReview('');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  const CustomRatingBar = () => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: hp('1%'),
          marginRight: wp('0.5%'),
        }}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                key={item}
                onPress={() => setRating(item)}>
                <Image
                  style={styles.starImgStyle}
                  source={item <= rating ? {uri: star} : {uri: nullstar}}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <Text>{rating + '/' + maxRating.length}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://canacitycannabis.ca/wp-json/wc/v3/products/${route.params.rev}?consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356`,
      );
      const newData = await data.json();
      setReviews(newData);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const value = await fetch(
        `https://canacitycannabis.ca/wp-json/wc/v3/products/reviews?consumer_key=ck_2478a5170f75f45dcf9514126067be2dab2b1b94&consumer_secret=cs_023ef065e096a004f1334c289f8498863142a356`,
      );
      const newValue = await value.json();
      setSection(newValue);
      setLoading(false);
    };
    fetchReviews();
  }, []);

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
    <Container>
      {review.rating_count === 0 ? (
        <View style={styles.main}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              paddingVertical: hp('1%'),
              paddingHorizontal: wp('5%'),
              backgroundColor: '#ffffff',
              flexDirection:'row',
              justifyContent:'space-between'
            }}>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                color: '#bf1f1f',
                fontSize: hp('2.6%'),
              }}>
              Reviews({review.rating_count})
            </Text>
            <TouchableOpacity
                transparent
                style={{justifyContent: 'center', paddingRight: wp('1.5%')}}
                onPress={()=> {navigation.navigate('Product')}}
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
      ) : (
        <View style={styles.main}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              paddingVertical: hp('1%'),
              paddingHorizontal: wp('5%'),
              backgroundColor: '#ffffff',
            }}>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                color: '#bf1f1f',
                fontSize: hp('2.6%'),
              }}>
              Reviews({review.rating_count + 1})
            </Text>
          </View>
        </View>
      )}
      <ScrollView>
        {review.rating_count !== 0 ? (
          <View>
            {section.map((item, key) => {
              for (var a in item.reviewer_avatar_urls) {
                var b = item.reviewer_avatar_urls[a];
              }

              return (
                <TouchableOpacity activeOpacity={0.6}>
                  {item.product_id === route.params.rev ? (
                    <View
                      key={item}
                      style={{
                        marginHorizontal: wp('2%'),
                        marginVertical: hp('2%'),
                        paddingHorizontal: wp('2%'),
                        paddingVertical: hp('3%'),
                        elevation: 2,
                        justifyContent: 'space-around',
                        borderWidth: 0,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginHorizontal: wp('2%'),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '60%',
                          }}>
                          <Image
                            source={{uri: b}}
                            style={{
                              width: wp('12%'),
                              height: hp('6%'),
                              resizeMode: 'contain',
                              borderRadius: 180,
                            }}
                          />
                          <View style={{marginLeft: wp('1%'), width: '70%'}}>
                            <Text style={{textTransform: 'capitalize'}}>
                              {item.reviewer}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}>
                          <Star score={item.rating} style={styles.starStyle} />
                        </View>
                      </View>
                      <View
                        style={{
                          marginTop: hp('2%'),
                          marginHorizontal: wp('1%'),
                        }}>
                        <HTMLView
                          value={item.review.replace(/\n/, '')}
                          stylesheet={htmlText}
                        />
                      </View>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
        <View
          style={{
            width: wp('90%'),
            justifyContent: 'center',
            paddingVertical: hp('1%'),
            alignSelf: 'center',
          }}>
          <Form>
            <Text style={{fontSize: hp('2%')}}>Post your review below:-</Text>
            <CustomRatingBar />
            <Textarea
              placeholder="Write your review here"
              rowSpan={5}
              style={{borderRadius: wp('0.5%'),borderWidth:wp('1%'),borderColor:'grey'}}
              bordered
              onChangeText={UserReview => setMsgReview(UserReview)}
            />
            <TouchableOpacity
              style={styles.register}
              onPress={handleSubmitButton}>
              <Text style={styles.registerText}>Submit</Text>
            </TouchableOpacity>
          </Form>
        </View>
      </ScrollView>
    </Container>
  );
};

const htmlText = StyleSheet.create({
  p: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: hp('1.85%'),
  },
});

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  register: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderColor: 'white',
    backgroundColor: Color.secondary,
    marginTop: hp('1.5%'),
    borderRadius: wp('10%'),
    width: wp('40%'),
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
  starImgStyle: {
    width: wp('6.5%'),
    height: hp('3.25%'),
    marginHorizontal: wp('0.35%'),
    resizeMode: 'cover',
  },
  starStyle: {
    width: wp('11.5%'),
    height: hp('1.3%'),
  },
});

export default Review;
