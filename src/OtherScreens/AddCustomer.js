import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
  StatusBar,
  StyleSheet,
  Share,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from './useNetInfo';
import NoConnection from './NoConnection';
import {useSelector, useDispatch} from 'react-redux';
import {add_lead_Details, add_paytm_lead_details} from '../redux/Slice';

const AddCustomer = () => {
  // variables
  const naviagtion = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [full_name, setFull_Name] = useState('');
  const [pan, setPan] = useState('');
  const [mobile_nun, setMobile_Num] = useState('');
  const [pincode, setPincode] = useState('');
  const [email, setEmail] = useState('');
  const [paytmSprintStatus, setPaytmSprintStatus] = useState();
  const [leadGenerationStatus, setLeadGenerationStatus] = useState(true);
  const [screenName, setScreenName] = useState(route.params.screenName);
  const product_id = useSelector(state => state.details.product_id.product_id);
  // console.log("add customer product id ",product_id)
  const category_id = useSelector(state => state.details.category_id);
  // console.log("add customer customer id ",category_id                                                                                  )
  const [required_amount, setRequired_Amount] = useState('0');
  const netInfo = useNetInfo();
  const [msg, setMsg] = useState('');
  const [user_id, setUser_Id] = useState(null);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [mobileErr, setMobileErr] = useState('');
  const [panErr, setPanErr] = useState('');
  const [panErrStatus, setPanErrStatus] = useState(true);
  const [mobileErrStatus, setMobileErrStatus] = useState(true);

  useEffect(() => {
    getUserId();
    // PaytmValidation()
  }, []);

  useEffect(() => {
    RetailerValidation();
  }, [full_name, mobile_nun, pan, pincode, email, required_amount]);

  const RetailerValidation = () => {
    if (
      full_name.length >= 2 &&
      mobile_nun.length == 10 &&
      pan.length == 10 &&
      pincode.length == 6 &&
      email.length >= 11 &&
      required_amount.length >= 0
    ) {
      let panPattern = /^([A-Z]{5})(\d{4})([A-Z])$/;
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (panPattern.test(pan)) {
        // console.log("wotking")
        setPanErrStatus(true);
        setButtonStatus(true);
      } else {
        // console.log("wotking")
        setPanErrStatus(false);
        setPanErr('enter a valid pancard number');
      }

      // console.log("validated")
    } else {
      setButtonStatus(false);
    }
  };

  const getUserId = async () => {
    try {
      await AsyncStorage.getItem('user_id').then(userId => {
        // console.log(userId)
        setUser_Id(JSON.parse(userId));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const VarifyPaytmDetails = () => {
    try {
      const ob = {
        customer_name: full_name,
        customer_mobile: mobile_nun,
        user_id: user_id,
      };
      fetch('https://kwikm.in/dev_kwikm/api/pay-sprint.php', {
        method: 'POST',
        body: JSON.stringify(ob),
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
          if (data.status === 'Success') {
            PaytmSprint(data);
          }
          if (data.status === 'Failure') {
            setPaytmSprintStatus(false);
            setMsg(data.message);
            setTimeout(() => {
              setMsg('');
            }, 1000);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const PaytmSprint = data => {
    let ob = {
      refid: data.refid,
      merchantcode: data.merchantcode,
      customer_name: data.customer_name,
      customer_mobile: data.customer_mobile,
    };

    fetch(
      'https://paysprint.in/service-api/api/v1/service/paytm-qr/Registration/getlink',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorisedkey: 'YjVhM2YzYjZkNWQyNjBjOWE5MzgwZjAxYjU1NTEwZmU=',
          Token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXFpZCI6Ijc2NjUyNjM0NzgiLCJwYXJ0bmVySWQiOiJQUzAwMTU3OCIsInRpbWVzdGFtcCI6MTY5ODc1Mjc4Mn0.kwzPhhax0580Cz6eHjLMDj_gw-kes1rydb8dAFDUkq0',
        },
        body: JSON.stringify(ob),
      },
    )
      .then(response => response.json())
      .then(paySprintData => {
        setPaytmSprintStatus(paySprintData.status);

        if (paySprintData.status) {
          setMsg(paySprintData.message);
          dispatch(add_lead_Details([paySprintData, ob]));
          setTimeout(() => {
            setMsg('');
            naviagtion.navigate('leadSuccessMsg', {screen: 'paytm'});
          }, 1000);
        } else {
          setMsg(paySprintData.message);
          setTimeout(() => {
            setMsg('');
          }, 1000);
        }
      });
  };

  const VerifyDetails = async () => {
    const baseUrl =
      'https://tryleadapi.banksathi.com/api/b2b/checkCustomerExists';
    const params = {
      mobile_no: mobile_nun,
      pan: pan,
      pincode: pincode,
      category_id: category_id,
      is_user_validated: '1',
    };
    // console.log("params sending to banksathi api",params)
    const queryString = Object.keys(params)
      .map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join('&');

    const url = `${baseUrl}?${queryString}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
        'x-api-key':
          'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
        // Add any other necessary headers here
      },
    });
    // console.log(response.ok)+
    if (response.ok) {
      const data = await response.json();
      const customerId = data.data.profile_details.customer_id;
      if (customerId) {
        AddLead(customerId);
      }
    } else {
      const data = await response.json();
      // console.log(data)
      if (data.message.pan) {
        setPanErrStatus(false);
        setPanErr(data.message.pan[0]);
      }
      if (data.message.mobile_no) {
        setMobileErrStatus(false);
        setMobileErr(data.message.mobile_no[0]);
      }
      setTimeout(() => {
        // console.log("stop")
        setPanErrStatus(true);
        setMobileErrStatus(true);
        setMobileErr('');
        setPanErr('');
      }, 1500);
    }
  };

  const AddLead = async customerId => {
    // console.log("add lead", customerId)
    const ob = {
      full_name: full_name,
      mobile_no: mobile_nun,
      customer_id: customerId,
      pincode: pincode,
      pan: pan,
      email: email,
      product_id: product_id,
      category_id: category_id,
      required_amount: required_amount,
      user_id: user_id,
    };
    // console.log("add lead final api running", ob)
    try {
      await fetch('https://kwikm.in/dev_kwikm/api/add-leads.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
          'x-api-key':
            'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
        },
        body: JSON.stringify(ob),
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
          if (data.status) {
            dispatch(add_lead_Details([data, ob]));
            setLeadGenerationStatus(data.status);
            setMsg(data.message);
            setTimeout(() => {
              naviagtion.navigate('leadSuccessMsg', {screen: 'retailer'});
              setMsg('');
            }, 400);
          } else {
            setLeadGenerationStatus(false);
            setMsg(data.message);
            setTimeout(() => {
              setMsg('');
            }, 1000);
          }
        });
    } catch (error) {
      console.error('Failed to add lead:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#eaffea'}}>
      {netInfo ? (
        <>
          <StatusBar backgroundColor={'#eaffea'} />

          <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => naviagtion.goBack()}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Font5
                name="arrow-left"
                color="black"
                size={responsiveWidth(6)}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 5,
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
                  Add Customer
                </Text>
              </View>
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {/* condition based form showing if user is comming from patym screen the this screen will show */}
            {screenName === 'paytm' ? (
              <View
                style={{
                  width: responsiveWidth(95),
                  height: responsiveHeight(45),
                  backgroundColor: 'white',
                  padding: responsiveWidth(5),
                  borderRadius: responsiveWidth(3),
                }}>
                <View style={{flex: 1}}>
                  <View style={{marginTop: responsiveWidth(4)}}>
                    <TextInput
                      onChangeText={text => setFull_Name(text)}
                      style={{
                        fontSize: responsiveFontSize(2),
                        paddingLeft: responsiveWidth(8),
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                        color: 'black',
                      }}
                      value={full_name}
                      placeholder="Full Name"
                      placeholderTextColor={'gray'}
                    />
                  </View>
                  <View style={{marginTop: responsiveWidth(4)}}>
                    <TextInput
                      onChangeText={text => setMobile_Num(text)}
                      style={{
                        fontSize: responsiveFontSize(2),
                        paddingLeft: responsiveWidth(8),
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                      }}
                      value={mobile_nun}
                      maxLength={10}
                      placeholder="Customer Mobile Number"
                      placeholderTextColor={'gray'}
                    />
                  </View>

                  {paytmSprintStatus ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: responsiveWidth(4),
                        paddingTop: responsiveWidth(2),
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'green',
                        }}>
                        {msg}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: responsiveWidth(4),
                        paddingTop: responsiveWidth(2),
                      }}>
                      <Text
                        style={{fontSize: responsiveFontSize(2), color: 'red'}}>
                        {msg}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View style={{margin: responsiveWidth(4), marginTop: 0}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: 'black',
                      }}>
                      By continuing you agree
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.8),
                          color: '#9B19A6',
                          fontWeight: '600',
                        }}>
                        {' '}
                        Terms & Conditions{' '}
                      </Text>
                      and
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.8),
                          color: '#9B19A6',
                          fontWeight: '600',
                        }}>
                        {' '}
                        Privacy Policy
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      margin: responsiveWidth(4),
                      marginTop: responsiveWidth(0),
                    }}>
                    <TouchableOpacity
                      onPress={VarifyPaytmDetails}
                      style={{
                        height: responsiveHeight(6),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#A2159C',
                        borderRadius: responsiveWidth(10),
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'white',
                          fontWeight: '700',
                        }}>
                        Continue
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        marginTop: responsiveWidth(3),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Font
                        name="whatsapp"
                        color="#02A208"
                        size={responsiveWidth(5)}
                      />
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.8),
                          color: 'black',
                          marginLeft: responsiveWidth(4),
                        }}>
                        We will notify you on WhatsApp{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <>
                <View
                  style={{
                    width: responsiveWidth(95),
                    backgroundColor: 'white',
                    padding: responsiveWidth(5),
                    borderRadius: responsiveWidth(3),
                  }}>
                  <View style={{marginTop: responsiveWidth(4)}}>
                    <TextInput
                      onChangeText={text => setFull_Name(text)}
                      placeholderTextColor={'gray'}
                      style={{
                        fontSize: responsiveFontSize(2),
                        paddingLeft: responsiveWidth(8),
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                        color: 'black',
                      }}
                      value={full_name}
                      placeholder="Full Name"
                    />
                  </View>

                  <View style={{marginTop: responsiveWidth(4)}}>
                    <TextInput
                      onChangeText={text => setPan(text)}
                      placeholderTextColor={'gray'}
                      style={{
                        fontSize: responsiveFontSize(2),
                        paddingLeft: responsiveWidth(8),
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                        color: 'black',
                      }}
                      value={pan}
                      placeholder="Pan No."
                      autoCapitalize="characters"
                      maxLength={10}
                    />
                  </View>

                  {panErrStatus ? null : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: 'red',
                        margin: responsiveWidth(2),
                        marginBottom: 0,
                      }}>
                      {panErr}
                    </Text>
                  )}

                  <View style={{marginTop: responsiveWidth(4)}}>
                    <TextInput
                      onChangeText={text => setMobile_Num(text)}
                      placeholderTextColor={'gray'}
                      style={{
                        fontSize: responsiveFontSize(2),
                        paddingLeft: responsiveWidth(8),
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                        color: 'black',
                      }}
                      keyboardType="numeric"
                      maxLength={10}
                      value={mobile_nun}
                      placeholder="Customer Mobile Number "
                    />
                  </View>

                  {mobileErrStatus ? null : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: 'red',
                        margin: responsiveWidth(2),
                        marginBottom: 0,
                      }}>
                      {mobileErr}
                    </Text>
                  )}

                  <View style={{marginTop: responsiveWidth(4)}}>
                    <TextInput
                      onChangeText={text => setPincode(text)}
                      style={{
                        fontSize: responsiveFontSize(2),
                        paddingLeft: responsiveWidth(8),
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                        color: 'black',
                      }}
                      keyboardType="numeric"
                      value={pincode}
                      maxLength={6}
                      placeholder="Pincode"
                      placeholderTextColor={'gray'}
                    />
                  </View>

                  <View style={{marginTop: responsiveWidth(4)}}>
                    <TextInput
                      onChangeText={text => setEmail(text)}
                      style={{
                        fontSize: responsiveFontSize(2),
                        paddingLeft: responsiveWidth(8),
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                        color: 'black',
                      }}
                      value={email}
                      placeholder="Email Address"
                      placeholderTextColor={'gray'}
                    />
                  </View>

                  <View style={{marginTop: responsiveWidth(4)}}>
                    <TextInput
                      onChangeText={text => setRequired_Amount(text)}
                      style={{
                        fontSize: responsiveFontSize(2),
                        paddingLeft: responsiveWidth(8),
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                        color: 'black',
                      }}
                      keyboardType="numeric"
                      value={required_amount}
                      placeholder="Required amount"
                      placeholderTextColor={'gray'}
                    />
                  </View>

                  {leadGenerationStatus ? (
                    <View
                      style={{
                        marginBottom: responsiveWidth(4),
                        marginTop: responsiveWidth(4),
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'red',
                          alignSelf: 'center',
                        }}>
                        {null}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        marginBottom: responsiveWidth(4),
                        marginTop: responsiveWidth(4),
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'red',
                          alignSelf: 'center',
                        }}>
                        {msg}
                      </Text>
                    </View>
                  )}

                  <View style={{marginLeft: responsiveWidth(5)}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: 'black',
                      }}>
                      By continuing you agree
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.8),
                          color: '#9B19A6',
                          fontWeight: '600',
                        }}>
                        {' '}
                        Terms & Conditions{' '}
                      </Text>
                      and
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.8),
                          color: '#9B19A6',
                          fontWeight: '600',
                        }}>
                        {' '}
                        Privacy Policy
                      </Text>
                    </Text>
                  </View>

                  <View
                    style={{
                      margin: responsiveWidth(4),
                      marginTop: responsiveWidth(4),
                    }}>
                    {buttonStatus ? (
                      <TouchableOpacity
                        onPress={VerifyDetails}
                        style={{
                          height: responsiveHeight(6),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#A2159C',
                          borderRadius: responsiveWidth(10),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'white',
                            fontWeight: '700',
                          }}>
                          Continue
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        disabled
                        style={{
                          height: responsiveHeight(6),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'gray',
                          borderRadius: responsiveWidth(10),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'white',
                            fontWeight: '700',
                          }}>
                          Continue
                        </Text>
                      </TouchableOpacity>
                    )}

                    <View
                      style={{
                        marginTop: responsiveWidth(3),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Font
                        name="whatsapp"
                        color="#02A208"
                        size={responsiveWidth(5)}
                      />
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.8),
                          color: 'black',
                          marginLeft: responsiveWidth(4),
                        }}>
                        We will notify you on WhatsApp{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </>
      ) : (
        <NoConnection />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {
    marginLeft: responsiveWidth(6),
  },
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    // alignItems:"center",
    paddingLeft: responsiveWidth(6),
  },
  txt: {
    fontSize: 18,
    color: 'black',
  },
  name: {
    fontSize: 16,
    color: 'black',
  },
  phoneNumber: {
    color: '#888',
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#5551FE',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default AddCustomer;
