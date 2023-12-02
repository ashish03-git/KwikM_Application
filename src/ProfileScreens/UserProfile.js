import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Alert, Share, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import Font6 from "react-native-vector-icons/FontAwesome6"
import Font5 from "react-native-vector-icons/FontAwesome5"
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons"
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePicker from 'react-native-image-crop-picker';



const UserProfile = () => {

    const navigation = useNavigation()
    const [selectImage, setSelectedImage] = useState(null)
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = async () => {
        try {
            await AsyncStorage.getItem("name").then((user_name) => {
                // console.log(JSON.parse(user_name))
                setName(JSON.parse(user_name))
            });
            await AsyncStorage.getItem("user_number").then((number) => {
                // console.log(JSON.parse(user_name))
                setPhone(JSON.parse(number))
            });
            await AsyncStorage.getItem("user_id").then((id) => {
                // console.log(JSON.parse(user_name))
                setUserId(JSON.parse(id))
            });

        }
        catch (error) {
            console.log(error)
        }
    }

    const handleLogOut = () => {

        Alert.alert(
            'Log Out',
            'Do you want to log out?',
            [
                {
                    text: 'No',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        AsyncStorage.removeItem("login")
                        AsyncStorage.removeItem("name")
                        AsyncStorage.removeItem("user_id")
                        AsyncStorage.removeItem("role")
                        AsyncStorage.removeItem("user_number")
                        navigation.navigate("loginMPIN")
                    }
                }
            ],
            { cancelable: false }
        );

    }

    const SelectProfilePhoto = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                cropperCircleOverlay: true, // Set to true for a circular crop overlay
            });

            // Access the cropped image URI
            // console.log(image)
            setSelectedImage(image.path);
        } catch (error) {
            // Handle error
            console.log(error);
        }
    };

    const ShareProfile = async () => {
        try {
            const result = await Share.share({
                message: 'KWIKM APP: Checkout my profile on: https://kwikm.in/dev_kwikm/admin/html/login.php',
                title: 'KWIKM App',
            });

            if (result.action === Share.sharedAction) {

            } else if (result.action === Share.dismissedAction) {
                // console.log('Share cancelled');
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <StatusBar backgroundColor="white" />

            <View style={{ flex: 1, backgroundColor: "white" }}>

                <View style={{ height: responsiveHeight(8), flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
                    </TouchableOpacity>
                    <View style={{ flex: 5, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <View>
                            <Text style={{ fontSize: responsiveFontSize(2.5), color: "black", fontWeight: "700" }}>My Profile</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <LinearGradient
                        colors={["#CDCDCD", "#7E7E7E"]}
                        style={{
                            flexDirection: "row",
                            width: responsiveWidth(95),
                            height: responsiveHeight(15),
                            borderRadius: responsiveWidth(3)
                        }}
                    >
                        <View style={{
                            flex: 1.2,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        >
                            {selectImage ?
                                <Image
                                    source={{ uri: selectImage }}
                                    style={{
                                        width: responsiveWidth(22),
                                        height: responsiveWidth(22),
                                        borderRadius: responsiveWidth(11),
                                        backgroundColor: "#EF940B",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                />

                                :
                                <View style={{
                                    width: responsiveWidth(22),
                                    height: responsiveWidth(22),
                                    borderRadius: responsiveWidth(11),
                                    backgroundColor: "#EF940B",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                >
                                    <Font5 name="user-alt" color="#5E5E5E" size={responsiveWidth(7.5)} />
                                </View>

                            }
                            <TouchableOpacity
                                onPress={SelectProfilePhoto}
                                style={{
                                    width: responsiveWidth(8),
                                    height: responsiveWidth(8),
                                    borderRadius: responsiveWidth(4),
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#EFEFEF",
                                    position: 'absolute',
                                    top: 70,
                                    left: 70
                                }}
                            >
                                <Font5 name="camera" size={responsiveWidth(4)} color="#BCBCBC" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 2, justifyContent: "center" }}>
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: "white", fontWeight: "700" }}>Name - {name}</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: "white", fontWeight: "400" }}>Emp Code: {userId}</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: "white", fontWeight: "400" }}>Number - {phone}</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: "white", fontWeight: "400" }}>Email - abc@gmail.com</Text>
                        </View>

                        <View style={{
                            flex: 0.5,
                            alignItems: "center",
                            padding: responsiveWidth(3)
                        }}
                        >
                            <TouchableOpacity
                                onPress={ShareProfile}
                                style={{
                                    width: responsiveWidth(10),
                                    height: responsiveWidth(10),
                                    borderRadius: responsiveWidth(5),
                                    backgroundColor: "#CB01CF",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // alignSelf: "flex-end"
                                }}
                            >
                                <Font6 name="share-nodes" color="white" size={responsiveWidth(5)} />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>

                <View style={{ flex: 1, marginTop: responsiveWidth(3) }}>
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate("profileDetails")}
                        style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="user-alt" color="#046218" size={responsiveWidth(4.8)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>Personal Details</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>
                            <Font5 name="chevron-circle-right" color="#046218" size={responsiveWidth(4.5)} />
                        </View>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="credit-card" color="#046218" size={responsiveWidth(4.5)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>Payment Settings</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>
                            <Font5 name="chevron-circle-right" color="#046218" size={responsiveWidth(4.5)} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="user-tie" color="#046218" size={responsiveWidth(4.8)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>Professional Details</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>
                            <Font5 name="chevron-circle-right" color="#046218" size={responsiveWidth(4.5)} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="file-pdf" color="#046218" size={responsiveWidth(4.8)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>KYC Details</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>
                            <Font5 name="chevron-circle-right" color="#046218" size={responsiveWidth(4.5)} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="book-reader" color="#046218" size={responsiveWidth(4.8)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>Education Details</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>
                            <Font5 name="chevron-circle-right" color="#046218" size={responsiveWidth(4.5)} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("changeMpin")}
                        style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="unlock-alt" color="#046218" size={responsiveWidth(4.8)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>M-PIN</Text>
                        </View>
                        <View
                            style={styles.userDetailsContainerIconeRight}>
                            <Font5 name="chevron-circle-right" color="#046218" size={responsiveWidth(4.5)} />
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1.5 }}>

                    <View style={styles.userDetailsContainer}>
                        <View style={{ flex: 3, alignItems: "center" }}>
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: "#CB01CF" }}>OTHER LINKS</Text>
                        </View>
                        <View style={styles.userDetailsContainerTitle}>

                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>

                        </View>
                    </View>

                    <TouchableOpacity style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="shield-alt" color="black" size={responsiveWidth(4.8)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>Privacy Policy</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="shield-alt" color="black" size={responsiveWidth(4.8)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>Terms & Conditions</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="hand-holding-heart" color="black" size={responsiveWidth(4.8)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>Rate us</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <MaterialCommunity name="delete" color="red" size={responsiveWidth(5.5)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleTextDelete}>Delete Account</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleLogOut}
                        style={styles.userDetailsContainer}>
                        <View style={styles.userDetailsContainerIconeLeft}>
                            <Font5 name="power-off" color="black" size={responsiveWidth(5.5)} />
                        </View>
                        <View style={styles.userDetailsContainerTitle}>
                            <Text style={styles.userDetailsContainerTitleText}>Logout</Text>
                        </View>
                        <View style={styles.userDetailsContainerIconeRight}>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    userDetailsContainer: {
        flexDirection: "row",
        height: responsiveHeight(4),
        margin: responsiveWidth(2),
        marginBottom: responsiveWidth(1)
    },
    userDetailsContainerIconeLeft: {
        flex: 1, justifyContent: "center", alignItems: "center"
    },
    userDetailsContainerIconeRight: {
        flex: 1, justifyContent: "center", alignItems: "flex-end"
    },
    userDetailsContainerTitle: {
        flex: 6, justifyContent: "center"
    },
    userDetailsContainerTitleText: {
        fontSize: responsiveFontSize(1.8), color: "black", fontWeight: "400", marginLeft: responsiveWidth(2)
    },
    userDetailsContainerTitleTextDelete: {
        fontSize: responsiveFontSize(1.8), color: "red", fontWeight: "400", marginLeft: responsiveWidth(2)
    }

})
export default UserProfile