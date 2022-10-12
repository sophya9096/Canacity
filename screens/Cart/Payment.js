import React, { useState, createRef } from "react";
import { WebView } from "react-native-webview";
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
  StatusBar,
} from "react-native";
import Color from "./../../constant/Color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const RadioButton = ({ onPress, selected, children }) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Payment = ({ navigation }) => {
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCVV] = useState("");

  const expMonthRef = createRef();
  const expYearRef = createRef();
  const cvvRef = createRef();

  const [isLiked, setIsLiked] = useState([
    {
      id: 1,
      title: "bacs",
      value: true,
      name: "Pay Safe",
      selected: true,
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.main}>
          <View>
            <View
              style={{
                paddingVertical: hp("1%"),
                paddingHorizontal: wp("2.5%"),
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: hp("3%"),
                }}
              >
                Payment Method
              </Text>
              <TouchableOpacity
                transparent
                style={{ justifyContent: "center", paddingRight: wp("1.5%") }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Image
                  source={require("../../source/assets/leftangle.png")}
                  style={{
                    height: hp("4%"),
                    width: wp("4%"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: wp("100%"),
                alignItems: "center",
              }}
            >
              <View>
                <View style={styles.app}>
                  {isLiked.map((item) => (
                    <RadioButton selected={item.selected} key={item.id}>
                      <View style={{ paddingTop: hp("1%") }}>
                        <Image
                          source={require("../../source/assets/paysafe.png")}
                          style={{
                            height: hp("3%"),
                            width: wp("25%"),
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                    </RadioButton>
                  ))}
                  {/* <View
                    style={{justifyContent: 'center', alignItems: 'center'}}> */}
                  <Image
                    source={require("../../source/assets/card.png")}
                    resizeMode="contain"
                    style={{
                      height: hp("6%"),
                      width: wp("12%"),
                      tintColor: "black",
                    }}
                  />
                  {/* </View> */}
                </View>
                <View>
                  <TextInput
                    style={styles.cardText}
                    maxLength={16}
                    onChangeText={(number) => setNumber(number)}
                    value={number}
                    placeholder="Card Number"
                    placeholderTextColor="black"
                    keyboardType="decimal-pad"
                    textContentType="creditCardNumber"

                    autoCompleteType="cc-number"
                    dataDetectorTypes="phoneNumber"
                    onSubmitEditing={() =>
                      expMonthRef.current && expMonthRef.current.focus()
                    }
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                      }}
                    >
                      <TextInput
                        style={styles.cardDate}
                        maxLength={2}
                        autoCompleteType="cc-number"
                        onChangeText={(expiryMonth) =>
                          setExpiryMonth(expiryMonth)
                        }
                        value={expiryMonth}
                        placeholder="MM"
                        placeholderTextColor="black"
                        keyboardType="decimal-pad"
                        textContentType="creditCardNumber"
                        autoCompleteType="cc-csc"
                        dataDetectorTypes="phoneNumber"
                        ref={expMonthRef}
                        onSubmitEditing={() =>
                          expYearRef.current && expYearRef.current.focus()
                        }
                      />
                      <TextInput
                        style={styles.cardYear}
                        maxLength={2}
                        autoCompleteType="cc-number"
                        onChangeText={(expiryYear) => setExpiryYear(expiryYear)}
                        value={expiryYear}
                        placeholder="YY"
                        placeholderTextColor="black"
                        keyboardType="decimal-pad"
                        textContentType="creditCardNumber"
                        autoCompleteType="cc-csc"
                        dataDetectorTypes="phoneNumber"
                        ref={expYearRef}
                        onSubmitEditing={() =>
                          cvvRef.current && cvvRef.current.focus()
                        }
                      />
                    </View>
                    <TextInput
                      style={styles.cardCVV}
                      maxLength={3}
                      autoCompleteType="cc-number"
                      onChangeText={(cvv) => setCVV(cvv)}
                      value={cvv}
                      placeholder="CVV"
                      placeholderTextColor="black"
                      keyboardType="decimal-pad"
                      textContentType="creditCardNumber"
                      autoCompleteType="cc-csc"
                      dataDetectorTypes="phoneNumber"
                      ref={cvvRef}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingTop: hp("37%"),
                paddingBottom: hp("1%"),
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  if (!number || number.length < 16) {
                    alert("Please enter valid Credit Card Number");
                    return;
                  }
                  if (
                    !expiryMonth ||
                    expiryMonth.length < 2 ||
                    expiryMonth > 12
                  ) {
                    alert("Please enter valid Credit Card Expiry Date");
                    return;
                  }
                  if (!expiryYear || expiryYear.length < 2) {
                    alert("Please enter valid Credit Card Expiry Date");
                    return;
                  }
                  if (!cvv || cvv.length < 3) {
                    alert("Please enter valid Credit Card CVV Number");
                    return;
                  }
                  navigation.navigate("DeliveryInfo", {
                    cNum: number,
                    cMonth: expiryMonth,
                    cYear: expiryYear,
                    cCV: cvv,
                  });
                }}
              >
                <View style={styles.signIn}>
                  <Text style={styles.signInText}>Confirm Method</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  app: {
    marginTop: hp("1.5%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardText: {
    color: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    borderColor: "black",
    borderRadius: wp("0.75%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    width: wp("94%"),
    height: hp("6.5%"),
    marginTop: hp("1.4%"),
    borderWidth: wp("0.35%"),
    fontWeight: "bold",
    fontSize: hp("1.8%"),
  },
  cardNumber: {
    color: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    borderColor: "black",
    borderRadius: wp("0.75%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    width: wp("70%"),
    height: hp("6.5%"),
    marginTop: hp("1.4%"),
    borderWidth: wp("0.35%"),
    fontWeight: "bold",
    fontSize: hp("1.8%")
  },
  cardDate: {
    color: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    borderColor: "black",
    borderRadius: wp("0.75%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    width: wp("16.75%"),
    height: hp("6.5%"),
    marginTop: hp("1.4%"),
    borderWidth: wp("0.35%"),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: hp("1.8%"),
  },
  cardYear: {
    color: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    borderColor: "black",
    borderRadius: wp("0.75%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    marginHorizontal: wp("1%"),
    width: wp("16.75%"),
    height: hp("6.5%"),
    marginTop: hp("1.4%"),
    borderWidth: wp("0.35%"),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: hp("1.8%"),
  },
  cardCVV: {
    color: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    borderColor: "black",
    borderRadius: wp("0.75%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    width: wp("25%"),
    height: hp("6.5%"),
    marginTop: hp("1.4%"),
    borderWidth: wp("0.35%"),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: hp("1.8%"),
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  radioButton: {
    height: hp("2.65%"),
    width: wp("5%"),
    backgroundColor: "#F8F8F8",
    borderRadius: wp("5%"),
    borderWidth: wp("0.4%"),
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: hp("1.7%"),
    width: wp("3.4%"),
    borderRadius: wp("5%"),
    backgroundColor: "black",
  },
  radioButtonText: {
    fontSize: hp("2.5%"),
    marginLeft: wp("4%"),
  },
  main: {
    flex: 1,
    display: "flex",
    width: wp("100%"),
  },
  signIn: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: wp("0.25%"),
    borderColor: "white",
    backgroundColor: Color.secondary,
    marginVertical: hp("2.5%"),
    borderRadius: wp("10%"),
    width: wp("45%"),
    height: hp("5%"),
    marginRight: "auto",
    marginLeft: "auto",
  },
  signInText: {
    marginRight: "auto",
    marginLeft: "auto",
    color: "white",
    fontSize: hp("1.8%"),
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Payment;
