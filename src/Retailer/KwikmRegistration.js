import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import ActivityLoader from '../OtherScreens/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';

const KwikmRegistration = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobile_num, setMobile_Num] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState(false);
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [activityIndicator, setActivityIndicatiors] = useState(false);
  const netInfo = useNetInfo();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    setActivityIndicatiors(true);
    getUserDetails();
    setTimeout(() => {
      setActivityIndicatiors(false);
    }, 1000);
  }, []);

  const getUserDetails = async () => {
    await AsyncStorage.getItem('user_id').then(user_id => {
      setUserId(JSON.parse(user_id));
    });
    await AsyncStorage.getItem('auth_token').then(auth => {
      // console.log(auth)
      setAuthToken(JSON.parse(auth));
    });
  };

  const submitHandler = async () => {
    const payload = {
      user_id: userId,
      auth_token: authToken,
      name: name,
      email: email,
      phone: mobile_num,
    };
    // console.log(payload);
    let response = await fetch(
      'https://kwikm.in/dev_kwikm/api/kwikm_onboarding.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const apiResponse = await response.json();
    // console.log(apiResponse);
    if (apiResponse.success) {
      setStatus(true);
      setMsg(apiResponse.success);
      setTimeout(() => {
        setStatus(null);
        setMsg('');
        setName('');
        setEmail('');
        setMobile_Num('');
      }, 2000);
    } else {
      setStatus(false);
      setErr(apiResponse.error);
      setTimeout(() => {
        setStatus(null);
        setErr('');
      }, 2000);
    }

  };

  return (
    <>
      {netInfo ? (
        <>
          <View style={{flex: 1, backgroundColor: '#eaffea'}}>
            
            {/* screen title */}
            <View style={{height: responsiveHeight(7), flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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
                    KwikM Registration
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                marginHorizontal: responsiveWidth(3),
                borderRadius: responsiveWidth(3),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Image
                source={{
                  uri: 'https://s3-alpha-sig.figma.com/img/d554/26aa/56a1eb3f928d32506149fad3c301fcd0?Expires=1704067200&Signature=GsWU2Fi7~7trotpbLAk7HlSQt9X1LMW~f8~Eomx5srzmJx9QqyjA66UhfjTIeOONoyh-x6ynHa--mqesRZYts~MvxC7D9Co8r7~pENNxT3nRrrlDAzQfFvsrrYW22Pwz4A~MQRt7xZ08rBEIb6u9gl9bYdhjo4wlli7V5ILsAKkIx86pG5xVJN4IlUavs5Bg7uqvcL3~tHzSE4-8iX-W7W2vgioOacMNtCsiL1pQBbKf2Ub0y~ouM2BNrlZwHNz5iJpz8Q1F~Q6RM3oSK-IyEmDkPtqvoc17cD6xUKAo9XUm243yBm8ZcOujBECjXxaQ5wMeIHVpr4RB69ULQYQLbw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
                }}
                style={{
                  width: responsiveWidth(96),
                  height: responsiveHeight(30),
                  resizeMode: 'contain',
                  borderRadius: responsiveWidth(4),
                }}
              />
            </View>

            <View style={{flex: 2}}>
              <View
                style={{
                  flex: 1,
                  //   backgroundColor: 'red',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'black',
                    fontWeight: '500',
                    marginLeft: responsiveWidth(4),
                  }}>
                  KwikM onboarding
                </Text>
              </View>

              <View
                style={{
                  flex: 6,
                  alignItems: 'center',
                }}>
                <View style={style.inputFieldContainer}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Font5
                      name="user-alt"
                      size={responsiveWidth(5.5)}
                      color="#535353"
                    />
                  </View>
                  <View style={{flex: 5, justifyContent: 'center'}}>
                    <TextInput
                      placeholder="Full Name"
                      placeholderTextColor={'gray'}
                      onChangeText={txt => setName(txt)}
                      value={name}
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'black',
                      }}
                    />
                  </View>
                </View>

                <View style={style.inputFieldContainer}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Font5
                      name="phone-alt"
                      size={responsiveWidth(5.5)}
                      color="#535353"
                    />
                  </View>
                  <View style={{flex: 5, justifyContent: 'center'}}>
                    <TextInput
                      placeholder="Mobile Number"
                      placeholderTextColor={'gray'}
                      keyboardType="numeric"
                      value={mobile_num}
                      maxLength={10}
                      onChangeText={txt => setMobile_Num(txt)}
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'black',
                      }}
                    />
                  </View>
                </View>

                <View style={style.inputFieldContainer}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunity
                      name="email"
                      size={responsiveWidth(6.8)}
                      color="#535353"
                    />
                  </View>
                  <View style={{flex: 5, justifyContent: 'center'}}>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={'gray'}
                      autoCapitalize="none"
                      value={email}
                      onChangeText={txt => setEmail(txt)}
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'black',
                      }}
                    />
                  </View>
                </View>
              </View>

              {status ? (
                <View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginBottom: responsiveWidth(3),
                      fontSize: responsiveFontSize(2),
                      color: 'green',
                    }}>
                    {msg}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginBottom: responsiveWidth(3),
                      fontSize: responsiveFontSize(2),
                      color: 'red',
                    }}>
                    {err}
                  </Text>
                </View>
              )}

              {/* button container */}
              <View style={style.btnContainer}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={style.cancleBtn}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={submitHandler}
                  style={style.activeBtn}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'white',
                      fontWeight: '700',
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
 
          </View>
        </>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

const style = StyleSheet.create({
  inputFieldContainer: {
    width: responsiveWidth(94),
    height: responsiveHeight(6),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveWidth(2),
    borderWidth: 1,
    borderColor: '#BCB4B4',
  },
  activeBtn: {
    width: responsiveWidth(42),
    paddingVertical: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0545A6',
    borderWidth: 1,
    borderColor: '#0545A6',
    borderRadius: responsiveWidth(3),
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    //   backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cancleBtn: {
    width: responsiveWidth(42),
    paddingVertical: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0545A6',
    borderRadius: responsiveWidth(3),
  },
});
export default KwikmRegistration;
