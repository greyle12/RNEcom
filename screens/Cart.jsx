import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import CartTile from '../components/products/CartTile';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import icons from '../assets/constants/icons';
import { COLORS, SIZES } from "../assets/constants/index";
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
    const [loader, setLoader] = useState(false)
    const [cartData, setCartData] = useState(null);
    const navigation = useNavigation()

    useEffect(()=>{
        getCart();
    }, []);

    const getCart = async () => {
        const id = await AsyncStorage.getItem('id')
        const userId = `${JSON.parse(id)}`;
        console.log("======id:", userId)
        try {
            console.log("trying get cart!")
            
            const endpoint=`http://10.0.2.2:3000/api/cart/find/${userId}`
            const response = await axios.get(endpoint)
            console.log("get cart complete!")
            if(response.status === 200){
                setCartData(response.data[0].products)
                //console.log("cartItemData:", JSON.stringify(cartData))
                //const cart = 
                console.log("Data:", cartData)
            } else{
                Alert.alert(
                    "Error to get cart ",
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
        }
        catch (error) {
            console.log("Error:", error)
        }
        
    }

    return(
        <View>
            {cartData === null ? (
                <Text>
                    There is nothing in your cart, go to community to add something!
                </Text>
            ) : (
                <View>
                    <View style={styles.upperRow} >
                        <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension={"100%"} handlePress={()=>navigation.goBack()} />
                    </View>
                    <FlatList 
                        data={cartData}
                        //keyExtractor={(item) => item._id}
                        renderItem={({item})=> (<CartTile item = {item} />)}
                        style={{marginHorizontal: 12}}
                    />
                </View>
        )}
        
        </View>
    )
}

export default Cart;


const styles = StyleSheet.create({
    upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    top: SIZES.xxLarge,
    width: SIZES.width -44,
    zIndex: 999,
    marginBottom: 50
    }
    
})