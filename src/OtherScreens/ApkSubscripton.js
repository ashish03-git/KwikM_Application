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
                      uri: 'https://s3-alpha-sig.figma.com/img/9187/ed89/ad6786507da60004a172c93ff2bfda2c?Expires=1704067200&Signature=KG0k3rzk8gl7Ec33~WqcE1jUFrNp9pP-a5voh0SLF8Mox-JJdzZw12DOWrTPDtoDalnrxu2fpJc4MWFfB00RdHvkzILW9HxZ2EmuhsVncS48umNrLfgUDvaBRvp0EfEasLwI07sxEcLHvRj2niEHobm63~YxrYeCiIhPZTYtOC4x~~l9mX66HnZTmnJFbmrbPT8LEj4iCrJY7ylXa7eiuN1j1EJq3GRvipio619UlhSYt6IZFj4KaeYghfQ~HSu8Pe~xyhKuQTmVqasxKEtG5-eSum5VMDfxK3n293q1nGbZ6pPwtBOOGa1NAMquJ5eqUDQHsopgIoqy92QdhuBzsw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
                      uri: 'https://s3-alpha-sig.figma.com/img/194e/d3d3/9b84c17b53d2bc62ad00267968c6be6a?Expires=1704067200&Signature=bwo19dAOi-LECbTpZY29~AiMcvAFpsK31hgKLAfK-W-zpWJEP~Prjlbi4HFbs4r2MhngPTEp~xO-bvnVf0AfXZkXak8Av0CDNQlL1S6NbCBVKEBsa169GCsl5s5RRTH89jMofzlce3QoujECw0i7MzkTu-~cg0gby1xNMsI7DCWgFpI5Emd9fjw~pCwkJuen2u6aJ5dkCtV0E6rzuIswKWkM1YM~S7C652hDxaWxMu9gOwBXxbIZ6xK8BuudCF-qYqKFpCu14BlKFm4~05bD5zy9s4dJ6GMNlZHlIhJAw22aEae8vw1uOWVYhYWYZGFtzJg2N~hAA~RFJ0gsBTU2eA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
                      uri: 'https://s3-alpha-sig.figma.com/img/d554/26aa/56a1eb3f928d32506149fad3c301fcd0?Expires=1704067200&Signature=GsWU2Fi7~7trotpbLAk7HlSQt9X1LMW~f8~Eomx5srzmJx9QqyjA66UhfjTIeOONoyh-x6ynHa--mqesRZYts~MvxC7D9Co8r7~pENNxT3nRrrlDAzQfFvsrrYW22Pwz4A~MQRt7xZ08rBEIb6u9gl9bYdhjo4wlli7V5ILsAKkIx86pG5xVJN4IlUavs5Bg7uqvcL3~tHzSE4-8iX-W7W2vgioOacMNtCsiL1pQBbKf2Ub0y~ouM2BNrlZwHNz5iJpz8Q1F~Q6RM3oSK-IyEmDkPtqvoc17cD6xUKAo9XUm243yBm8ZcOujBECjXxaQ5wMeIHVpr4RB69ULQYQLbw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
