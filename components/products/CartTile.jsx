import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './searchTile.style';

import { useNavigation } from '@react-navigation/native';
import ScreenHeaderBtn from  '../header/ScreenHeaderBtn'
import icons from '../../assets/constants/icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const CartTile = ({item}) => {
    const [qcount, setQcount] = useState(item.quantity)
    const [userId, setUserId] = useState(null)
    const [cartitem, setCartItem] = useState(null)

    console.log("======================================================")
    //console.log("Item:",item)
    const navigation = useNavigation()
    const cartItem = item.cartItem
    console.log("cartItem:",cartItem)

    useEffect(()=>{
        getUserId();
    }, []);

    const getUserId = async () => {
        const id = await AsyncStorage.getItem('id')
        const Id = `${JSON.parse(id)}`;
        //console.log("======id:", Id)
        setUserId(Id)
        
    }
    const addToCart = async(values) => {
        const addShcema = {"userId": `${userId}`, "cartItem":`${values}`, "quantity": 1}
        //console.log(addShcema)
        try {
            const endpoint="http://10.0.2.2:3000/api/cart"
            const data = addShcema;

            const response = await axios.post(endpoint, data)
            if(response.status === 200){
                setQcount(qcount + 1)
                console.log("add cartItem successfully! quantity:", qcount+1)
                //console.log("res data",response.data)
                //setQuantity(response.data)
            }
        }catch(error){
            console.log("Error to add cartItem successfully! quantity:", error)
        }
    }

    const decrementToCart = async(values) => {
        const decrShcema = {"userId": `${userId}`, "cartItem":`${values}`}
        //console.log(decrShcema)
        try {
            const endpoint="http://10.0.2.2:3000/api/cart/quantity"
            const data = decrShcema;

            const response = await axios.post(endpoint, data)
            if(response.status === 200){
                setQcount(qcount - 1)
                console.log("decr cartItem successfully! quantity:", qcount-1)
                //console.log("res data",response.data)
            }
        }catch(error){
            console.log("Error to decr cartItem successfully! quantity:", error)
        }
    }

    //handle navigation
    const getCartItem = async(values) => {
        const getItemShcema = `http://10.0.2.2:3000/api/products/${values}`
        console.log(getItemShcema)
        try {
            const response = await axios.get(getItemShcema)
            if(response.status === 200){
                console.log("get cartItem successfully!:", response.data)
                
                setCartItem(response.data)
                let item = response.data
                navigation.navigate('ProductDetails', {item})
                //console.log("cartitem:",  cartitem)
            }
        }catch(error){
            console.log("Error to decr cartItem successfully! quantity:", error)
        }
    }


    return (
        <View>
            
            <View style={styles.cartContainer}>
            <TouchableOpacity style={styles.container} 
            onPress={()=>{getCartItem(cartItem._id)}}>
                <View style={styles.image}>
                    <Image source={{uri: cartItem.imageUrl}} 
                        style={styles.productImg}
                    />
                </View>
                <View style={styles.textContainer} >
                    <Text style={styles.productTitle} >{cartItem.title}</Text>
                    <Text style={styles.productSupplier} >{cartItem.supplier}</Text>
                    <Text style={styles.productSupplier} >{cartItem.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <ScreenHeaderBtn 
                        iconUrl={icons.plus} dimension={"70%"} 
                        handlePress={()=>addToCart(cartItem._id)}
                    />
                    <Text style={styles.productQuantity} >{qcount}</Text>
                    <ScreenHeaderBtn 
                        iconUrl={icons.minus} dimension={"70%"} 
                        handlePress={()=>decrementToCart(cartItem._id)}
                    />
                   
                </View>
            </TouchableOpacity>
            </View>
        </View>
    );
}

export default CartTile;