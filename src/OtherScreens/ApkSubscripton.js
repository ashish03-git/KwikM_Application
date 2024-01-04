import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import ActivityLoader from './ActivityLoader';
import useNetInfo from './useNetInfo';
import NoConnection from './NoConnection';

const ApkSubscripton = () => {
  const navigation = useNavigation();
  const [activityIndicator, setActivityIndicator] = useState(false);
  const netInfo = useNetInfo();

  useEffect(() => {
    setActivityIndicator(true);
    setTimeout(() => {
      setActivityIndicator(false);
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#eaffea'}}>
      {netInfo ? (
        <>
          {activityIndicator ? (
            <ActivityLoader />
          ) : (
            <>
              <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
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
                      APK Subscriptions
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  height: responsiveHeight(15),
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('paytmScreen')}
                  style={{
                    width: responsiveWidth(46),
                    height: responsiveHeight(12),
                    borderRadius: responsiveWidth(4),
                    elevation: 2,
                    shadowColor: 'black',
                  }}>
                  <Image
                    source={{
                      uri: 'https://s3-alpha-sig.figma.com/img/9187/ed89/ad6786507da60004a172c93ff2bfda2c?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VkH0cvP9htPfJJ9W3gDAyhx9PnKIr7ZGMrGPVxu9Cu2ALiXS-qOLHOTJTOm6RkLWlN5DbEBTi2XR-byB93chV~e9DF-e4yzUqTEvbKZA34Wi5r218zdTSoc8aI6LRDkVXY0TGirGXRuK84poTICvhKc6-BiIP6XeCPObW9tPyvMDj40sz6u2N7-2bBU9ZcbGbWXzScNOzbKEZEYnieus0TR5qLqWszxIUy6GEzOBO3fDlP2Szjf4-CZCHB~uYaCn5vweZGJcjBuDHD8wlVFmyWlhoufmBX5qwHU-gNF64Rkws5HOh96cwa5JQlRq~3YqB01Ke0tEBHOKieUemCH9eQ__',
                    }}
                    style={{
                      width: responsiveWidth(46),
                      height: responsiveHeight(12),
                      borderRadius: responsiveWidth(4),
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('piceLeadScreen')}
                  style={{
                    width: responsiveWidth(46),
                    height: responsiveHeight(12),
                    borderRadius: responsiveWidth(4),
                    elevation: 2,
                    shadowColor: 'black',
                  }}>
                  <Image
                    source={{
                      uri: 'https://s3-alpha-sig.figma.com/img/194e/d3d3/9b84c17b53d2bc62ad00267968c6be6a?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=emSfdy-JZqbqa8M5qPDu7dJofngj0Ud~GzYuIRM6Td8pSX3Sxc3ySmkCHvWONMJHlU2WdySgVTRG~-TgHDMXJp5K2swU82NQkZiYVelFFa3w6QNJ98xuF520xa0gABBhC0mrdu4hrdeLfY3uC0MTB6Tp8F3aTyAr2bA4ZetNE2y0EEIwo2wx0rFwWewzbOVVDSHYQ~gXTnXLwiukwLKCsPbCXd1rCGTWnsSeIzBseBUKQBEq86yHc1kGBvuIwACUTAHdhWzmHmgiKd2u7IDsb4KPjOeU17mg~3lGfqlzGctHLPu~9iKO1QEazUq7a6yBVeKBLkvpqext8GTJWKZdaA__',
                    }}
                    style={{
                      width: responsiveWidth(46),
                      height: responsiveHeight(12),
                      borderRadius: responsiveWidth(4),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: responsiveHeight(15),
                  margin: responsiveWidth(2),
                }}>
                    
                <TouchableOpacity
                  onPress={() => navigation.navigate('kwikmRegistration')}
                  style={{
                    width: responsiveWidth(46),
                    height: responsiveHeight(12),
                    borderRadius: responsiveWidth(4),
                    backgroundColor: 'white',
                    elevation: 2,
                    shadowColor: 'black',
                  }}>
                  <Image
                    source={{
                      uri: 'https://s3-alpha-sig.figma.com/img/d554/26aa/56a1eb3f928d32506149fad3c301fcd0?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=py44HMVai82BD44sP42arUXBwsgd7FTQImGk2Xn9-Uqjlo3Jrwp1~YmcvDry8i8mYNhTAJnksXThIEEL6TjUBH49DAJlv~xr3QpacTZdSl4eNtDAwSMY7mf4xBslgNhadJzQMQ3n1R6RjMTsTI5~RETE1u~Szlq86EXTlMFpDnTleoLX6EuPkFiIihAsiCss8H94-xYgjZW1htOEbAjd2LFavqMTftBFiLkXZxJdAQNfBkryIfjjlr75cCufKP5p6YbF9qPX57EJ8~LPLuCk~vezAk68bkL2u0YhSl96stm2bEP81VWEMZwScYp9XcQF4VMpey3KpNAF8Om4pq8D1g__',
                    }}
                    style={{
                      width: responsiveWidth(46),
                      height: responsiveHeight(12),
                      borderRadius: responsiveWidth(4),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>

              </View>

            </>
          )}
        </>
      ) : ( 
        <NoConnection />
      )}
    </View>
  );
};

export default ApkSubscripton;
