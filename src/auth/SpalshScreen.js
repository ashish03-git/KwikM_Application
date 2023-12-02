import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animated, {
    Easing,
    ZoomIn
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Netinfo from "@react-native-community/netinfo"


const SplashScreen = () => {

    const navigation = useNavigation();
    useEffect(() => {
        getLoginStatus();
    }, []);

    const getLoginStatus = async () => {
        try {
            const storedStatus = await AsyncStorage.getItem('login');
            const position = await AsyncStorage.getItem('role');
            const usersRole = JSON.parse(position)
            // console.log(position)
            if (storedStatus) {
                // Assuming the stored status is a string representing a boolean 
                const parsedStatus = JSON.parse(storedStatus);
                if (parsedStatus) {
                    // set userRole in below if condition
                    switch (usersRole) {
                        case 1: setTimeout(() => {
                            navigation.navigate("corpDistributorTab")
                            // console.log("aaa")
                        }, 1500); break;
                        case 2: setTimeout(() => {
                            navigation.navigate("distributorTab")
                            // console.log("bbbb")
                        }, 1500); break;
                        case 3: setTimeout(() => {
                            navigation.navigate("tabs")
                            // console.log("cccc")
                        }, 1500); break;
                        default:
                            setTimeout(() => {
                                navigation.navigate("loginMPIN")
                            }, 1500); break;
                    }


                }

            } else {
                setTimeout(() => {
                    navigation.navigate("loginMPIN")
                }, 1500);

                // setStatus(false);
            }
        } catch (error) {
            console.log(error);
            // Set status to false or handle error cases accordingly
            // setStatus(false);
        }

    };




    return (


        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Animated.View entering={ZoomIn.duration(1500).easing(Easing.ease)}  >
                <Image
                    source={{ uri: "https://s3-alpha-sig.figma.com/img/d554/26aa/56a1eb3f928d32506149fad3c301fcd0?Expires=1701648000&Signature=bZ9LukHMV~ybCMVozJO6N~txDYAtqeqWvFwwJJjx5ZVvEuVWYMk5uJhHAO1uNIfHJO~uqWpB7gjiKXMEv0CCP3BKEc8FAPBH12J2D7Bv8DuCz0adt2YTutdkABPvdHW9GGcgH54I9NwJ-Fm9rWReHvHfBzhgFAG4yJ5w8MvBFnuAnOcna67v4untgydmL7Mf7xubNKIagCPQPYzLe2VOKrG2iTwPTgbSxfHms8ctSIIOyTUY5ZypYbeyd6-zTksnTetRGzx2bviFhMwOEA157L7agTZIz8PWPdc71Qgggvqz-HQo-58yVQ9LKjldU9HVniNNerdnExfnqklH0p98oQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" }}
                    style={{
                        width: responsiveWidth(50),
                        height: responsiveHeight(50),
                        resizeMode: "contain"
                    }}
                />
            </Animated.View>
        </View>


    );
};

export default SplashScreen;
