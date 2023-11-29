import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Font6 from "react-native-vector-icons/FontAwesome6"
import Font5 from "react-native-vector-icons/FontAwesome5"
import Font from "react-native-vector-icons/FontAwesome"
import Octicons from "react-native-vector-icons/Octicons"
import { useNavigation, useRoute } from '@react-navigation/native'
import ActivityLoader from './ActivityLoader'
import useNetInfo from './useNetInfo';
import NoConnection from './NoConnection';


const ApkSubscripton = () => {

    const navigation = useNavigation()
    const [activityIndicator, setActivityIndicator] = useState(false)
    const netInfo = useNetInfo()

    useEffect(() => {
        setActivityIndicator(true)
        setTimeout(() => {
            setActivityIndicator(false)
        }, 1000);
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: "#eaffea" }}>
            {netInfo ?
                <>
                    {activityIndicator ?
                        <ActivityLoader />
                        :
                        <>
                            <View style={{ height: responsiveHeight(8), flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
                                </TouchableOpacity>
                                <View style={{ flex: 4, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <View>
                                        <Text style={{ fontSize: responsiveFontSize(2.5), color: "black", fontWeight: "700" }}>APK Subscriptions</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                height: responsiveHeight(15),
                                justifyContent: "space-around",
                                alignItems: "center"
                            }}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("paytmScreen")}
                                    style={{
                                        width: responsiveWidth(46),
                                        height: responsiveHeight(12),
                                        borderRadius: responsiveWidth(4),
                                        elevation: 5,
                                        shadowColor: "black",
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri:
                                            "https://s3-alpha-sig.figma.com/img/9187/ed89/ad6786507da60004a172c93ff2bfda2c?Expires=1702252800&Signature=iRRNySEdcedbb-Bk4cW~NjhvUNDyHJsSIWH8gJwfndHwV7GQeW-H3qm1qOJBPli55x75c3Qx29ddU9PcPmqsxf1Z5UY-RwIld79SrYnGcqyeNvw7LsHS84QNx3rPXgzUn1Z5oWeQlJtwxATZbFdIfE4ZzganHeQkxAtwz9W3PB8aOcM3p7GkaK~74FfS9I2UkpAkljYcIPDbZUVz2hv2Ay9-Lm2ye7DIgGVNeE7X7DFXBROka8UMSonn4XDNTFDIeUfL2vErgQLII-UiQoLetR1XBVhN9NQSnMu9gRCtMjwn1o1ArF2qiJJykt~tocUJA2Uj0ti6D~omU9zS2~~CLg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                        }}
                                        style={{
                                            width: responsiveWidth(46),
                                            height: responsiveHeight(12),
                                            borderRadius: responsiveWidth(4),
                                        }}
                                    />
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={() => navigation.navigate("piceLeadScreen")}
                                    style={{
                                        width: responsiveWidth(46),
                                        height: responsiveHeight(12),
                                        borderRadius: responsiveWidth(4),
                                        elevation: 5,
                                        shadowColor: "black",
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: "https://s3-alpha-sig.figma.com/img/194e/d3d3/9b84c17b53d2bc62ad00267968c6be6a?Expires=1702252800&Signature=jO3kRNo82F3lfIBmOKlQw20-V1WmyWh6atx6i6PGDIV~5RffSWCraR2GdeYUN9lon19NL00I3FrNkolKtUvdUcOONZ6ylffNCe-TPTvneZypZW~4aLdN~SdYYxNFj-sNCtDYH9SqVtR8Ddidc6gDTOOjjNnC0iTcaeMtX3LO33f3QoMinJPPqCtHaC5yW3L2PaNRKeMsWiLjd8lYSxhrQbnTy85puMusKpdcTF8vgayMX-lDSML-fEsrhmCTquemWxmDb0mp1msJ3OJ8MSCE61sWuSfnP6NZDofr8j-CUO-QufixIpYXy2dVmhOMExqxnGBF26DiyqRI74UBZ6RG9A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                        }}
                                        style={{
                                            width: responsiveWidth(46),
                                            height: responsiveHeight(12),
                                            borderRadius: responsiveWidth(4),
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>

                        </>
                    }
                </>
                :
                <NoConnection />
            }

        </View>
    )
}

export default ApkSubscripton