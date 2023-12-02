import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, FlatList, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Font6 from "react-native-vector-icons/FontAwesome6"
import Font5 from "react-native-vector-icons/FontAwesome5"
import Font from "react-native-vector-icons/MaterialCommunityIcons"

import LottieView from 'lottie-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityLoader from '../OtherScreens/ActivityLoader'
import { addMyDistibutorList } from '../redux/Slice'


const HelpScreen = () => {

    // variables
    const navigation = useNavigation()
    const netinfo = useNetInfo()
    const [userId, setUserId] = useState(null)
    const [activityIndicator, setActivityIndicator] = useState(false)
    const [helpDetails, setHelpDetails] = useState({})
    // const reduxMyDistributorsList = useSelector(state => state.details.myDistributorsList)
    const token = useSelector(state => state.details.login_data.auth_token)
    const [auth_token, setAuth_Token] = useState("")



    useEffect(() => {
        // setActivityIndicator(true)
        getUserDetails()
        FetchHelpDetails()
    }, [userId, auth_token])

    const getUserDetails = async () => {
        await AsyncStorage.getItem("user_id").then((user_id) => {
            setUserId(JSON.parse(user_id))
        })
        await AsyncStorage.getItem("auth_token").then((auth) => {
            // console.log(auth)
            setAuth_Token(JSON.parse(auth))
        });
    }


    // All Lead
    const FetchHelpDetails = async () => {
        let ob = {
            "user_id": userId,
            "auth_token": token
        }
        console.log(ob)
        await fetch("https://kwikm.in/dev_kwikm/api/get_help.php", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(ob)
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status) {
                    setHelpDetails([{}])
                }
                else {
                    setHelpDetails({})
                }
            })
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSave = () => {
        // Implement your save logic here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone Number:', phoneNumber);
    };


    return (


        <>
            {netinfo ?
                <View
                    style={{ flex: 1, backgroundColor: "#EAFFEA" }}
                >
                    <StatusBar backgroundColor="#EAFFEA" />
                    
                    <View style={{ height: responsiveHeight(8), flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
                        </TouchableOpacity>
                        <View style={{ flex: 5, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                            <View>
                                <Text style={{ fontSize: responsiveFontSize(2.5), color: "black", fontWeight: "700" }}>Get Help</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: "center" }}>


                        <Text style={{
                            fontSize: responsiveFontSize(2.2),
                            color: "black",
                            fontWeight: "700",
                            alignSelf: "flex-start",
                            marginLeft: responsiveWidth(3)
                        }}>Upline Details :-</Text>

                        <View style={{
                            width: responsiveWidth(94),
                            height: responsiveHeight(6),
                            backgroundColor: "white",
                            flexDirection: "row",
                            borderRadius: responsiveWidth(3),
                            borderWidth: 1,
                            borderColor: "#BCB4B4",
                            marginTop: responsiveWidth(2)
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Font5 name="user-alt" size={responsiveWidth(5.5)} color="#535353" />
                            </View>
                            <View style={{ flex: 5, justifyContent: "center" }}>
                                <Text
                                    style={{ fontSize: responsiveFontSize(2), color: "black" }}
                                >
                                    Name
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            width: responsiveWidth(94),
                            height: responsiveHeight(6),
                            backgroundColor: "white",
                            flexDirection: "row",
                            borderRadius: responsiveWidth(3),
                            borderWidth: 1,
                            borderColor: "#BCB4B4",
                            marginTop: responsiveWidth(2)
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Font5 name="phone-alt" size={responsiveWidth(5.5)} color="#535353" />
                            </View>
                            <View style={{ flex: 5, justifyContent: "center" }}>
                                <Text
                                    style={{ fontSize: responsiveFontSize(2), color: "black" }}
                                >
                                    Phone
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            width: responsiveWidth(94),
                            height: responsiveHeight(6),
                            backgroundColor: "white",
                            flexDirection: "row",
                            borderRadius: responsiveWidth(3),
                            borderWidth: 1,
                            borderColor: "#BCB4B4",
                            marginTop: responsiveWidth(2)
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Font name="email" size={responsiveWidth(6)} color="#535353" />
                            </View>
                            <View style={{ flex: 5, justifyContent: "center" }}>
                                <Text
                                    style={{ fontSize: responsiveFontSize(2), color: "black" }}
                                >
                                    Email
                                </Text>
                            </View>
                        </View>

                    </View>

                    <View style={{ alignItems: "center",marginTop:responsiveWidth(5) }}>


                        <Text style={{
                            fontSize: responsiveFontSize(2.2),
                            color: "black",
                            fontWeight: "700",
                            alignSelf: "flex-start",
                            marginLeft: responsiveWidth(3)
                        }}>Company Details :-</Text>

                        <View style={{
                            width: responsiveWidth(94),
                            height: responsiveHeight(6),
                            backgroundColor: "white",
                            flexDirection: "row",
                            borderRadius: responsiveWidth(3),
                            borderWidth: 1,
                            borderColor: "#BCB4B4",
                            marginTop: responsiveWidth(2)
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Font5 name="user-alt" size={responsiveWidth(5.5)} color="#535353" />
                            </View>
                            <View style={{ flex: 5, justifyContent: "center" }}>
                                <Text
                                    style={{ fontSize: responsiveFontSize(2), color: "black" }}
                                >
                                    Name
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            width: responsiveWidth(94),
                            height: responsiveHeight(6),
                            backgroundColor: "white",
                            flexDirection: "row",
                            borderRadius: responsiveWidth(3),
                            borderWidth: 1,
                            borderColor: "#BCB4B4",
                            marginTop: responsiveWidth(2)
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Font5 name="phone-alt" size={responsiveWidth(5.5)} color="#535353" />
                            </View>
                            <View style={{ flex: 5, justifyContent: "center" }}>
                                <Text
                                    style={{ fontSize: responsiveFontSize(2), color: "black" }}
                                >
                                    Phone
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            width: responsiveWidth(94),
                            height: responsiveHeight(6),
                            backgroundColor: "white",
                            flexDirection: "row",
                            borderRadius: responsiveWidth(3),
                            borderWidth: 1,
                            borderColor: "#BCB4B4",
                            marginTop: responsiveWidth(2)
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Font name="email" size={responsiveWidth(6)} color="#535353" />
                            </View>
                            <View style={{ flex: 5, justifyContent: "center" }}>
                                <Text
                                    style={{ fontSize: responsiveFontSize(2), color: "black" }}
                                >
                                    Email
                                </Text>
                            </View>
                        </View>

                    </View>

                </View>
                :
                <NoConnection />
            }
        </>


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});
export default HelpScreen