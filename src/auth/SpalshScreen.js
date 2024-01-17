import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Animated, {Easing, ZoomIn} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Netinfo from '@react-native-community/netinfo';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    getLoginStatus();
  }, []);

  const getLoginStatus = async () => {
    try {
      const storedStatus = await AsyncStorage.getItem('login');
      const position = await AsyncStorage.getItem('role');
      const usersRole = JSON.parse(position);
      // console.log(position)
      if (JSON.parse(storedStatus)) {
        // set userRole in below if condition
        switch (usersRole) {
          case 1:
            setTimeout(() => {
              navigation.navigate('corpDistributorTab');
              // console.log("aaa")
            }, 1500);
            break;
          case 2:
            setTimeout(() => {
              navigation.navigate('distributorTab');
              // console.log("bbbb")
            }, 1500);
            break;
          case 3:
            setTimeout(() => {
              navigation.navigate('tabs');
              // console.log("cccc")
            }, 1500);
            break;
          default:
            setTimeout(() => {
              navigation.navigate('loginMPIN');
            }, 1500);
            break;
        }
      } else {
        setTimeout(() => {
          navigation.navigate('loginMPIN');
        }, 1500);

        // setStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Animated.View entering={ZoomIn.duration(1500).easing(Easing.ease)}>
        <Image
          source={{
            uri: 'https://s3-alpha-sig.figma.com/img/d554/26aa/56a1eb3f928d32506149fad3c301fcd0?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ACUb4nVPUMvKFAWTMJnlKgVYMV9nqKXH5oVCaL4s~143RJV9Zo8Pq0xI5r17vvG1H2LSvWuZLCswQgUv3VjWC-fXLp0rgj2unGbL0EvM4JSZ9h-mE~586vMlBpiHosHrUZhnWCACiwug28b~ampfra~PrMp4IW8tdwD~S-O0Y~CL6Q8DEybByUwKZ8MJSspAuRQ8-n35GxZ72C5DvGzI2VNKnMkGNXDN-dYOaQA5FCN6NTywbJkAQ~PJfiSO3tquUMEJBHa1xgpUgmVHBqoimMtUoynzS73g5RUPL59j-C7coGpP5-72AVpzJK1Bo4goL95lvZGxTWeCSp5maLnweQ__',
          }}
          style={{
            width: responsiveWidth(50),
            height: responsiveHeight(50),
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
