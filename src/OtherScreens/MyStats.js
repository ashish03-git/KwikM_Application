import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import ActivityLoader from './ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const MyStats = () => {
  const navigation = useNavigation();
  const [leadList, setLeadList] = useState([]);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [user_Id, setUser_Id] = useState(null);
  const ProductDetails = useSelector(state => state.details.product_id);
  // console.log("category id from my stats before add custormer", data[0], data[1], data[2])
  // const screen_name = data[2]
  // console.log(ProductDetails)

  useEffect(() => {
    setActivityIndicator(true);
    fetchData();
    setTimeout(() => {
      setActivityIndicator(false);
    }, 1000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchData = async () => {
    // console.log("hiii")
    try {
      const userId = await AsyncStorage.getItem('user_id');
      setUser_Id(JSON.parse(userId));
      // console.log(userId)
      if (userId) {
        await FethchLeadStatus(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FethchLeadStatus = async userId => {
    const ob = {
      user_id: userId,
      product_id: ProductDetails.product_id,
    };
    try {
      await fetch('https://kwikm.in/dev_kwikm/api/lead_list.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ob),
      })
        .then(response => response.json())
        .then(apiData => {
          if (apiData.lead_list) {
            // console.log("hiii")
            setLeadList(apiData.lead_list);
          } else {
            setLeadList([]);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeadShare = ob => {
    // console.log(ob);

    const message = `

        Lead Details :

        Name: ${ob.full_name}\n
        Phone: ${ob.mobile_no}\n
        Pan: ${ob.pan}\n
        Email: ${ob.email}\n
        Lead Code: ${ob.lead_code}\n`;

    const whatsappUrl = `whatsapp://send?phone=+91${
      ob.mobile_no
    }&text=${encodeURIComponent(message)}`;
    Linking.canOpenURL(whatsappUrl)
      .then(supported => {
        if (!supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          Alert.alert(
            'WhatsApp is not installed',
            [
              {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => {},
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  // console.log("checking data available in lead liset",leadList)
  const listItemStyle = useMemo(
    () => ({
      width: responsiveWidth(92),
      height: responsiveHeight(10),
      borderRadius: responsiveWidth(3),
      backgroundColor: 'white',
      alignSelf: 'center',
      flexDirection: 'row',
      marginTop: responsiveWidth(5),
    }),
    [],
  );

  const buttonStyle = useMemo(
    () => ({
      width: responsiveWidth(70),
      height: responsiveHeight(6),
      borderRadius: responsiveWidth(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#A2159C',
      position: 'absolute',
      zIndex: 1,
      // marginTop:responsiveWidth(3)
      top: 0.5,
      // right:1
    }),
    [],
  );

  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {activityIndicator ? (
          <View
            style={{width: responsiveWidth(100), height: responsiveHeight(75)}}>
            <ActivityLoader />
          </View>
        ) : (
          <View
            style={{
              width: responsiveWidth(100),
              height:
                leadList.length > 0
                  ? responsiveHeight(80)
                  : responsiveHeight(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {leadList.length > 0 ? (
              <>
                <FlatList
                  data={leadList}
                  showsVerticalScrollIndicator={false}
                  style={{marginBottom: responsiveHeight(5)}}
                  renderItem={({item}) => {
                    const logo = item.full_name[0]
                      ? item.full_name[0].toUpperCase()
                      : null;

                    return (
                      <View
                        style={{
                          width: responsiveWidth(94),
                          height: responsiveHeight(15),
                          borderRadius: responsiveWidth(3),
                          backgroundColor: 'white',
                          marginTop: responsiveWidth(3),
                          marginBottom: responsiveWidth(3),
                          borderWidth: 1,
                          borderColor: '#E3E3E3',
                        }}>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                width: responsiveWidth(14),
                                height: responsiveWidth(14),
                                borderRadius: responsiveWidth(7),
                                backgroundColor: '#00D4C7',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: responsiveFontSize(4.5),
                                  color: 'white',
                                  fontWeight: '700',
                                }}>
                                {logo}
                              </Text>
                            </View>
                          </View>
                          <View style={{flex: 4, flexDirection: 'row'}}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontWeight: '700',
                                  fontSize: responsiveFontSize(1.7),
                                }}>
                                {item.full_name}
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: responsiveFontSize(1.6),
                                }}>
                                {item.email}
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: responsiveFontSize(1.6),
                                }}>
                                +91 {item.mobile_no}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 2,
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  width: responsiveWidth(25),
                                  height: responsiveHeight(4),
                                  // backgroundColor: 'red',
                                  justifyContent: 'center',
                                  alignItems: 'flex-end',
                                }}>
                                <TouchableOpacity
                                  onPress={() => handleLeadShare(item)}>
                                  <Font5
                                    name="share-alt"
                                    size={responsiveWidth(5.5)}
                                  />
                                </TouchableOpacity>
                              </View>

                              <View
                                style={{
                                  height: responsiveHeight(4),
                                }}>
                                <View
                                  style={{
                                    width: responsiveWidth(25),
                                    height: responsiveHeight(3),
                                    borderRadius: responsiveWidth(2),
                                    backgroundColor: '#99FFAF',
                                    marginTop: responsiveWidth(3),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  }}>
                                  <Font5 name="rupee-sign" color="black" />
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.65),
                                      marginLeft: responsiveWidth(1.5),
                                      color: 'black',
                                      fontWeight: '700',
                                    }}>
                                    {item.commission}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            height: responsiveWidth(0.2),
                            backgroundColor: '#BFBFBF',
                          }}
                        />
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{color: 'black'}}>{item.pan}</Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(0.3),
                              backgroundColor: '#BFBFBF',
                            }}
                          />
                          {item.status === 'Success' ? (
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{color: '#03A013', fontWeight: '700'}}>
                                {item.status}
                              </Text>
                            </View>
                          ) : null}
                          {item.status === 'InProgress' ? (
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{color: '#FF6B00', fontWeight: '700'}}>
                                {item.status}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{color: '#FF6B00', fontWeight: '700'}}>
                                {item.status}
                              </Text>
                            </View>
                          )}
                          {item.status === 'Rejected' ? (
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{color: '#FF0000', fontWeight: '700'}}>
                                {item.status}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    );
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('addcustomer', {screenName: 'product'})
                  }
                  style={{
                    width: responsiveWidth(16),
                    height: responsiveWidth(16),
                    borderRadius: responsiveWidth(8),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#A2159C',
                    position: 'absolute',
                    zIndex: 1,
                    top: responsiveHeight(65),
                    left: responsiveWidth(75), // Adjusted left position
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(6),
                      color: 'white',
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={listItemStyle}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image source={require('../../assets/mystats.png')} />
                  </View>
                  <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.4),
                        color: '#690B6A',
                        fontWeight: '700',
                      }}>
                      Earn {ProductDetails.commission} Rs.
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.9),
                        color: 'black',
                      }}>
                      On your customer’s successful card activation.
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: responsiveWidth(92),
                    height: responsiveHeight(32),
                    borderRadius: responsiveWidth(3),
                    backgroundColor: 'white',
                    marginTop: responsiveWidth(5),
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image source={require('../../assets/mystatsUser.png')} />
                  </View>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.2),
                          color: 'black',
                          fontWeight: '700',
                        }}>
                        No Customer Found
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'center',
                        width: responsiveWidth(80),
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.9),
                          color: 'black',
                        }}>
                        Add customer and earn extra income. Track the details
                        anytime.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('addcustomer', {
                          screenName: 'product',
                        })
                      }
                      style={buttonStyle}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'white',
                        }}>
                        Add New Customer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default MyStats;
