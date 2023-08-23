import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import styles from './home.style';
import icons from '../assets/constants/icons';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';

import { Welcome } from "../components"
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {

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
                const parseData = JSON.parese(currentUser)
                setUserData(parseData)
                setUserLogin(true)
            }
        } catch (error) {      
            console.log("Error retrieving the data", error);
        }
    }

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
                            <ScreenHeaderBtn iconUrl={icons.shoppingBag} dimension='100%' />
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