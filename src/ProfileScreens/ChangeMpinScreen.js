import React, { useState, useEffect, useRef, useId } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import Font5 from "react-native-vector-icons/FontAwesome5"


const ChangeMpinScreen = () => {

    const [MPIN, setMPIN] = useState('');
    const [OldMpin, setOldMpin] = useState('');
    const [userMPIN, setUserMPIN] = useState(null);
    const navigation = useNavigation();
    let [msg, setMsg] = useState('')
    let [err, setErr] = useState('')
    let [status, setStaus] = useState(null)
    const [asyncID, setAsyncID] = useState(null)
    const dispatch = useDispatch()
    const number = useSelector(state => state.details.number)
    const netInfo = useNetInfo()
    const [buttonIndicator, setButttonIndicator] = useState(false)


    useEffect(() => {
        getValueFromStorage();
    })

    // extracting id stored in registerOTPScreen from async storage
    const getValueFromStorage = async () => {
        try {
            const id = await AsyncStorage.getItem('user_id');
            const loginMPIN = await AsyncStorage.getItem("user_mpin");
            // console.log("getting id stored in asyc storage in reg mpin screen", id)
            if (id !== null) {
                let num = JSON.parse(id)
                setUserMPIN(loginMPIN)
                setAsyncID(num)
            } else {
                // Handle the case where 'id' doesn't exist in AsyncStorage
            }
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    }

    const GenerateMPIN = () => {

        // console.log(OldMpin)
        // console.log(typeof(OldMpin))
        // console.log(userMPIN)

        if (OldMpin.length == 4 && MPIN.length == 4 && userMPIN == OldMpin) {
            setButttonIndicator(true)
            let ob = {
                "user_id": asyncID,
                "mpin": MPIN
            }
            // ... your API call ...
            fetch("https://kwikm.in/dev_kwikm/api/generate_mpin.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ob)
            })
                .then(response => response.json())
                .then(data => {
                    setStaus(data.status)
                    if (data.status) {
                        setMsg(data.message)
                        AsyncStorage.setItem("user_mpin", MPIN)
                        setTimeout(() => {
                            setButttonIndicator(false)
                            setMsg("")
                            setMPIN('')
                            navigation.navigate("userProfile")
                        }, 1000)
                    } else {
                        setErr(data.error);
                        setButttonIndicator(false)
                        setTimeout(() => {
                            setErr("")
                        }, 1000);
                        // ... other actions ...
                    }
                })
                .catch(error => {
                    setErr(error.message)
                    setTimeout(() => {
                        setErr(" ")
                    }, 1000);
                });

        }
        else {
            // console.log("hii")
            setStaus(false)
            setMsg("Old Mpin Not Matched...")
            console.log(msg)
            setTimeout(() => {
                setMsg("")
            }, 1000);
        }

    }

    // handeling mpin field state
    const handleOldMPINCodeFilled = (code) => {
        setOldMpin(code)
        // console.log(code)
    }
    const handleMPINCodeFilled = (code) => {
        setMPIN(code)
        // console.log(code)
    }

    return (

        <>
            {netInfo ?
                <View style={styles.container}>
                    <StatusBar backgroundColor={"#EAFFEA"} />

                    <View style={{
                        height: responsiveHeight(10),
                        flexDirection: "row"
                    }}
                    >

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
                        </TouchableOpacity>
                    
                        <View style={{
                            flex: 5,
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row"
                        }}>
                            <View>
                                <Text style={{
                                    fontSize: responsiveFontSize(2.5),
                                    color: "black",
                                    fontWeight: "700"
                                }}>Change M-PIN</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        width: responsiveWidth(100),
                        height: responsiveHeight(60),
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "red"
                    }}>


                        {/* confirm mpin */}
                        <View style={{
                            width: responsiveWidth(100),
                            marginTop: responsiveWidth(2),
                            justifyContent: "flex-start",
                        }}>
                            <Text
                                style={{
                                    fontSize: responsiveFontSize(2.2),
                                    fontWeight: "700",
                                    color: "#8F0592",
                                    margin: responsiveWidth(5),
                                    marginBottom: responsiveWidth(2),

                                }}
                            >Confirm MPIN</Text>
                        </View>

                        <OTPInputView
                            style={{
                                width: responsiveWidth(80),
                                height: responsiveHeight(10),
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            pinCount={4}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeChanged={(code) => setOldMpin(`${code}`)}
                            onCodeFilled={handleOldMPINCodeFilled}
                        />


                        {/* new mpin */}
                        <View style={{
                            width: responsiveWidth(100),
                            marginTop: responsiveWidth(2),
                            justifyContent: "flex-start",

                        }}>
                            <Text
                                style={{
                                    fontSize: responsiveFontSize(2.2),
                                    fontWeight: "700",
                                    color: "#8F0592",
                                    margin: responsiveWidth(5),
                                    marginBottom: responsiveWidth(2)
                                }}
                            >New MPIN</Text>
                        </View>


                        <OTPInputView
                            style={{ width: responsiveWidth(80), height: responsiveHeight(10), justifyContent: "center", alignItems: "center" }}
                            pinCount={4}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeChanged={(code) => setMPIN(`${code}`)}
                            onCodeFilled={handleMPINCodeFilled}
                        />
                    </View>

                    <View style={{
                        width: responsiveWidth(100),
                        height: responsiveHeight(20),
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "red"
                    }}>
                        {MPIN.length < 4 ?
                            <TouchableOpacity
                                disabled={true}
                                style={styles.submitDisableButton}>
                                <Text style={styles.submitButtonText}>Generate MPIN</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={GenerateMPIN}
                                style={styles.submitButton}>
                                {buttonIndicator ?
                                    <ActivityIndicator size="large" color="white" /> : <Text style={styles.submitButtonText}>Generate MPIN</Text>}
                            </TouchableOpacity>
                        }

                        <View style={{ margin: responsiveWidth(1) }}>
                            {status ?
                                <Text style={{ fontSize: responsiveFontSize(1.8), color: "green", fontWeight: "500" }}>{msg}</Text>
                                :
                                <Text style={{ fontSize: responsiveFontSize(1.8), color: "red", fontWeight: "500" }}>{msg}</Text>
                            }
                        </View>


                    </View>

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
        backgroundColor: "#EAFFEA",
        alignItems: "center",
        // justifyContent:"center"
    },
    scrollView: {
        flex: 1,
        // backgroundColor: 'yellow',
    },
    view1: {
        width: responsiveWidth(100),
        height: responsiveHeight(40),
        justifyContent: "center",
        alignItems: 'center',
    },
    image: {
        width: responsiveWidth(60),
        height: responsiveHeight(25),
        marginTop: responsiveWidth(8),
    },
    view2: {
        width: responsiveWidth(100),
        height: responsiveHeight(100),
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
        height: responsiveHeight(15),
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"red"
    },
    submitButton: {
        width: responsiveWidth(85),
        height: responsiveHeight(6.5),
        backgroundColor: "#0B3F70",
        borderRadius: responsiveWidth(3),
        justifyContent: "center",
        alignItems: "center",
    },
    submitDisableButton: {
        width: responsiveWidth(85),
        height: responsiveHeight(6.5),
        backgroundColor: "gray",
        borderRadius: responsiveWidth(3),
        justifyContent: "center",
        alignItems: "center"
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
        backgroundColor: "white",
        fontSize: responsiveFontSize(2.2),
        color: "black",
    },

    underlineStyleHighLighted: {
        borderColor: "black",
    },
});

export default ChangeMpinScreen;
