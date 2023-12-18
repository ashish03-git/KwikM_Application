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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MyStats from '../OtherScreens/MyStats';
import LottieView from 'lottie-react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';

const PaymentSettingScreen = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [data, setData] = useState('');
  const [bankName, setBankName] = useState('');
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');

  return (
    <>
      {netInfo ? (
        <View style={styles.container}>
          <StatusBar backgroundColor={'#EAFFEA'} />

          {/* header */}
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
                  Payment Settings
                </Text>
              </View>
            </View>
          </View>

          {/* linear gradient container */}
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LinearGradient
              colors={['#DB3DB8', '#3546A0']}
              style={{
                width: responsiveWidth(96),
                height: responsiveHeight(12),
                borderRadius: responsiveWidth(3),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: responsiveWidth(3),
                }}>
                <View
                  style={{
                    borderRadius: responsiveWidth(3),
                    width: responsiveWidth(20),
                    height: responsiveHeight(8),
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunity
                    name="folder-upload"
                    size={responsiveFontSize(6)}
                    color="black"
                  />
                </View>
              </View>

              <View style={{flex: 3, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    color: 'white',
                    fontWeight: '700',
                  }}>
                  Manage Account
                </Text>

                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'white',
                    // fontWeight: '700',
                  }}>
                  select primary account to receive money and you can change it
                  any time.
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* bank account */}
          <View style={styles.bankContainer}>
            <View style={styles.bankTitle}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  color: 'black',
                  fontWeight: '700',
                  marginBottom: responsiveWidth(4),
                }}>
                Bank Accounts
              </Text>
              <View style={styles.bankTitleBaseLine} />
            </View>

            <View style={styles.noBankFound}>
              <LottieView
                source={require('../../assets/noDataFound')}
                style={{
                  width: responsiveWidth(70),
                  height: responsiveHeight(35),
                }}
                loop
              />

              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  color: 'black',
                  fontWeight: '700',
                }}>
                No Bank Found...
              </Text>

              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: 'black',
                  fontWeight: '400',
                }}>
                you have not added any bank account.
              </Text>

              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: 'black',
                  fontWeight: '400',
                }}>
                Please add a bank account.
              </Text>

              <View style={{marginTop: responsiveWidth(5)}}>
                <TouchableOpacity style={styles.noBankFOundBtn}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'white',
                      fontWeight: '700',
                    }}>
                    Add Bank Account
                  </Text>
                </TouchableOpacity>
              </View>

              <BottomSheet
                sliderMaxHeight={responsiveHeight(80)}
                initialSnap={0} // 0 indicates the closed position
                snapPoints={[0, responsiveHeight(80)]}>
                <View style={styles.addBankFormContainer}>
                  <View style={styles.addBankFormTitle}>
                    <Text style={styles.addBankFormTitleTxt}>
                      Add Bank Account
                    </Text>
                  </View>

                  <View style={styles.addBankFormSubTitle}>
                    <Text style={styles.addBankFormSubTitleTxt}>
                      Name should be same as in PAN card
                    </Text>
                    <Text style={styles.addBankFormSubTitleTxt}>
                      and bank account.
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: responsiveWidth(94),
                        height: responsiveHeight(6),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderRadius: responsiveWidth(3),
                        marginTop: responsiveWidth(3),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                      }}>
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
                          placeholder="Select Bank"
                          placeholderTextColor={'gray'}
                          onChangeText={txt => setBankName(txt)}
                          value={bankName}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: responsiveWidth(94),
                        height: responsiveHeight(6),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderRadius: responsiveWidth(3),
                        marginTop: responsiveWidth(3),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                      }}>
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
                          placeholder="Name As Per Aadhar Card"
                          placeholderTextColor={'gray'}
                          keyboardType="numeric"
                          value={name}
                          //   maxLength={10}
                          onChangeText={txt => setName(txt)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: responsiveWidth(94),
                        height: responsiveHeight(6),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderRadius: responsiveWidth(3),
                        marginTop: responsiveWidth(3),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="address-card"
                          size={responsiveWidth(5.8)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Account Number "
                          placeholderTextColor={'gray'}
                          value={accountNumber}
                          onChangeText={txt => setAccountNumber(txt)}
                          //   autoCapitalize="characters"
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: responsiveWidth(94),
                        height: responsiveHeight(6),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderRadius: responsiveWidth(3),
                        marginTop: responsiveWidth(3),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="address-card"
                          size={responsiveWidth(5.8)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Confirm Account Number"
                          placeholderTextColor={'gray'}
                          value={confirmAccountNumber}
                          onChangeText={txt => setConfirmAccountNumber(txt)}
                          //   autoCapitalize="characters"
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: responsiveWidth(94),
                        height: responsiveHeight(6),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderRadius: responsiveWidth(3),
                        marginTop: responsiveWidth(3),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="address-card"
                          size={responsiveWidth(5.8)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="IFSC Code"
                          placeholderTextColor={'gray'}
                          value={ifsc}
                          onChangeText={txt => setIfsc(txt)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 3,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      width:responsiveWidth(100),
                      //   marginTop: responsiveWidth(5),
                      paddingBottom: responsiveWidth(8),
                    }}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                        width: responsiveWidth(42),
                        paddingVertical: responsiveWidth(3),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: '#0545A6',
                        borderRadius: responsiveWidth(3),
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      // onPress={Pice_Enquiry}
                      style={{
                        width: responsiveWidth(42),
                        paddingVertical: responsiveWidth(3),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#0545A6',
                        borderWidth: 1,
                        borderColor: '#0545A6',
                        borderRadius: responsiveWidth(3),
                      }}>
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
              </BottomSheet>
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
    flex: 1,
    backgroundColor: '#EAFFEA',
  },
  bankContainer: {
    flex: 6,
  },
  bankTitle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bankTitleBaseLine: {
    width: responsiveWidth(100),
    height: 2,
    backgroundColor: '#CB01CF',
    borderRadius: responsiveWidth(2),
  },
  noBankFound: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBankFOundBtn: {
    width: responsiveWidth(70),
    height: responsiveHeight(6),
    backgroundColor: '#CB01CF',
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBankFormContainer: {
    height: responsiveHeight(80),
  },
  addBankFormTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBankFormTitleTxt: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    fontWeight: '700',
  },
  addBankFormSubTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveWidth(2),
  },
  addBankFormSubTitleTxt: {
    fontSize: responsiveFontSize(1.8),
    // color: 'black',
    // fontWeight: '700',
  },
});

export default PaymentSettingScreen;
