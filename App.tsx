import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import RegisterScreen from './src/auth/RegisterScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './src/navigator/BottomTab'
import OnbordingScreen1 from './src/onbording/OnbordingScreen1'
import RegisterOtpScreen from './src/auth/RegisterOtpScreen'
import LoginOtpScreen from './src/auth/LoginOtpScreen'
import store from './src/redux/Store'
import { Provider } from 'react-redux'
import RegisterMPINScreen from './src/auth/RegisterMPINScreen.js'
import LoginWithNumber from './src/auth/LoginWithNumber'
import LoginMPINScreen from './src/auth/LoginMPINScreen'
import ProductsScreen from './src/OtherScreens/ProductsScreen'
import ProductDetails from './src/OtherScreens/ProductDetails'
import AddCustomer from './src/OtherScreens/AddCustomer'
import SpalshScreen from './src/auth/SpalshScreen'
import ApkSubscripton from './src/OtherScreens/ApkSubscripton'
import PaytmScreen from './src/OtherScreens/PaytmScreen'
import PiceOnboarding from './src/OtherScreens/PiceOnboarding'
import PiceLeadScreen from './src/OtherScreens/PiceLeadScreen'
import MyLeadRetailer from './src/Retailer/MyLeadRetailer'
import ProductTabScreen from './src/Retailer/ProductTabScreen'
import ChangeMpinScreen from './src/ProfileScreens/ChangeMpinScreen'
import WebViewScreen from './src/OtherScreens/WebViewScreeen'
import InsuaranceProductsScreens from './src/OtherScreens/InsuaranceProductsScreens'
import PurchaseInsuarance from './src/OtherScreens/PurchaseInsuarance'
import AddRetailer from './src/Distributor/AddRetailer'
import LeadAddSuccessMesageScreen from './src/OtherScreens/LeadAddSuccessMesageScreen'
import ScratchCardScreen from './src/OtherScreens/ScratchCard'
import RewardsScreen from './src/ProfileScreens/RewardsScreen'



// Distributor screens
import DistributorBottomTab from './src/navigator/DistributorBottomTab'
import MyTeamDistributor from './src/Distributor/MyTeamDistributor'
import EarningDetailsDistributor from './src/Distributor/EarningDetailsDistributor'



// Corporate Partner
import CorpBottomTab from './src/navigator/CorpBottomTab'
import MyTeamCorporate from './src/Corporate/MyTeamCorporate'
import EarningDetailsCorporate from './src/Corporate/EarningDetailsCorporate'
import AddDistributor from './src/Corporate/AddDistributor'




// common imports
import UserProfile from './src/ProfileScreens/UserProfile'
import TrainingVideoScreen from './src/Retailer/TrainingVideoScreen'
import HelpScreen from './src/Retailer/HelpScreen'




const Stack = createStackNavigator()
const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName='onboarding'> */}
          <Stack.Navigator initialRouteName='spalsh'>
            <Stack.Screen name="spalsh" options={{ headerShown: false }} component={SpalshScreen} />
            <Stack.Screen name='onboarding' options={{ headerShown: false }} component={OnbordingScreen1} />
            <Stack.Screen name='register' options={{ headerShown: false }} component={RegisterScreen} />
            <Stack.Screen name='registerOtp' options={{ headerShown: false }} component={RegisterOtpScreen} />
            <Stack.Screen name='registerMPIN' options={{ headerShown: false }} component={RegisterMPINScreen} />
            <Stack.Screen name='loginMPIN' options={{ headerShown: false }} component={LoginMPINScreen} />
            <Stack.Screen name='loginNumber' options={{ headerShown: false }} component={LoginWithNumber} />
            <Stack.Screen name='loginOtp' options={{ headerShown: false }} component={LoginOtpScreen} />
            <Stack.Screen name='tabs' options={{ headerShown: false }} component={BottomTab} />
            <Stack.Screen name='mylead' options={{ headerShown: false }} component={MyLeadRetailer} />
            <Stack.Screen name='trainingVideo' options={{ headerShown: false }} component={TrainingVideoScreen} />
            <Stack.Screen name='help' options={{ headerShown: false }} component={HelpScreen} />
            <Stack.Screen name='products' options={{ headerShown: false }} component={ProductsScreen} />
            <Stack.Screen name='productDetails' options={{ headerShown: false }} component={ProductDetails} />
            <Stack.Screen name='productTab' options={{ headerShown: false }} component={ProductTabScreen} />
            <Stack.Screen name='addcustomer' options={{ headerShown: false }} component={AddCustomer} />
            <Stack.Screen name='apkSubscription' options={{ headerShown: false }} component={ApkSubscripton} />
            <Stack.Screen name='paytmScreen' options={{ headerShown: false }} component={PaytmScreen} />
            <Stack.Screen name='piceLeadScreen' options={{ headerShown: false }} component={PiceLeadScreen} />
            <Stack.Screen name='piceOnboarding' options={{ headerShown: false }} component={PiceOnboarding} />
            <Stack.Screen name='insuaranceProducts' options={{ headerShown: false }} component={InsuaranceProductsScreens} />
            <Stack.Screen name='purchaseInsuarance' options={{ headerShown: false }} component={PurchaseInsuarance} />
            <Stack.Screen name='openWebView' options={{ headerShown: false }} component={WebViewScreen} />
            <Stack.Screen name='leadSuccessMsg' options={{ headerShown: false }} component={LeadAddSuccessMesageScreen} />
            <Stack.Screen name='scratch' options={{ headerShown: false }} component={ScratchCardScreen} />
            <Stack.Screen name='rewards' options={{ headerShown: false }} component={RewardsScreen} />


            {/* common screen */}
            <Stack.Screen name="userProfile" options={{ headerShown: false }} component={UserProfile} />
            {/* <Stack.Screen name="profileDetails" options={{ headerShown: false }} component={ProfileDetailsScreen} /> */}
            <Stack.Screen name="changeMpin" options={{ headerShown: false }} component={ChangeMpinScreen} />


            {/* Distributor screens */}
            <Stack.Screen name='distributorTab' options={{ headerShown: false }} component={DistributorBottomTab} />
            <Stack.Screen name='myTeamDistributor' options={{ headerShown: false }} component={MyTeamDistributor} />
            <Stack.Screen name='earningDetailsDistributor' options={{ headerShown: false }} component={EarningDetailsDistributor} />
            <Stack.Screen name='addRetailer' options={{ headerShown: false }} component={AddRetailer} />


            {/* Corporate Partner   */}
            <Stack.Screen name='corpDistributorTab' options={{ headerShown: false }} component={CorpBottomTab} />
            <Stack.Screen name='myTeamCorporate' options={{ headerShown: false }} component={MyTeamCorporate} />
            <Stack.Screen name='earingDetailsCorporate' options={{ headerShown: false }} component={EarningDetailsCorporate} />
            <Stack.Screen name='addDistributor' options={{ headerShown: false }} component={AddDistributor} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  )
}

export default App