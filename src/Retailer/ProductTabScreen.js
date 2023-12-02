import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Font6 from "react-native-vector-icons/FontAwesome6"
import Font5 from "react-native-vector-icons/FontAwesome5"
import { useNavigation, useRoute } from '@react-navigation/native'
import ActivityLoader from '../OtherScreens/ActivityLoader'
import useNetInfo from '../OtherScreens/useNetInfo'
import NoConnection from '../OtherScreens/NoConnection'
import { addCategoryId, addProductId } from '../redux/Slice'
import { useDispatch, useSelector } from 'react-redux'



const ProductTabScreen = () => {

    const navigation = useNavigation()
    const netInfo = useNetInfo()
    const [browse_Category, setBrowseCategory] = useState([])
    const dispatch = useDispatch()
    const [activityIndicator, setActivityIndicator] = useState(false)


    useEffect(() => {
        setActivityIndicator(true)
        browse_Category_Products()
    }, [])

    const browse_Category_Products = () => {

        // console.log("browse_Category_Products")
        fetch("https://kwikm.in/dev_kwikm/api/allcategory.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "iv": "cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09",
                "x-api-key": "SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==",
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data.data)
                setActivityIndicator(false)
                setBrowseCategory(data.data)
            })
    }


    return (
        <>
            {activityIndicator ?
                <View style={{ flex: 1, backgroundColor: "#eaffea" }}>
                    <ActivityLoader />
                </View>
                :
                <View style={{ flex: 1, backgroundColor: "#eaffea" }}>
                    {netInfo ?
                        <>
                            <StatusBar backgroundColor={"#eaffea"} />

                            <View style={{ height: responsiveHeight(8), flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                                >
                                    <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
                                </TouchableOpacity>
                                <View style={{
                                    flex: 6,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: responsiveFontSize(2.5),
                                            color: "black", fontWeight: "700"
                                        }}
                                        >Product Categories</Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        marginLeft: responsiveWidth(5),
                                        fontSize: responsiveFontSize(2.2),
                                        color: "black"
                                    }}
                                >Select from categories to sell</Text>
                            </View>

                            <View
                                style={{
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    paddingTop: responsiveWidth(5)
                                }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <FlatList
                                        data={browse_Category}
                                        numColumns={2}
                                        renderItem={({ item }) => {
                                            const id = item.id
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        dispatch(addCategoryId(id))
                                                        navigation.navigate("products")
                                                    }}
                                                    style={{
                                                        width: responsiveWidth(44),
                                                        height: responsiveHeight(24),
                                                        backgroundColor: "white",
                                                        borderRadius: responsiveWidth(3),
                                                        margin: responsiveWidth(2), // Add margin to create space between items
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderWidth: 0.5,
                                                        borderColor: "#C9C9C9"
                                                    }}
                                                >
                                                    <View style={{
                                                        marginVertical: responsiveWidth(5)
                                                    }}>
                                                        <Font6 name={`${item.icon}`} size={responsiveWidth(10)} color="#A2159C" />
                                                    </View>

                                                    <Text style={{
                                                        fontSize: responsiveFontSize(2.1),
                                                        color: "black", fontWeight: "700"
                                                    }}>{item.title}</Text>
                                                    <Text style={{ color: "black", fontSize: responsiveFontSize(1.8) }}>Earn Upto {item.commission} Rs.</Text>

                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>

                            </View>

                        </>
                        :
                        <NoConnection />
                    }

                </View>
            }


        </>
    )


}






export default ProductTabScreen