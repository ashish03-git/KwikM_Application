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
                    source={{uri: "https://s3-alpha-sig.figma.com/img/d554/26aa/56a1eb3f928d32506149fad3c301fcd0?Expires=1702857600&Signature=Av-qbmpOdf1ejuomjhi3AqOFEMXRrIHcAqcseIlcT2zHDT1SbIpUOh0P0d8eCZmU2xjEQmUWe62IKgJX9Mnp6pQlEd1n8CDZcB-ODA89c9dXHkKpWbU-epZOoz79H4uN9H3Ft4a9JIpQAhXZeAkHAZdFvazWRQYYvqQM6n93eMKRG86J5byn8~CoYOm12vPS6foKzmM2R3UYaw6xRvWrSCa3kcD7Npu81DH9Cc~L5whoHClzTlT6y9~8PE6c82kJjH04jajLVVDro7rE~nSCfhKJaOLnLqejZpkVSDNVk23HOmvRpy6xCSFjbWKCvhevd9u5ZxyIdAN9g4XfgMN~Hw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
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
