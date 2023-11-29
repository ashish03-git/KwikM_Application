import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    BackHandler,
    Alert,
    StatusBar
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Font5 from "react-native-vector-icons/FontAwesome5"
import Font from "react-native-vector-icons/FontAwesome"
import LottieView from 'lottie-react-native';
import Netinfo from "@react-native-community/netinfo"
import ActivityLoader from '../OtherScreens/ActivityLoader';
import NoConnection from '../OtherScreens/NoConnection';
import { useDispatch } from 'react-redux';
import { addLogin_data } from '../redux/Slice';


const LoginMPINScreen = () => {

    const [MPIN, setMPIN] = useState('');
    let [phone, setPhone] = useState('')
    // const [asyncID, setAsyncID] = useState(null)
    const navigation = useNavigation();
    let [msg, setMsg] = useState('')
    let [err, setErr] = useState('')
    let [status, setStaus] = useState(null)
    const [activityIndicator, setActivityIndicator] = useState(false)
    const [buttonIndicator, setButttonIndicator] = useState(false)
    const [isConnected, setIsConnected] = useState(null)
    const [usersRole, setUsersRole] = useState(null)
    const dispatch = useDispatch()



    useEffect(() => {
        setActivityIndicator(true);
        setTimeout(() => {
            setActivityIndicator(false)
        }, 1000);
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            // Remove the custom back button handler when the component unmounts
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, [])

    useEffect(() => {
        const unsubscribe = Netinfo.addEventListener(state => {
            setIsConnected(state.isConnected)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    // handleling back button
    const handleBackButton = () => {
        if (navigation.isFocused()) {
            // Show an alert only when on the home screen
            Alert.alert(
                'Exit App',
                'Do you want to exit the app?',
                [
                    {
                        text: 'No',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    {
                        text: 'Yes',
                        onPress: () => {
                            // Clear the login status when the user exits
                            BackHandler.exitApp();
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
            // Navigate to the previous screen if not on the home screen
            navigation.goBack();
        }
        return true; // Prevent the default back button behavior
    };


    const Login = () => {

        setButttonIndicator(true)
        var ob = {
            "phone": phone,
            "mpin": MPIN
        }

        fetch("https://kwikm.in/dev_kwikm/api/login_mpin.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        }).then(response => response.json())
            .then(data => {
                dispatch(addLogin_data(data))

                if (data.status) {
                    AsyncStorage.setItem("name", JSON.stringify(data.name))
                    AsyncStorage.setItem("user_id", JSON.stringify(data.user_id))
                    AsyncStorage.setItem("role", JSON.stringify(data.role))
                    AsyncStorage.setItem("auth_token", JSON.stringify(data.auth_token))
                    AsyncStorage.setItem("user_mpin", MPIN)
                    // console.log(phone)
                    AsyncStorage.setItem("user_number", phone)
                    setTimeout(() => {
                        setMPIN(' ')
                        setButttonIndicator(false)
                        switch (parseInt(data.role)) {
                            case 1: navigation.navigate("corpDistributorTab");
                                // console.log("login mpin corporate");
                                break
                            case 2: navigation.navigate("distributorTab");
                                // console.log("Login mpin distributor");
                                break
                            case 3: navigation.navigate("tabs");
                                // console.log("login mpin retailer");
                                break
                        }
                    }, 1500);
                }
                else {
                    setErr(data.error)
                    setTimeout(() => {
                        setErr(' ')
                        setButttonIndicator(false)
                    }, 1500);
                }
            })
            .catch(error => setErr(error))
    }


    return (
        <>
            {activityIndicator ?
                <View style={{ flex: 1, backgroundColor: "#eaffea" }}>
                    <ActivityLoader />
                </View>
                :
                <View style={styles.container}>
                    {isConnected ?
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.view1}>
                            <Image
                               source={{uri:"https://s3-alpha-sig.figma.com/img/9fc4/9eb3/9a99be95977a6a0f5d2fe5cd0dcba7eb?Expires=1702252800&Signature=AM2uey0VjRWdHbebXB0GFqsTpX63hHz2UIsDaI5KP-GbchZkXOWNM6Gw-454f3hnXGuvZOeIUIOh0iLS8RgYF-S3wXqzn14CenpoaHJS43gdhCscuy5eLO8rauqI2fe9G~~ZQEtKvMr8EDcjciF3IZI77Tbh0~95VQ9Uv56tmWRq6fTrNGCMqTsBcbQpftNeGDhIxh8tFEYXcfp-o3e3ZwDh8Io~r2xIccMe7W0T6wHyldry6Dm~Fn9X8j6lbj~H-t9xXxwNATcsVxe58GHpwwMs9sZMUUwGipGmVLtmhWeIntPvEJnz3EWnSFrotuxL9Ts2j9CL~Bls0e~4kukd1g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"}}
                                style={{ 
                                    width: responsiveWidth(100), 
                                    height: responsiveHeight(30), 
                                    marginTop: responsiveWidth(8) 
                                }}
                            />
                            </View>
                            <View style={styles.view2}>
                                <View style={{ width: responsiveWidth(100) }}>
                                    <Text style={{ fontSize: responsiveFontSize(3), fontWeight: "700", color: "#8F0592", marginTop: responsiveWidth(5), marginLeft: responsiveWidth(10) }}>Login with MPIN</Text>
                                </View>
                                <View style={{ width: responsiveWidth(100) }}>
                                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "400", color: "black", margin: responsiveWidth(5), marginLeft: responsiveWidth(10) }}>Enter MPIN to Login </Text>
                                </View>

                                {/* phone */}
                                <View style={{
                                    width: responsiveWidth(85),
                                    height: responsiveHeight(7),
                                    flexDirection: "row",
                                    marginTop: responsiveWidth(3),
                                    borderRadius: responsiveWidth(3),
                                    backgroundColor: "white"
                                }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Font5 name="phone-alt" size={responsiveWidth(6)} color="black" />
                                    </View>
                                    <View style={{ flex: 5, justifyContent: "center" }}>
                                        <TextInput
                                            keyboardType="phone-pad"
                                            placeholder='Phone Number'
                                            placeholderTextColor={"gray"}
                                            onChangeText={txt => setPhone(txt)}
                                            value={phone}
                                            style={{ fontSize: responsiveFontSize(2), color: "black" }}
                                        />
                                    </View>
                                </View>

                               

                                <OTPInputView
                                    style={{ width: responsiveWidth(85), height: responsiveHeight(15), justifyContent: "center", alignItems: "center" }}
                                    pinCount={4}
                                    autoFocusOnLoad
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={(code => {
                                        setMPIN(`${code}`)
                                    })}
                                />
                                <View style={styles.submitButtonContainer}>
                                    <TouchableOpacity
                                        onPress={Login}
                                        style={styles.submitButton}>
                                        {buttonIndicator ? <ActivityIndicator color={"white"} size={"large"} /> : <Text style={styles.submitButtonText}>Login</Text>}
                                    </TouchableOpacity>
                                    <View style={{ margin: responsiveWidth(3) }}>
                                        {status ?
                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: "green", fontWeight: "500" }}>{msg}</Text>
                                            :
                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: "red", fontWeight: "500" }}>{err}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={styles.legalTextContainer}>
                                    <TouchableOpacity
                                        style={{ justifyContent: "center", alignItems: "center" }}
                                        onPress={() => navigation.navigate("loginNumber")}
                                    >
                                        <Text style={{ fontSize: responsiveFontSize(2), color: "#8F0592" }}>Forgot MPIN</Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "row", paddingTop: responsiveWidth(2) }}>
                                        <Text style={{ fontSize: responsiveFontSize(2), color: "black" }}>Don't have an account click to ?</Text>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("register")}
                                        >
                                            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: "700", color: "#8F0592" }}> create account</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        :
                        <NoConnection />
                    }
                </View>
            }
        </>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    scrollView: {
        flex: 1,
        // backgroundColor: 'yellow',
    },
    view1: {
        width: responsiveWidth(100),
        height: responsiveHeight(38),
        justifyContent: "center",
        alignItems: 'center',
    },
    image: {
        width: responsiveWidth(100),
        height: responsiveHeight(30),
        marginTop: responsiveWidth(8),
        resizeMode:"contain"
    },
    view2: {
        width: responsiveWidth(100),
        height: responsiveHeight(64),
        backgroundColor: '#EAFFEA',
        borderTopLeftRadius: responsiveWidth(8),
        borderTopRightRadius: responsiveWidth(8),
        alignItems: "center",
    },
    otpTitle: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: "700",
        color: "#8F0592",
        width: responsiveWidth(85),
    },
    inputRow: {
        justifyContent: "space-evenly",
        flexDirection: "row",
        width: responsiveWidth(90),
        marginTop: responsiveWidth(10),
    },
    inputBox: {
        width: responsiveWidth(18),
        height: responsiveHeight(9),
        borderRadius: responsiveWidth(3),
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        fontSize: responsiveFontSize(2.4),
    },
    submitButtonContainer: {
        width: responsiveWidth(90),
        height: responsiveHeight(10),
        alignItems: "center",
        justifyContent: "center"
    },
    submitButton: {
        width: responsiveWidth(85),
        height: responsiveHeight(6.5),
        backgroundColor: "#0B3F70",
        borderRadius: responsiveWidth(3),
        justifyContent: "center",
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
        fontSize: responsiveFontSize(2),
    },
    legalTextContainer: {
        width: responsiveWidth(85),
        height: responsiveHeight(6),
        justifyContent: "center",
        alignItems: "center",
    },
    legalText: {
        marginLeft: responsiveWidth(1),
        color: 'black',
    },
    legalLink: {
        color: "#8F0592",
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },
    borderStyleHighLighted: {
        borderColor: "#878787",
    },
    underlineStyleBase: {
        width: responsiveWidth(16),
        height: responsiveHeight(8),
        borderRadius: responsiveWidth(3),
        borderWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "white",
        borderColor: "#878787",
        fontSize: responsiveFontSize(2.2),
        color: "black",
    },
    underlineStyleHighLighted: {
        borderColor: "black",
    },
});

export default LoginMPINScreen;
