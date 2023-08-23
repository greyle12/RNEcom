import React , { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Search } from '../screens';
import { COLORS} from "../assets/constants/theme"
import { icons } from "../assets/constants/icons"
import { ScreenHeaderBtn } from "../components/header/ScreenHeaderBtn"
import { Image } from 'react-native';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();


const screenOptions = {
    tabBarShowlabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        postion: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70
    }
}




const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen 
                name='Home' 
                component={Home}
                options={{
                    
                    
                }}
            >
            </Tab.Screen>
            <Tab.Screen name='Search' 
                component={Search}
                />
            <Tab.Screen name='Profile' 
                component={Profile}

                />
        </Tab.Navigator>
    );
}

export default BottomTab;