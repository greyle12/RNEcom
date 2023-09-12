import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './profile.style';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../assets/constants';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import icons from '../assets/constants/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SelfProfile = ({navigation}) => {
    const [userData, setUserData] = useState(null)
    const [userLogin, setUserLogin] = useState(false)

    useEffect(()=>{
        checkExistingUser();
    }, []);

    const checkExistingUser = async ()=> {
        const id = await AsyncStorage.getItem('id')
        const userId = `user${JSON.parse(id)}`;
        
        try {
            const currentUser = await AsyncStorage.getItem(userId);
            
            if(currentUser !== null){
                //console.log("--currentUser:", currentUser)
                const parseData = JSON.parse(currentUser)
                //console.log("parseData", parseData);
                setUserData(parseData)
                setUserLogin(true)
            }else{
                navigation.navigate('Login')
            }
        } catch (error) {      
            console.log("CheckExistingUser: Error retrieving the data", error);
        }
    }


    const clearCache = () => {
        Alert.alert(
            "Clear Cache",
            "Are you sure you want to delete all saved data on your device?",
            [
                {
                    text: "Cancel", onPress: ()=>console.log("cancel clear")
                },
                {
                    text: "Continue", onPress: ()=>console.log("continue clear")
                },
                {defaultIndex : 1}
            ]
        )
    }

    const deleteAccount = () => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete yor account?",
            [
                {
                    text: "Cancel", onPress: ()=>console.log("cancel delete")
                },
                {
                    text: "Continue", onPress: ()=>console.log("continue delete")
                },
                {defaultIndex : 1}
            ]
        )
    }


    const userLogout = async()=> {
        const id = await AsyncStorage.getItem('id')
        const userId = `user${JSON.parse(id)}`;

        try {
            await AsyncStorage.multiRemove([userId, 'id'])
            navigation.replace('Bottom Navgation')
        } catch (error) {
            console.log("userLogout Error log out the user", error);
        }
    }


    const logout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel", onPress: ()=>console.log("cancel pressed")
                },
                {
                    text: "Continue", onPress: () => userLogout()
                },
                {defaultIndex : 1}
            ]
        )
    }

    return(
        <View style={styles.container} >
            <View style={styles.container} >
                <StatusBar backgroundColor={COLORS.gray}/>

                <View style={{width: '100%'}}>
                    <Image 
                        source={require('../assets/images/space.jpg')}
                        style={styles.cover}
                    />
                </View>

                <View style={styles.profileContainer} >
                    <Image 
                        source={require('../assets/images/profile.jpeg')}
                        style={styles.profile}
                    />

                    <Text style={styles.name}>
                        {userLogin === true ? userData.username : "Please login into your account"}
                    </Text>
                    {userLogin === false ? (
                        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                            <View style={styles.loginBtn} >
                                <Text style={styles.menuText} >L O G I N</Text>
                            </View>
                        </TouchableOpacity>
                    ): (
                        <View style={styles.loginBtn} >
                            <Text style={styles.menuText} >{userData.email}</Text>
                        </View>
                    )}

                    {userLogin === false ? (
                        <View></View>
                    ): (
                        <View style={styles.menuWrapper} >
                            
                            <TouchableOpacity onPress={()=>navigation.navigate("Favorite")}>
                                <View style={styles.menuItem(0.3)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.heartOutline} 
                                        dimension={"70%"}
                                        handlePress={()=>{}}
                                    />
                                    <Text style={styles.menuText}>Username: {userData.username}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate("Orders")}>
                                <View style={styles.menuItem(0.2)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.heartOutline} 
                                        dimension={"70%"}
                                        handlePress={()=>{}}
                                    />
                                    <Text style={styles.menuText}>Email: {userData.email}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
                                <View style={styles.menuItem(0.2)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.cart} 
                                        dimension={"70%"}
                                        handlePress={()=>{}}
                                    />
                                    <Text style={styles.menuText}>Location: {userData.location}</Text>
                                </View>
                            </TouchableOpacity>

                           
                        </View>
                    )}


                </View>
            </View>
        </View>
    )
}

export default SelfProfile;