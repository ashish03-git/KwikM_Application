import { View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import the icons you want to use
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import the icons you want to use
import HomeScreen from '../MainScreens/HomeScreen';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LeadsScreen from '../MainScreens/LeadsScreen';
import AddScreen from '../MainScreens/AddScreen';
import ReferrelsScreen from '../MainScreens/ReferrelsScreen';
import SupportScreen from '../MainScreens/SupportScreen';
import MyLeadRetailer from '../Retailer/MyLeadRetailer';
import AddCustomer from '../OtherScreens/AddCustomer';
import ProductsScreen from '../OtherScreens/ProductsScreen';
import ProductTabScreen from '../Retailer/ProductTabScreen';
import HelpScreen from '../Retailer/HelpScreen';
import ScratchCardScreen from '../OtherScreens/ScratchCard';


const CustomTabBarIcon = ({ name, size, focused }) => {
    const iconSize = focused ? size + 2 : size; // Increase the size for the selected tab
    return (
        <FontAwesome
            name={name}
            size={iconSize}
            color={focused ? 'blue' : 'black'} // Change the color for the selected tab
        />
    );
};



const Tab = createBottomTabNavigator()

const BottomTab = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: responsiveHeight(7),
                    },
                    tabBarActiveTintColor: "#0B7E8E",
                    tabBarInactiveTintColor: "#444444",
                    // tabBarShowLabel:false
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => (
                            <FontAwesome name="home" size={responsiveWidth(7)} color={color} />
                        ),
                        tabBarLabelStyle: {
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: "600",
                            marginBottom: responsiveWidth(1)
                        }
                    }}
                />
                <Tab.Screen
                    name="Products"
                    component={ProductTabScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="file-text" size={responsiveWidth(6)} color={color} />
                        ),
                        tabBarLabelStyle: {
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: "600",
                            marginBottom: responsiveWidth(1)

                        }
                    }}
                />
                <Tab.Screen
                name='referel'
                    component={ScratchCardScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="code-fork" size={responsiveWidth(7)} color={color} />
                        ),
                        tabBarLabelStyle: {
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: "600",
                            marginBottom: responsiveWidth(1)

                        }
                    }}
                />
                <Tab.Screen
                    name='Support'
                    component={HelpScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="users" size={responsiveWidth(6)} color={color} />
                        ),
                        tabBarLabelStyle: {
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: "600",
                            marginBottom: responsiveWidth(1)
                        }
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

export default BottomTab;
