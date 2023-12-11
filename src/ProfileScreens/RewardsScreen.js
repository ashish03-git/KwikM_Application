import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  FlatList,
  StatusBar,
  Image,
  Modal,
  ImageBackground,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {ScratchCard} from 'rn-scratch-card';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ActivityLoader from '../OtherScreens/ActivityLoader';
// import ScratchCard from 'react-scratchcard';

const RewardsScreen = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [totalCard, setTotalCard] = useState([]);
  const [auth_token, setAuth_Token] = useState('');
  const [userId, setUserId] = useState(null);
  const [rewardAmount, setRewardAmount] = useState([]);
  const navigation = useNavigation();
  const [activityIndicator, setActivityIndicator] = useState(false);

  const cards = new Array(10);

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
      FetchAllScratchCards();
    }, [userId, auth_token]),
  );

  const FetchAllScratchCards = async () => {
    setActivityIndicator(true);
    let ob = {
      user_id: userId,
      auth_token: auth_token,
    };
    // setSelectedCard(index);
    await fetch('https://kwikm.in/dev_kwikm/api/rewards_fetch.php', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(ob),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          setTotalCard(data.rewards);
        } else {
          setRewardAmount([]);
        }
        setTimeout(() => {
          setActivityIndicator(false);
        }, 300);
      });
  };

  const getUserDetails = async () => {
    await AsyncStorage.getItem('user_id').then(user_id => {
      setUserId(JSON.parse(user_id));
    });
    await AsyncStorage.getItem('auth_token').then(token => {
      setAuth_Token(JSON.parse(token));
    });
  };

  const handleCardPress = async id => {
    setModalVisible(true);
    setSelectedCard(id);

    // Assuming cards is an array of objects with an 'id' property
    const activeCard = totalCard.filter(card => card.id === id);
    // console.log("matching card", activeCard[0].amount);
    setRewardAmount(activeCard[0].amount);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#EAFFEA'} />
      {activityIndicator ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityLoader />
        </View>
      ) : (
        <>
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
                  Your Rewards
                </Text>
              </View>
            </View>
          </View>

          {totalCard.length < 2 ? (
            <View>
              {totalCard.length == 0 ? (
                <View
                  style={{
                    height: responsiveHeight(80),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <LottieView
                      source={require('../../assets/noDataFound.json')}
                      style={{
                        width: responsiveWidth(80),
                        height: responsiveHeight(40),
                      }}
                      autoPlay
                      loop
                    />
                  </View>

                  <View style={{height: responsiveHeight(5)}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: responsiveFontSize(2.2),
                        fontWeight: '700',
                      }}>
                      No Reward Available Now...
                    </Text>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handleCardPress(totalCard[0].id)}
                  style={{
                    alignItems: 'flex-start',
                    marginLeft: responsiveWidth(3),
                    borderRadius: responsiveWidth(3),
                  }}>
                  <View style={styles.scratchArea}>
                    <Image
                      source={require('../../assets/gift-box.png')}
                      style={{
                        width: responsiveWidth(22),
                        height: responsiveWidth(22),
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <FlatList
                data={totalCard}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleCardPress(item.id)}
                      style={{
                        alignItems: 'center',
                        margin: responsiveWidth(1.5),
                        borderRadius: responsiveWidth(3),
                        backgroundColor: '#3768f3',
                      }}>
                      <View style={styles.scratchArea}>
                        <Image
                          source={require('../../assets/gift-box.png')}
                          style={{
                            width: responsiveWidth(22),
                            height: responsiveWidth(22),
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}

          {/* modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Font5
                  name="rupee-sign"
                  size={responsiveFontSize(7)}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(10),
                    color: 'white',
                    fontWeight: '700',
                    marginLeft: responsiveWidth(3),
                  }}>
                  {rewardAmount}
                </Text>
              </View>
              <LottieView
                source={require('../../assets/rewards.json')}
                autoPlay={true}
                // loop={true}
                style={styles.modalscratchArea}
              />

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Font5
                  name="window-close"
                  size={responsiveWidth(6.5)}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAFFEA',
  },
  scratchArea: {
    width: 180,
    height: 180,
    backgroundColor: '#f2bc0d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(3),
    // borderra
  },
  modalscratchArea: {
    width: '70%',
    height: '50%',
    borderRadius: responsiveWidth(3),
    // overflow: 'hidden',
  },
  scratchImage: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default RewardsScreen;
