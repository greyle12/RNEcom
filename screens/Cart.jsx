import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import CartTile from '../components/products/CartTile';

const Cart = () => {
    const [loader, setLoader] = useState(false)
    const [cartData, setCartData] = useState(null);
    //const [obsecureText, setObsecureText] = useState(false)

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
                <FlatList 
                    data={cartData}
                    keyExtractor={(item) => item._id}
                    renderItem={({item})=> (<CartTile item = {item} />)}
                    style={{marginHorizontal: 12}}
                />
                //<Text></Text>
        )}
        
        </View>
    )
}

export default Cart;


const styles = StyleSheet.create({
    
})