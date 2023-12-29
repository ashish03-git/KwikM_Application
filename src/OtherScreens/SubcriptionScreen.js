import React, {useState, useEffect, useRef, useId} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import {createHmac} from 'react-native-crypto';
import {WebView} from 'react-native-webview';
import {HmacSHA256, Hex, enc} from 'crypto-js';
import RNUpiPayment from 'react-native-upi-payment';
import BottomSheet from 'react-native-simple-bottom-sheet';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {createHash} from 'react-native-crypto';
import {initiateTransaction} from 'rn-upi-pay';
// import PhonePe from 'react-native-phonepe';

const SubcriptionScreen = () => {
  const [authToken, setAuthToken] = useState(null);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const netInfo = useNetInfo();
  const [details, setDetails] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [PayeeName, setPayeeName] = useState('');
  const [recipientUpiId, setRecipientUpiId] = useState(null);

  useEffect(() => {
    getValueFromStorage();
  });

  useEffect(() => {
    CheckSubscriptionsStatus();
    fetchRecipientUpiId();
  }, [userId, authToken]);


  // extracting id stored in registerOTPScreen from async storage
  const getValueFromStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('user_id');
      const auth = await AsyncStorage.getItem('auth_token');

      setAuthToken(JSON.parse(auth));
      setUserId(id);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  // fetching recipient upi id.
  const fetchRecipientUpiId = async () => {
    const payload = {
      user_id: userId,
      auth_token: authToken,
    };
    const response = await fetch(
      'https://kwikm.in/dev_kwikm/api/fetch_upi.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const apiResponse = await response.json();
    setRecipientUpiId(apiResponse.upi_id);
  };

  const handUpiPayment = async () => {
    initiateTransaction({
      payeeName: 'umar', // Required
      upi: '9696470700@ybl', // Required
      transactionId: `${details.order_id}`, // Required
      currency: 'INR', //(Required)
      merchantCategoryCode: '123445656', // (Required)
      amount: '1', // Required
      note: 'test', // (Optional)

    })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log("error",e)
        console.log(e);
      });
  };


  const updatePaymentStatus = async () => {
    let payload = {
      user_id: userId,
      auth_token: authToken,
      order_id: details.order_id,
      amount: details.amount,
    };
    console.log('payment status update', payload);
    let response = await fetch(
      'https://kwikm.in/dev_kwikm/api/update_order_id.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    let apiResponse = response.json();
    console.log(response);
  };

  const CheckSubscriptionsStatus = async () => {
    let payload = {
      user_id: userId,
      auth_token: authToken,
    };
    // console.log(payload);
    let response = await fetch(
      'https://kwikm.in/dev_kwikm/api/check_susbs.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    let apiResponse = await response.json();
    // console.log(apiResponse)
    setDetails(apiResponse);
  };

  const openBottomSheet = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  return (
    <>
      {netInfo ? (
        <View style={styles.container}>
          <StatusBar backgroundColor={'#EAFFEA'} />

          <View
            style={{
              height: responsiveHeight(8),
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Font5
                name="arrow-left"
                color="black"
                size={responsiveWidth(6)}
              />
            </TouchableOpacity>

            <View
              style={{
                flex: 6,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    color: 'black',
                    fontWeight: '700',
                  }}>
                  Buy Subscription
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.subscriptionContainer}>
              <View>
                <Image
                  source={{
                    uri: 'https://s3-alpha-sig.figma.com/img/d554/26aa/56a1eb3f928d32506149fad3c301fcd0?Expires=1704672000&Signature=fNbWmBKvVJU8OcALIKUeKHuqsV36SBCAY69DSOjX7OMPSxIyk8~yJhdsyT8P627TvJ034bUku9lAwss~I52a5dC~Op5wmYJRSCgP-VY8FeTZIlbYx4Ju84an0PhRevw3Og4ueVNx9ez3UW0njRERtVKGAcRt0WcF~e6SsElUOasxQ-ECZjEKZTYv7dNriEJEwkizs1a9145OCdkeZmvX7q02UPhusv8CsqNYHvTEAPSxtbj5XZ6GERVNItA97RAAVA4fYOFzPqs9siSPfWkeVk0XYQfSUsbc61fYczS1xW0c1QwMtlSAK2VDdqi1pjvMQHIdnnxONFV3n4FT1k~w4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4 ',
                  }}
                  style={{
                    width: responsiveWidth(50),
                    height: responsiveHeight(10),
                    borderRadius: responsiveWidth(3),
                    resizeMode: 'contain',
                    //   backgroundColor:"white"
                  }}
                />
              </View>
              <Text style={styles.title}>KwikM Subscription at just</Text>

              {/* Subscription Details */}
              <View style={styles.subscriptionDetails}>
                {/* <Text style={styles.planName}>Premium Plan</Text> */}
                <Text style={styles.planPrice}>{details.amount}Rs.</Text>
              </View>

              {/* Purchase Button */}
              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={handUpiPayment}>
                <Text style={styles.buttonText}>Purchase Subscription</Text>
                <Font
                  name="arrow-right"
                  size={20}
                  color="#fff"
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>

              {/* Additional Information */}
              <View style={styles.additionalInfo}>
                <Text style={styles.infoText}>
                  - Access to premium features
                </Text>
                <Text style={styles.infoText}>- Ad-free experience</Text>
                {/* Add more information as needed */}
              </View>
            </View>
          </View>

          {/* {showBottomSheet ? (
            <BottomSheet isOpen sliderMaxHeight={responsiveHeight(40)}>
              <View style={styles.addBankFormContainer}>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: responsiveFontSize(2), color: 'black'}}>
                    Enter upi id eg. john@yble/123456789@ybl
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <View style={styles.inputFieldContainer}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Font5
                        name="user-alt"
                        size={responsiveWidth(6)}
                        color="#535353"
                      />
                    </View>
                    <View style={{flex: 5, justifyContent: 'center'}}>
                      <TextInput
                        placeholder="Enter Your Name"
                        placeholderTextColor={'gray'}
                        // autoCapitalize="characters"
                        value={PayeeName}
                        onChangeText={txt => setPayeeName(txt)}
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <View style={styles.inputFieldContainer}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Font5
                        name="id-card-alt"
                        size={responsiveWidth(6)}
                        color="#535353"
                      />
                    </View>
                    <View style={{flex: 5, justifyContent: 'center'}}>
                      <TextInput
                        placeholder="Enter Your Upi Id Number"
                        placeholderTextColor={'gray'}
                        // autoCapitalize="characters"
                        value={upiId}
                        onChangeText={txt => setUpiId(txt)}
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={closeBottomSheet}
                      style={styles.cancleBtn}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}>
                        cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handUpiPayment}
                      style={styles.saveBtn}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'white',
                          fontWeight: '700',
                        }}>
                        Pay Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </BottomSheet>
          ) : null} */}
        </View>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
    backgroundColor: '#EAFFEA',
  },
  subscriptionContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(50),
    borderRadius: responsiveWidth(3),
    backgroundColor: 'white',
    // borderWidth: 1,
    elevation: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  subscriptionDetails: {
    marginBottom: 20,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  planPrice: {
    fontSize: responsiveFontSize(3),
    color: 'green',
    fontWeight: '700',
  },
  purchaseButton: {
    flexDirection: 'row',
    backgroundColor: '#A2159C',
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  additionalInfo: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  headerIcone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitleTxt: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    fontWeight: '700',
  },
  userDetailsContainer: {
    flexDirection: 'row',
    height: responsiveHeight(4),
    margin: responsiveWidth(2),
    marginBottom: responsiveWidth(1),
  },
  userDetailsContainerIconeLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailsContainerIconeRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  userDetailsContainerTitle: {
    flex: 6,
    justifyContent: 'center',
  },
  userDetailsContainerTitleText: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    fontWeight: '400',
    marginLeft: responsiveWidth(2),
  },
  userDetailsContainerTitleTextDelete: {
    fontSize: responsiveFontSize(1.8),
    color: 'red',
    fontWeight: '400',
    marginLeft: responsiveWidth(2),
  },
  addBankFormContainer: {
    flex: 1,
    // alignItems: 'center',
    // backgroundColor: 'yellow',
  },

  inputFieldContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(6),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveWidth(3),
    borderWidth: 1,
    borderColor: '#BCB4B4',
  },

  buttonContainer: {
    height: responsiveHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor:"red"
  },

  cancleBtn: {
    width: responsiveWidth(40),
    paddingVertical: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDCDCD',
    borderRadius: responsiveWidth(10),
  },

  saveBtn: {
    width: responsiveWidth(40),
    paddingVertical: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CB01CF',
    borderRadius: responsiveWidth(10),
  },
  saveDisabledBtn: {
    width: responsiveWidth(40),
    paddingVertical: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: responsiveWidth(10),
  },
  bankDetailesContainer: {
    width: responsiveWidth(96),
    height: responsiveHeight(20),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveWidth(2),
  },
  bankListContainer: {
    // flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(70),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveWidth(5),
  },
  bankDetailes_bankName: {
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontWeight: '700',
    marginLeft: responsiveWidth(5),
  },
});

export default SubcriptionScreen;
