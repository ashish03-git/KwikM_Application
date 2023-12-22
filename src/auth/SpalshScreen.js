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
            if (JSON.parse(storedStatus)) {
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
                    source={{uri: "https://s3-alpha-sig.figma.com/img/d554/26aa/56a1eb3f928d32506149fad3c301fcd0?Expires=1704067200&Signature=GsWU2Fi7~7trotpbLAk7HlSQt9X1LMW~f8~Eomx5srzmJx9QqyjA66UhfjTIeOONoyh-x6ynHa--mqesRZYts~MvxC7D9Co8r7~pENNxT3nRrrlDAzQfFvsrrYW22Pwz4A~MQRt7xZ08rBEIb6u9gl9bYdhjo4wlli7V5ILsAKkIx86pG5xVJN4IlUavs5Bg7uqvcL3~tHzSE4-8iX-W7W2vgioOacMNtCsiL1pQBbKf2Ub0y~ouM2BNrlZwHNz5iJpz8Q1F~Q6RM3oSK-IyEmDkPtqvoc17cD6xUKAo9XUm243yBm8ZcOujBECjXxaQ5wMeIHVpr4RB69ULQYQLbw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                }}
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
