import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Font5 from "react-native-vector-icons/FontAwesome5"

const OnbordingScreen1 = () => {
    return (
        // <View style={{ flex: 1 }}>
        //     <Onboarding
        //         pages={[
        //             {
        //                 backgroundColor: "white",
        //                 image: <Image source={require("../../assets/onboardingImg1.png")} style={{ width: responsiveWidth(100), height: responsiveHeight(40) }} />,
        //                 title: "Earn Over 50,000 Monthly",
        //                 subtitle: "Money in your bank every 7 days"
        //             },
        //             {
        //                 backgroundColor: "white",
        //                 image: <Image source={require("../../assets/onboardingImg2.png")} style={{ width: responsiveWidth(100), height: responsiveHeight(40) }} />,
        //                 title: "Refer & Earn Program",
        //                 subtitle: "Refer to your friend and get upto 5% referal income for lifetime"
        //             },
        //             {
        //                 backgroundColor: "white",
        //                 image: <Image source={require("../../assets/onboardingImg3.png")} style={{ width: responsiveWidth(100), height: responsiveHeight(30) }} />,
        //                 title: "Earn Over 50,000 Monthly",
        //                 subtitle: "Trusted by 2L + Partners"
        //             },

        //         ]}
        //         bottomBarHighlight={false}
        //         showSkip={true}
        //     />
        //     <View style={{ position: "absolute", bottom: 0, width: responsiveWidth(100) }}>

        //         <ImageBackground source={require("../../assets/onboardingBottomImg.png")} style={{ width: responsiveWidth(100), height: responsiveHeight(15), position: "relative", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: responsiveWidth(8) }} >
        //             <TouchableOpacity >
        //                 <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "700", color: "white", margin: responsiveWidth(4) }}>Skip</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity style={{ flexDirection: "row" }}>
        //                 <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "700", color: "white", margin: responsiveWidth(4), marginRight: responsiveWidth(3) }}>Next</Text>
        //                 <View style={{ marginTop: responsiveWidth(4), marginRight: responsiveWidth(4) }}>
        //                     <Font5 name="angle-double-right" color="white" size={responsiveWidth(6)} />
        //                 </View>
        //             </TouchableOpacity>
        //         </ImageBackground>

        //     </View>
        // </View>


        <View style={{ flex: 1 }}>
            <View style={{flex:2}}></View>
            <View style={{flex:1}}></View>
            <View style={{flex:1}}></View>
        </View>
    )
}

export default OnbordingScreen1