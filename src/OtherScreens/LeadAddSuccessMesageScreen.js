import { View, Text, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import Font6 from "react-native-vector-icons/FontAwesome6"
import Font5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcone from "react-native-vector-icons/MaterialCommunityIcons"

const LeadAddSuccessMesageScreen = () => {
    const leadDetails = useSelector(state => state.details.lead_details)
    const leadData = leadDetails[0]
    const leadUserDetails = leadDetails[1]
    const navigation = useNavigation()

    const name = leadUserDetails.full_name
    const phone = leadUserDetails.mobile_no
    const email = leadUserDetails.email
    const pan = leadUserDetails.pan
    const leadCode = leadData.data.lead_code;
    const campaignUrl = leadData.data.campaign_url
    const message = leadData.message
    // console.log(message)

    const ShareLeadDetails = async () => {

        const message = `

        KWIK M App

        Name: ${name}\n
        Phone: ${phone}\n
        Email: ${email}\n
        Pan: ${pan}\n
        Lead Code: ${leadCode}\n
        Campaign URL: ${campaignUrl}\n`;

        try {
            // Share the message
            const result = await Share.share({
                message: message,

            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#eaffea" }}>

            <View style={{
                flex: 5,
                alignItems: "center",
                justifyContent: "center"
                // backgroundColor: "white"
            }}>
                <View
                    style={{
                        width: responsiveWidth(94),
                        // height: responsiveHeight(50),
                        borderRadius: responsiveWidth(3),
                        backgroundColor: "white"
                    }}
                >
                    <View
                        style={{
                            padding: responsiveWidth(5)
                        }}
                    >
                        <View style={{ marginBottom: responsiveWidth(3) }}>
                            <Text
                                style={{
                                    fontSize: responsiveFontSize(2.2),
                                    color: "black",
                                    fontWeight: "700"
                                }}
                            >
                                Lead Details -
                            </Text>
                        </View>

                        <View style={{ marginBottom: responsiveWidth(5) }}>

                            <View style={{ flexDirection: "row", marginVertical: responsiveWidth(2), paddingLeft: responsiveWidth(2) }}>
                                <Font5 name="user-alt" size={responsiveWidth(4)} color="#686868" />
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(2),
                                        color: "black",
                                        fontWeight: "700",
                                        marginLeft: responsiveWidth(2)
                                    }}
                                >
                                    Name -
                                </Text>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: "black",
                                        // fontWeight: "700",
                                        marginLeft: responsiveWidth(1)
                                    }}
                                >
                                    {name}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", marginVertical: responsiveWidth(2), paddingLeft: responsiveWidth(2) }}>
                                <Font5 name="phone-alt" size={responsiveWidth(4)} color="#686868" />
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(2),
                                        color: "black",
                                        fontWeight: "700",
                                        marginLeft: responsiveWidth(2)
                                    }}
                                >
                                    Phone -
                                </Text>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: "black",
                                        // fontWeight: "700",
                                        marginLeft: responsiveWidth(1)
                                    }}
                                >
                                    {phone}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", marginVertical: responsiveWidth(2), paddingLeft: responsiveWidth(2) }}>
                                <Font5 name="credit-card" size={responsiveWidth(4)} color="#686868" />
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(2),
                                        color: "black",
                                        fontWeight: "700",
                                        marginLeft: responsiveWidth(2)
                                    }}
                                >
                                    Pan -
                                </Text>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: "black",
                                        // fontWeight: "700",
                                        marginLeft: responsiveWidth(1)
                                    }}
                                >
                                    {pan}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", marginVertical: responsiveWidth(2), paddingLeft: responsiveWidth(2) }}>
                                <MaterialIcone name="email" size={responsiveWidth(5.5)} color="#686868" />
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(2),
                                        color: "black",
                                        fontWeight: "700",
                                        marginLeft: responsiveWidth(2)
                                    }}
                                >
                                    Email -
                                </Text>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: "black",
                                        // fontWeight: "700",
                                        marginLeft: responsiveWidth(1)
                                    }}
                                >
                                    {email}
                                </Text>
                            </View>

                        </View>

                        <View style={{ marginBottom: responsiveWidth(3) }}>
                            <Text
                                style={{
                                    fontSize: responsiveFontSize(2.2),
                                    color: "black",
                                    fontWeight: "700"
                                }}
                            >
                                Lead Status -
                            </Text>
                        </View>

                        <View style={{ marginBottom: responsiveWidth(5) }}>

                            <View style={{ flexDirection: "row", marginVertical: responsiveWidth(2) }}>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(2),
                                        color: "black",
                                        fontWeight: "700",
                                        marginLeft: responsiveWidth(3)
                                    }}
                                >
                                    Lead Code -
                                </Text>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: "green",
                                        fontWeight: "700",
                                        marginLeft: responsiveWidth(1)
                                    }}
                                >
                                    {leadCode}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", marginVertical: responsiveWidth(2) }}>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(2),
                                        color: "black",
                                        fontWeight: "700",
                                        marginLeft: responsiveWidth(3)
                                    }}
                                >
                                    message -
                                </Text>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: "green",
                                        // fontWeight: "700",
                                        marginLeft: responsiveWidth(1)
                                    }}
                                >
                                    {message}
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                marginVertical: responsiveWidth(2),
                                flexWrap: "wrap",

                            }}>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(2),
                                        color: "black",
                                        fontWeight: "700",
                                        marginLeft: responsiveWidth(3)
                                    }}
                                >
                                    Campaign url -
                                </Text>
                                <Text
                                    style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: "green",
                                        // fontWeight: "700",
                                        marginLeft: responsiveWidth(1)
                                    }}
                                >
                                    {campaignUrl}
                                </Text>
                            </View>

                        </View>

                    </View>

                </View>
            </View>

            <View style={{
                flex: 1,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: responsiveWidth(45),
                        height: responsiveHeight(6),
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#A2159C",
                        borderRadius: responsiveWidth(10)
                    }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: "white", fontWeight: "700" }}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={ShareLeadDetails}
                    style={{
                        width: responsiveWidth(45),
                        height: responsiveHeight(6),
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#A2159C",
                        borderRadius: responsiveWidth(10),
                        flexDirection: "row"
                    }}>
                    <Font6 name="share-nodes" color="white" size={responsiveWidth(5)} />
                    <Text style={{
                        fontSize: responsiveFontSize(2),
                        marginLeft: responsiveWidth(3),
                        color: "white",
                        fontWeight: "700"
                    }}>Share</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default LeadAddSuccessMesageScreen