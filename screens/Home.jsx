import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Text, TouchableOpacity, View, ScrollView, Alert, ActivityIndicator} from 'react-native';
import styles from './home.style';
import icons from '../assets/constants/icons';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';

import { Welcome } from "../components"
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import getUser from '../hook/getUser';


const Home = () => {
    const navigation = useNavigation();
    const {data, isLoading, e} = getUser()
    // if(isLoading){
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator  />
    //         </View>
    //     );
    // }
    // //console.log("userData:",data)

    const [userData, setUserData] = useState(null)
    const [userLogin, setUserLogin] = useState(false)
    
    const setData = async()=>{
        if (data !== null){
            setUserData(data)
            console.log(userData.location)
            setUserLogin(true)
        }
        else{
            setUserLogin(false)
        }
        
    }

    useEffect(()=>{
        setData()
    }, []);

    // const checkExistingUser = async ()=> {
    //     const id = await AsyncStorage.getItem('id')
    //     const userId = `user${JSON.parse(id)}`;
    //     console.log("userId:", userId)
    //     try {
    //         const currentUser = await AsyncStorage.getItem(userId);

    //         if(id !== null){
    //             const parseData = JSON.parese(currentUser)
    //             setUserData(parseData)
    //             setUserLogin(true)
    //         }
    //         else{
    //             console.log("currentUser is null");
    //         }
    //     } catch (error) {      
    //         console.log("Error retrieving the data", error);
    //     }
    //     console.log(userData)
    // }

    return(
        <SafeAreaView>
            <View style={styles.appBarWrapper} >
                <View style={styles.appBar}>
                    <ScreenHeaderBtn iconUrl={icons.location} dimension='100%' />
                    <Text style={styles.location}>{ userData ? userData.location : 'Suzhou China' }</Text>
                    <View style={{ alignItems: "flex-end" }}>
                        <View style={styles.cartCount} >
                            <Text style={styles.cartNum}>8</Text>
                        </View>
                        <TouchableOpacity>
                            <ScreenHeaderBtn 
                                iconUrl={icons.shoppingBag} 
                                dimension='100%' 
                                handlePress={()=>{
                                    
                                    if (userLogin) {
                                        navigation.navigate('Cart')
                                    }
                                    else{
                                        Alert.alert(
                                            "Need to login",
                                            "Oop, guest you haven't login in",
                                            [
                                                {defaultIndex : 1}
                                            ]
                                        )
                                    }
                                }} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView>
                <Welcome />
                <Carousel />
                <Headings />
                <ProductRow />
            </ScrollView>
        </SafeAreaView>
    )
}


export default Home;