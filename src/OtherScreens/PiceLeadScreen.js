import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import Font6 from "react-native-vector-icons/FontAwesome6"
import Font5 from "react-native-vector-icons/FontAwesome5"
import Font from "react-native-vector-icons/FontAwesome"
import Details from './Details'
import MyStats from './MyStats'
import Training from './Training'
import ActivityLoader from './ActivityLoader'
import useNetInfo from './useNetInfo';
import NoConnection from './NoConnection';
import AsyncStorage from '@react-native-async-storage/async-storage'



const PiceLeadScreen = () => {

    // variables
    const navigation = useNavigation()
    const [stats, setStats] = useState(true)
    const [details, setDetails] = useState(false)
    const [training, setTraining] = useState(false)
    const [activityIndicator, setActivityIndicator] = useState(false)
    const route = useRoute()

    const [content, setContent] = useState(null)
    const [piceLeadList, setPiceLeadList] = useState([])
    const [piceLeadListStatus, setPiceLeadListStatus] = useState(false)
    // const [user_id, setUser_Id] = useState(null)
    const netInfo = useNetInfo()
    const [msg, setMsg] = useState(null)
    const fetchStatusRef = useRef(false);

    const fetchData = async () => {
        try {
            const userId = await AsyncStorage.getItem('user_id');
            if (userId) {
                await FetchPiceLead(userId);
                setActivityIndicator(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setActivityIndicator(true)
        fetchData();
        setTimeout(() => {
            setActivityIndicator(false)
        }, 500);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setActivityIndicator(true)
            fetchData();
        }, [])
    );

    const FetchPiceLead = async (userId) => {
        try {
            const response = await fetch(
                'https://kwikm.in/dev_kwikm/api/pice_leads.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: userId,
                    }),
                }
            );
            const apiData = await response.json();

            if (apiData.status) {
                setPiceLeadListStatus(true);
                setPiceLeadList(apiData.data);
            } else {
                setPiceLeadListStatus(false);
                setMsg(apiData.message);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const listItemStyle = useMemo(() => ({
        width: responsiveWidth(92),
        height: responsiveHeight(10),
        borderRadius: responsiveWidth(3),
        backgroundColor: 'white',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: responsiveWidth(5),
    }), []);

    const buttonStyle = useMemo(() => ({
        width: responsiveWidth(65),
        height: responsiveHeight(6),
        borderRadius: responsiveWidth(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A2159C',
        position: "absolute",
        zIndex: 1,
        // marginTop:responsiveWidth(3)
        top: 0.5,
        // right:1
    }), []);


    return (

        <>
            {netInfo ?
                <>
                    {activityIndicator ?
                        <View style={{ flex: 1, backgroundColor: "#EAFFEA" }}>
                            <ActivityLoader />
                        </View>

                        :
                        <>
                            <View style={{ flex: 1, backgroundColor: "#EAFFEA" }}>

                                <View style={{ height: responsiveHeight(8), flexDirection: "row" }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
                                    </TouchableOpacity>
                                    <View style={{ flex: 4, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                        <View>
                                            <Text style={{ fontSize: responsiveFontSize(2.5), color: "black", fontWeight: "700" }}> Pice </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={["#DB3DB8", "#3546A0"]}
                                        style={{
                                            width: responsiveWidth(92),
                                            height: responsiveHeight(10),
                                            borderRadius: responsiveWidth(3),
                                            flexDirection: "row"

                                        }}
                                    >
                                        <View style={{ flex: 1, justifyContent: "center", paddingLeft: responsiveWidth(3) }}>
                                            <Image
                                                source={{
                                                    uri: "https://s3-alpha-sig.figma.com/img/194e/d3d3/9b84c17b53d2bc62ad00267968c6be6a?Expires=1702252800&Signature=jO3kRNo82F3lfIBmOKlQw20-V1WmyWh6atx6i6PGDIV~5RffSWCraR2GdeYUN9lon19NL00I3FrNkolKtUvdUcOONZ6ylffNCe-TPTvneZypZW~4aLdN~SdYYxNFj-sNCtDYH9SqVtR8Ddidc6gDTOOjjNnC0iTcaeMtX3LO33f3QoMinJPPqCtHaC5yW3L2PaNRKeMsWiLjd8lYSxhrQbnTy85puMusKpdcTF8vgayMX-lDSML-fEsrhmCTquemWxmDb0mp1msJ3OJ8MSCE61sWuSfnP6NZDofr8j-CUO-QufixIpYXy2dVmhOMExqxnGBF26DiyqRI74UBZ6RG9A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                                }}
                                                style={{
                                                    borderRadius: responsiveWidth(3),
                                                    width: responsiveWidth(25), height: responsiveHeight(9),
                                                    resizeMode: "contain"
                                                }} />
                                        </View>
                                        <View style={{ flex: 2, justifyContent: "center" }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.2), color: 'white' }}> Pice Onboarding Process</Text>
                                        </View>
                                    </LinearGradient>
                                </View>

                                {/* {piceLeadList} */}
                                {piceLeadListStatus ?
                                    <View style={{ flex: 1, alignItems: "center", marginTop: responsiveHeight(2) }}>
                                        {activityIndicator ?
                                            <ActivityLoader />
                                            :
                                            <>
                                                <FlatList
                                                    data={piceLeadList}
                                                    showsVerticalScrollIndicator={false}
                                                    style={{ marginTop: responsiveWidth(2) }}
                                                    renderItem={({ item }) => {
                                                        const logo = item.customer_name ? item.customer_name[0].toUpperCase() : null

                                                        return (
                                                            <View style={{
                                                                width: responsiveWidth(94),
                                                                height: responsiveHeight(15),
                                                                borderRadius: responsiveWidth(3),
                                                                backgroundColor: 'white',
                                                                marginTop: responsiveWidth(3),
                                                                marginBottom: responsiveWidth(3),
                                                                borderWidth: 1,
                                                                borderColor: "#E3E3E3"
                                                            }}>
                                                                <View style={{ flex: 2, flexDirection: "row" }}>
                                                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                                        <View style={{
                                                                            width: responsiveWidth(12),
                                                                            height: responsiveWidth(12),
                                                                            borderRadius: responsiveWidth(6),
                                                                            // backgroundColor:"red",
                                                                            backgroundColor: "#00D4C7",
                                                                            justifyContent: "center",
                                                                            alignItems: "center"
                                                                        }}
                                                                        >
                                                                            <Text style={{ fontSize: responsiveFontSize(4.2), color: "white", fontWeight: "700" }}>{logo}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 4, flexDirection: "row" }}>
                                                                        <View style={{ flex: 3, justifyContent: "center" }}>
                                                                            <Text style={{ color: "black", fontWeight: "700", fontSize: responsiveFontSize(1.8) }}>{item.customer_name}</Text>
                                                                            {/* <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6) }}>{item.email}</Text> */}
                                                                            <Text style={{ color: 'black', fontSize: responsiveFontSize(1.7) }}>+91 {item.customer_phone}</Text>
                                                                        </View>

                                                                    </View>
                                                                </View>
                                                                <View style={{ height: responsiveWidth(0.2), backgroundColor: "#BFBFBF" }} />
                                                                <View style={{ flex: 1, flexDirection: "row" }}>
                                                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                                        <Text style={{ color: "black" }}>{item.lead_date}</Text>
                                                                    </View>
                                                                    <View style={{ width: responsiveWidth(0.3), backgroundColor: "#BFBFBF" }} />
                                                                    {item.status === "Success" ?
                                                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                                            <Text style={{ color: "#03A013", fontWeight: "700" }}>{item.status}</Text>
                                                                        </View>
                                                                        :
                                                                        null
                                                                    }
                                                                    {item.status === "InProgress" ?
                                                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                                            <Text style={{ color: "#FF6B00", fontWeight: "700" }}>{item.status}</Text>
                                                                        </View>
                                                                        :
                                                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                                            <Text style={{ color: "#FF6B00", fontWeight: "700" }}>{item.status}</Text>
                                                                        </View>
                                                                    }
                                                                    {item.status === "Rejected" ?
                                                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                                            <Text style={{ color: "#FF0000", fontWeight: "700" }}>{item.status}</Text>
                                                                        </View>
                                                                        :
                                                                        null

                                                                    }

                                                                </View>

                                                            </View>
                                                        )
                                                    }}
                                                />
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate("piceOnboarding")}
                                                    style={{
                                                        width: responsiveWidth(16),
                                                        height: responsiveWidth(16),
                                                        borderRadius: responsiveWidth(8),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#A2159C',
                                                        position: "absolute",
                                                        margin: responsiveWidth(4),
                                                        zIndex: 1,
                                                        // marginTop:responsiveWidth(3)
                                                        top: responsiveHeight(70),
                                                        left: responsiveWidth(73)
                                                        // right:1  
                                                    }}>
                                                    <Text style={{ fontSize: responsiveFontSize(7), color: 'white' }}>+</Text>
                                                </TouchableOpacity>
                                            </>
                                        }
                                    </View>
                                    :
                                    <View style={{ height: responsiveHeight(50), justifyContent: "center", alignItems: "center" }}>
                                        <View style={listItemStyle}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../assets/mystats.png')} />
                                            </View>
                                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: responsiveFontSize(2.4), color: '#690B6A', fontWeight: '700' }}>
                                                    Earn 0 Rs.
                                                </Text>
                                                <Text style={{ fontSize: responsiveFontSize(1.9), color: 'black' }}>
                                                    On your customer’s successful card activation.
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{
                                            width: responsiveWidth(92),
                                            height: responsiveHeight(32),
                                            borderRadius: responsiveWidth(3),
                                            backgroundColor: 'white',
                                            marginTop: responsiveWidth(5),
                                        }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../assets/mystatsUser.png')} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                                    <Text style={{ fontSize: responsiveFontSize(2.2), color: 'black', fontWeight: '700' }}>No Customer Found</Text>
                                                </View>
                                                <View style={{ flex: 1, alignSelf: 'center', width: responsiveWidth(80), alignItems: 'center' }}>
                                                    <Text style={{ fontSize: responsiveFontSize(1.9), color: 'black' }}>Add customer and earn extra income. Track the details anytime.</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate("piceOnboarding")}
                                                    style={buttonStyle}>
                                                    <Text style={{ fontSize: responsiveFontSize(2), color: 'white' }}>Add New Customer</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                }



                            </View>
                        </>

                    }
                </>
                :
                <NoConnection />
            }
        </>

    )
}

export default PiceLeadScreen;
