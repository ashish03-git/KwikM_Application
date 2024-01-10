import React, {useState, useEffect, useRef, useId} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Linking,
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
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {add_check_payment_status} from '../redux/Slice';

// import PhonePe from 'react-native-phonepe';

const SubcriptionScreen = () => {
  const [authToken, setAuthToken] = useState(null);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const netInfo = useNetInfo();
  const [details, setDetails] = useState(0);
  const dispatch = useDispatch();
  const PaymentStatusDetails = useSelector(
    state => state.details.check_payment_status,
  );
  const storedUserDetailes = useSelector(state => state.details.login_data);

  useEffect(() => {
    // getValueFromStorage();
    CheckSubscriptionsStatus();
  }, []);


  const CheckSubscriptionsStatus = async () => {
    let payload = {
      user_id: storedUserDetailes.user_id,
      auth_token: storedUserDetailes.auth_token,
    };

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
    dispatch(add_check_payment_status(apiResponse));
    if (apiResponse.subscription === 1) {
      navigation.navigate('addcustomer');
    }
  };

  const handUpiPayment = async () => {
    // console.log("redux payment details",PaymentStatusDetails)

    const apiUrl = 'https://kwikm.in/live/payment.php';
    const queryString = Object.keys(PaymentStatusDetails)
      .map(key => `${key}=${encodeURIComponent(PaymentStatusDetails[key])}`)
      .join('&');
    const fullUrl = `${apiUrl}?${queryString}`;

    Linking.openURL(fullUrl).catch(error => {
      console.error('error in opening url: ' + error);
    });

    // console.log("check status function is called last time")
    CheckSubscriptionsStatus();
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
                <Text style={styles.planPrice}>
                  {PaymentStatusDetails.amount / 100} Rs.
                </Text>
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
});

export default SubcriptionScreen;
