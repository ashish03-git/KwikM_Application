import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { request, PERMISSIONS } from 'react-native-permissions';
import SmsRetriever from 'react-native-sms-retriever';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { addId } from '../redux/Slice';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginOtpScreen = () => {


    const [otp, setOtp] = useState('');
    const navigation = useNavigation();
    let [msg, setMsg] = useState('')
    let [err, setErr] = useState('')
    let [status, setStaus] = useState(null)
    const dispatch = useDispatch()
    const number = useSelector(state => state.details.number)
    const netInfo = useNetInfo()
    const [buttonIndicator, setButttonIndicator] = useState(false)

    // Add these lines to request SMS permissions
    useEffect(() => {
        request(PERMISSIONS.ANDROID.READ_SMS)
            .then(result => {
                if (result === 'granted') {
                    // You have SMS permission, you can start listening for OTP
                    startListeningForOTP();
                } else {
                    // Handle the case where permission is denied
                }
            });
    }, []);

    const startListeningForOTP = async () => {
        try {
            const retrievedOTP = await SmsRetriever.startSmsRetriever();
            if (retrievedOTP) {
                // Extract the OTP from the message
                setOtp(retrievedOTP);
                // You can now submit the OTP automatically or display it to the user
            }
        } catch (error) {
            // Handle any errors that occur during OTP retrieval
        }
    };


    const Submit = () => {
        // console.log("hii")
        setButttonIndicator(true)
        let ob = {
            "otp": otp,
            "phone": number.phone,
        }
        fetch("https://kwikm.in/dev_kwikm/api/verify_login_otp.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        })
            .then(response => response.json())
            .then(data => {

                AsyncStorage.setItem("id", JSON.stringify(data.user_id))
                setStaus(data.status)
                setMsg(data.message)
                setErr(data.error)
                if (data.status) {
                    setTimeout(() => {
                        setButttonIndicator(false)
                        setOtp(' ')
                        setMsg(' ')
                        navigation.navigate("registerMPIN")
                    }, 2000);
                }
                else {
                    // console.log(data.error
                    setTimeout(() => {
                        setOtp(' ')
                        setErr(' ')
                        setButttonIndicator(false)

                    }, 2000);


                }
            })
            .catch(error => setErr(error))
    }



    return (
        <>
            {netInfo ?
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.view1}>
                        <Image
                               source={{uri:"https://s3-alpha-sig.figma.com/img/1093/9990/a4997316d3551e1edd75c9441b6e7417?Expires=1702857600&Signature=hChmfQtTn6AiDZkXkC7H~MinrFKXcuVtDNMNn9pv~bL82BJkLRjMWVUYO9bn4pFNJC9Hdwn1qwzIO5skrPjtCoPmMKQIkypu5Lq5NbplaiVCsSFaLI6XAr7VX3vJUJjyAqz~CuSYRjcVT81e15DSRXvjOHNAfgTbxNAZf2Daj3WEk2CnBWhH93X5IK7sYAehU0lV4uRHfKNTpXYf28y6oUq~pj0tkn2zR-im12F11pZUSLGVtHr1vggFS3dAX2J9F8AK4qYZGifEnLKvzrBmSe-MkucdjZJmor0c4n4DUe1LlMqDGtrKYR5rVzUWTMG~jHPYJXhlVjOfDDT64isbZw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"}}
                                style={{ 
                                    width: responsiveWidth(100), 
                                    height: responsiveHeight(30), 
                                    marginTop: responsiveWidth(8),
                                    resizeMode:"contain"
                                }}
                            />
                        </View>
                        <View style={styles.view2}>
                            <View style={{ width: responsiveWidth(100) }}>
                                <Text style={{ fontSize: responsiveFontSize(3), fontWeight: "700", color: "#8F0592", margin: responsiveWidth(5), marginLeft: responsiveWidth(10) }}>Enter OTP</Text>
                            </View>
                            <OTPInputView
                                style={{ width: responsiveWidth(80), height: responsiveHeight(10), justifyContent: "center", alignItems: "center" }}
                                pinCount={4}
                                autoFocusOnLoad
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled={(code => {
                                    setOtp(`${code}`)
                                })}
                            />
                            <View style={styles.submitButtonContainer}>
                                <TouchableOpacity
                                    onPress={Submit}
                                    style={styles.submitButton}>
                                    {buttonIndicator ? <ActivityIndicator size="large" color="white" /> : <Text style={styles.submitButtonText}>Submit OTP</Text>}
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
                                <Text style={styles.legalText}>
                                    By continuing you agree
                                </Text>
                                <Text style={styles.legalLink}>
                                    Terms & Conditions
                                </Text>
                                <Text style={styles.legalText}>
                                    and
                                </Text>
                                <Text style={styles.legalLink}>
                                    Privacy Policy
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                :
                <NoConnection />
            }
        </>

    );
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
        height: responsiveHeight(45),
        justifyContent: "center",
        alignItems: 'center',
    },
    image: {
        width: responsiveWidth(80),
        height: responsiveHeight(35),
        marginTop: responsiveWidth(8),
    },
    view2: {
        width: responsiveWidth(100),
        height: responsiveHeight(70),
        backgroundColor: '#EAFFEA',
        borderTopLeftRadius: responsiveWidth(8),
        borderTopRightRadius: responsiveWidth(8),
        alignItems: "center",
    },
    otpContainer: {
        width: responsiveWidth(90),
        height: responsiveHeight(25),
        alignItems: "center",
        justifyContent: "center",
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
        height: responsiveHeight(25),
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
        height: responsiveHeight(10),
        // marginTop: responsiveWidth(8),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
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
        borderColor: "#878787",
        fontSize: responsiveFontSize(2.2),
        color: "black",
        backgroundColor: "white"
    },

    underlineStyleHighLighted: {
        borderColor: "black",
    },
});

export default LoginOtpScreen;
