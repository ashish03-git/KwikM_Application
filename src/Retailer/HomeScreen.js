import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Alert,
  StyleSheet,
  StatusBar,
  Linking,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ActivityLoader from '../OtherScreens/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoConnection from '../OtherScreens/NoConnection';
import useNetInfo from '../OtherScreens/useNetInfo';
import {addCategoryId, addProductId, addLogin_data} from '../redux/Slice';

const HomeScreen = () => {
  // states
  const [sellData, setSellData] = useState();
  const [highEarnData, setHighEarnData] = useState();
  const [name, setName] = useState('');
  const [banner, setBanner] = useState(null);
  const [lead_balance, setLeadBalance] = useState(null);
  const [actual_balance, setActualBalance] = useState(null);
  const [highEarningCategory, setHighEarningCategory] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [activityIndicator, setActivityIndicator] = useState(false);
  const netinfo = useNetInfo();
  const storedUserDetailes = useSelector(state => state.details.login_data);

  useEffect(() => {
    AsyncStorage.setItem('login', JSON.stringify(true));
    getUserDetails();
    FetchBalance();
    SellDataFun();
    HighEarningFun();
    BannerImg();

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [highEarningCategory, lead_balance]);

  const getUserDetails = async () => {
    try {
      await AsyncStorage.getItem('user_details').then(details => {
        const userDetails = JSON.parse(details);
        dispatch(addLogin_data(userDetails));
        const userName = userDetails.name;
        // console.log(userName.split(' ')[0])
        setName(userName.split(' ')[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const BannerImg = async () => {
    await fetch('https://kwikm.in/dev_kwikm/api/app_banner.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(img => {
        setBanner(img);
      });
  };

  const handleBackButton = () => {
    if (navigation.isFocused()) {
      // Show an alert only when on the home screen
      Alert.alert(
        'Exit App',
        'Do you want to exit the app?',
        [
          {
            text: 'No',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              // Clear the login status when the user exits
              BackHandler.exitApp();
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      // Navigate to the previous screen if not on the home screen
      navigation.goBack();
    }
    return true; // Prevent the default back button behavior
  };

  // balance
  const FetchBalance = async () => {
    try {
      const response = await fetch(
        'https://kwikm.in/dev_kwikm/api/wallet_balance.php',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({user_id: storedUserDetailes.user_id}),
        },
      );

      const userBalance = await response.json();
      if (userBalance.wallet) {
        setActualBalance(userBalance.wallet.balance);
        setLeadBalance(userBalance.wallet.lead_balance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  // sell and earn
  const SellDataFun = () => {
    fetch('https://kwikm.in/dev_kwikm/api/allcategory.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
        'x-api-key':
          'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
      },
    })
      .then(response => response.json())
      .then(data => {
        setSellData(data.data);
      });
  };

  // high earning
  const HighEarningFun = async () => {
    setActivityIndicator(true);
    await fetch('https://kwikm.in/dev_kwikm/api/higher_earnings.php', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data.higher_earnings[0])
        setHighEarningCategory(data.higher_earnings[0]);
      });

    await fetch('https://kwikm.in/dev_kwikm/api/productByCategory.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
        'x-api-key':
          'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
      },
      body: JSON.stringify({
        category_id: highEarningCategory,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setHighEarnData(data.data);
        setTimeout(() => {
          setActivityIndicator(false);
        }, 300);
      });
  };

  return (
    <>
      {activityIndicator ? (
        <View style={{flex: 1, backgroundColor: '#eaffea'}}>
          <ActivityLoader />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(100),
            backgroundColor: '#eaffea',
          }}>
          {netinfo ? (
            <>
              <StatusBar backgroundColor="#eaffea" />

              <View style={styles.main_container}>
                <View>
                  <View style={styles.name_sec}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: responsiveWidth(1),
                      }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('userProfile')}
                        style={styles.name_sec_user}>
                        <Font5
                          name="user-alt"
                          size={responsiveWidth(5)}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 4.5, flexDirection: 'row'}}>
                      <View
                        style={{
                          flex: 1.2,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}>
                          Hii,{' '}
                        </Text>
                        <Text style={styles.name_txt}>{name}</Text>
                      </View>
                      <View
                        style={{
                          flex: 2.5,
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          paddingLeft: responsiveWidth(1),
                        }}>
                        <Image
                          style={{
                            width: responsiveWidth(30),
                            height: responsiveHeight(4),
                          }}
                          source={{
                            uri: 'https://s3-alpha-sig.figma.com/img/d554/26aa/56a1eb3f928d32506149fad3c301fcd0?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=py44HMVai82BD44sP42arUXBwsgd7FTQImGk2Xn9-Uqjlo3Jrwp1~YmcvDry8i8mYNhTAJnksXThIEEL6TjUBH49DAJlv~xr3QpacTZdSl4eNtDAwSMY7mf4xBslgNhadJzQMQ3n1R6RjMTsTI5~RETE1u~Szlq86EXTlMFpDnTleoLX6EuPkFiIihAsiCss8H94-xYgjZW1htOEbAjd2LFavqMTftBFiLkXZxJdAQNfBkryIfjjlr75cCufKP5p6YbF9qPX57EJ8~LPLuCk~vezAk68bkL2u0YhSl96stm2bEP81VWEMZwScYp9XcQF4VMpey3KpNAF8Om4pq8D1g__',
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.name_sec_icon}>
                      <TouchableOpacity>
                        <Font
                          name="bell"
                          size={responsiveWidth(6)}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      height: responsiveHeight(10),
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                      <LinearGradient
                        colors={['#4DA3C9', '#8DF0E4']}
                        style={{
                          width: responsiveWidth(42.4),
                          height: responsiveHeight(8),
                          borderRadius: responsiveWidth(3),
                          backgroundColor: 'white',
                          flexDirection: 'row',
                          borderWidth: responsiveWidth(0.2),
                          borderColor: '#FFDDDD',
                        }}>
                        <View
                          style={{
                            flex: 1.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: responsiveWidth(13),
                              height: responsiveWidth(13),
                              borderRadius: responsiveWidth(6.5),
                              backgroundColor: '#D4F7FF',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Font6
                              name="wallet"
                              size={responsiveWidth(6.5)}
                              color="#065399"
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingRight: responsiveWidth(3),
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.8),
                              color: 'white',
                              fontWeight: '700',
                            }}>
                            Lead Wallet
                          </Text>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.7),
                              color: 'black',
                            }}>
                            {lead_balance}.00
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <LinearGradient
                        colors={['#9D51FF', '#EF8BFF']}
                        style={{
                          width: responsiveWidth(42),
                          height: responsiveHeight(8),
                          borderRadius: responsiveWidth(3),
                          backgroundColor: 'white',
                          flexDirection: 'row',
                          borderWidth: responsiveWidth(0.2),
                          borderColor: '#FFDDDD',
                        }}>
                        <View
                          style={{
                            flex: 1.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: responsiveWidth(13),
                              height: responsiveWidth(13),
                              borderRadius: responsiveWidth(6.5),
                              backgroundColor: '#D4F7FF',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Font5
                              name="rupee-sign"
                              size={responsiveWidth(6.5)}
                              color="#065399"
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingRight: responsiveWidth(3),
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.8),
                              color: 'white',
                              fontWeight: '700',
                            }}>
                            Actual Wallet
                          </Text>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.7),
                              color: 'black',
                            }}>
                            {actual_balance}.00
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.help_details}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('trainingVideo')}
                      style={styles.help_details_item1}>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={styles.help_details_item_img1}>
                          <Font5
                            name="desktop"
                            size={responsiveWidth(5.2)}
                            color="#065399"
                          />
                        </View>
                      </View>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.help_details_item_txt}>LIVE</Text>
                        <Text style={styles.help_details_item_txt}>
                          TRAINING
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('mylead')}
                      style={styles.help_details_item2}>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={styles.help_details_item_img2}>
                          <Font5
                            name="user-friends"
                            size={responsiveWidth(5.2)}
                            color="#065399"
                          />
                        </View>
                      </View>
                      <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.help_details_item_txt}>MY</Text>
                        <Text style={styles.help_details_item_txt}>LEAD</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('help')}
                      style={styles.help_details_item3}>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={styles.help_details_item_img3}>
                          <Font5
                            name="headset"
                            size={responsiveWidth(5.4)}
                            color="#065399"
                          />
                        </View>
                      </View>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.help_details_item_txt}>GET</Text>
                        <Text style={styles.help_details_item_txt}>HELP</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* home screen banner */}
                <FlatList
                  data={banner}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity style={styles.gradient_container}>
                      <Image
                        source={{uri: item.image_url}}
                        style={{
                          width: responsiveWidth(92),
                          height: responsiveHeight(15),
                          borderRadius: responsiveWidth(3),
                          resizeMode: 'cover',
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>

              {/* Earning section */}
              <View style={{width: responsiveWidth(100)}}>
                {/* High earning section  */}
                <View style={{flex: 1}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'black',
                        fontWeight: '700',
                        margin: responsiveWidth(4),
                        marginTop: 0,
                      }}>
                      Best seller products
                    </Text>
                  </View>
                  <FlatList
                    data={highEarnData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // style={{ height: responsiveHeight(6.5) }}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(addProductId(item));
                          navigation.navigate('productDetails');
                        }}
                        style={{
                          marginLeft: responsiveWidth(3),
                          marginRight: responsiveWidth(2),
                          width: responsiveWidth(45),
                          height: responsiveHeight(11),
                          backgroundColor: '#CCFFFF',
                          borderRadius: responsiveWidth(5),
                          marginBottom: responsiveWidth(5),
                          borderWidth: responsiveWidth(0.2),
                          borderColor: '#FFDDDD',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 0.8,
                          }}>
                          <Text
                            style={{
                              fontWeight: '400',
                              color: 'black',
                              fontSize: responsiveFontSize(1.6),
                            }}>
                            {item.title}
                          </Text>
                          <Image
                            source={{uri: item.logo}}
                            style={{
                              width: responsiveWidth(30),
                              height: responsiveHeight(3),
                              margin: responsiveWidth(1),
                              borderRadius: responsiveWidth(1),
                              resizeMode: 'cover',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            bottom: -8,
                            width: responsiveWidth(36),
                            height: responsiveHeight(3.5),
                            backgroundColor: '#FF9900',
                            borderRadius: responsiveWidth(8),
                            borderWidth: 3,
                            borderColor: 'white',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: responsiveFontSize(1.6),
                            }}>
                            FLAT {item.commission} Rs
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                {/* sell and earn section */}
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                          fontWeight: '700',
                          margin: responsiveWidth(4),
                          marginTop: 0,
                        }}>
                        Sell & Earn
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('products', {id: 3})}
                      style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.6),
                          color: 'black',
                          fontWeight: '400',
                          marginRight: responsiveWidth(2),
                          marginBottom: responsiveWidth(3),
                          // marginTop: responsiveWidth(3)
                        }}>
                        View All
                      </Text>
                      <View style={{marginRight: responsiveWidth(4)}}>
                        <Font
                          name="angle-right"
                          color="black"
                          size={responsiveWidth(4.2)}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={sellData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                      const id = item.id;
                      // console.log(id)

                      return (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(addCategoryId(id));
                              navigation.navigate('products');
                            }}
                            style={{
                              marginLeft: responsiveWidth(3),
                              marginRight: responsiveWidth(2),
                              marginBottom: responsiveWidth(4),
                              width: responsiveWidth(45),
                              height: responsiveHeight(11),
                              backgroundColor: '#BFFFD9',
                              borderRadius: responsiveWidth(5),
                              borderWidth: responsiveWidth(0.2),
                              borderColor: '#FFDDDD',
                            }}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                              <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text
                                  style={{
                                    marginLeft: responsiveWidth(3),
                                    fontSize: responsiveFontSize(1.6),
                                    fontWeight: '400',
                                    color: 'black',
                                    alignSelf: 'center',
                                  }}>
                                  {item.title}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  paddingTop: responsiveWidth(2),
                                }}>
                                <View
                                  style={{
                                    width: responsiveWidth(10),
                                    height: responsiveWidth(10),
                                    borderRadius: responsiveWidth(5),
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  {item.icon ? (
                                    <Font6
                                      name={`${item.icon}`}
                                      size={responsiveWidth(5)}
                                      color="gray"
                                    />
                                  ) : (
                                    <Font6
                                      name="circle-question"
                                      size={responsiveWidth(5)}
                                      color="gray"
                                    />
                                  )}
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontWeight: '700',
                                  color: 'black',
                                  alignSelf: 'flex-start',
                                  marginLeft: responsiveWidth(3),
                                  fontSize: responsiveFontSize(1.6),
                                }}>
                                {' '}
                                Earn Upto {item.commission} Rs
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </>
                      );
                    }}
                  />
                </View>
              </View>

              {/* Referal and subscription */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: responsiveWidth(10),
                }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('apkSubscription')}>
                    <LinearGradient
                      colors={['#64F583', '#5CE5B4']}
                      style={{
                        width: responsiveWidth(45),
                        height: responsiveHeight(10),
                        borderRadius: responsiveWidth(6),
                        flexDirection: 'row',
                        marginLeft: responsiveWidth(3),
                        marginRight: responsiveWidth(2),
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: responsiveWidth(10),
                            height: responsiveWidth(10),
                            borderRadius: responsiveWidth(5),
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image source={require('../../assets/star.png')} />
                        </View>
                      </View>
                      <View style={{flex: 2, justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: '700',
                            color: 'black',
                          }}>
                          APK Subscription
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: '400',
                            color: 'black',
                          }}>
                          Earn Upto Rs.150/-
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('insuaranceProducts')}>
                    <LinearGradient
                      colors={['#64F583', '#5CE5B4']}
                      style={{
                        width: responsiveWidth(45),
                        height: responsiveHeight(10),
                        borderRadius: responsiveWidth(6),
                        flexDirection: 'row',
                        marginLeft: responsiveWidth(3),
                        marginRight: responsiveWidth(2),
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: responsiveWidth(10),
                            height: responsiveWidth(10),
                            borderRadius: responsiveWidth(5),
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image source={require('../../assets/hand.png')} />
                        </View>
                      </View>
                      <View style={{flex: 2, justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: '700',
                            color: 'black',
                          }}>
                          Insurance{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: '400',
                            color: 'black',
                          }}>
                          Earn Upto Rs.150/-
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </>
          ) : (
            <>{activityIndicator ? <ActivityLoader /> : <NoConnection />}</>
          )}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main_container: {
    width: responsiveWidth(100),
    height: responsiveHeight(52),
    padding: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red"
  },
  name_sec: {
    width: responsiveWidth(100),
    height: responsiveHeight(8),
    flexDirection: 'row',
  },
  name_sec_user: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#A6A6A6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name_txt: {
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontWeight: '700',
    // marginHorizontal: responsiveWidth(1)
  },
  name_sec_icon: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient_container: {
    width: responsiveWidth(95.5),
    height: responsiveHeight(16),
    // borderRadius: responsiveWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"yellow"
  },

  help_details: {
    width: responsiveWidth(100),
    height: responsiveHeight(16),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  help_details_item1: {
    width: responsiveWidth(26),
    height: responsiveHeight(13),
    backgroundColor: '#bfffda',
    borderRadius: responsiveWidth(6),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#FFDDDD',
  },
  help_details_item2: {
    width: responsiveWidth(26),
    height: responsiveHeight(13),
    backgroundColor: '#bfffda',
    borderRadius: responsiveWidth(6),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#FFDDDD',
  },
  help_details_item3: {
    width: responsiveWidth(26),
    height: responsiveHeight(13),
    backgroundColor: '#bfffda',
    borderRadius: responsiveWidth(6),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#FFDDDD',
  },
  help_details_item_img1: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(6.5),
    backgroundColor: '#8effbe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  help_details_item_img2: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(6.5),
    backgroundColor: '#8effbe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  help_details_item_img3: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(6.5),
    backgroundColor: '#8effbe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  help_details_item_txt: {
    color: 'black',
    fontSize: responsiveFontSize(1.5),
  },
  sub_main_container2: {
    width: responsiveWidth(100),
    height: responsiveHeight(15),
    backgroundColor: 'white',
  },
  sub_main_container2_txt: {
    marginLeft: responsiveWidth(6),
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    color: 'black',
  },
  sub_main_container2_img: {
    width: responsiveWidth(18),
    flex: 1,
    backgroundColor: '#CBE4FC',
    alignSelf: 'flex-end',
    borderRadius: responsiveWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
