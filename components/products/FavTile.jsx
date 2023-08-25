import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './searchTile.style';

import { useNavigation } from '@react-navigation/native';
import ScreenHeaderBtn from  '../header/ScreenHeaderBtn'
import icons from '../../assets/constants/icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const FavTile = ({item}) => {
    const [userId, setUserId] = useState(null)
    const [favitem, setFavitem] = useState(null)

    console.log("======================================================")
    //console.log("Item:",item)
    const navigation = useNavigation()
    const favItem = item.favoriteItem
    console.log("favItem:",favItem)

    useEffect(()=>{
        getUserId();
    }, []);

    const getUserId = async () => {
        const id = await AsyncStorage.getItem('id')
        const Id = `${JSON.parse(id)}`;
        //console.log("======id:", Id)
        setUserId(Id)
        
    }


    const decrementToFav = async(values) => {
        const decrShcema = {"userId": `${userId}`, "favoriteItem":`${values}`}
        try {
            const endpoint="http://10.0.2.2:3000/api/favorite/delete"
            const data = decrShcema;

            const response = await axios.post(endpoint, data)
            if(response.status === 200){
                console.log("decr FavItem successfully!")
                console.log("res data",response.data)
            }
        }catch(error){
            console.log("Error to decr FavItem:", error)
        }
    }

    //handle navigation
    const getFavItem = async(values) => {
        const getItemShcema = `http://10.0.2.2:3000/api/products/find/${values}`
        console.log(getItemShcema)
        try {
            const response = await axios.get(getItemShcema)
            if(response.status === 200){
                console.log("get favItem successfully!:", response.data)
                
                setFavitem(response.data)
                let item = response.data
                navigation.navigate('ProductDetails', {item})
                //console.log("cartitem:",  cartitem)
            }
        }catch(error){
            console.log("Error to get favItem :", error)
        }
    }


    return (
        <View>
            
            <View style={styles.cartContainer}>
            <TouchableOpacity style={styles.container} 
            onPress={()=>{getFavItem(favItem._id)}}>
                <View style={styles.image}>
                    <Image source={{uri: favItem.imageUrl}} 
                        style={styles.productImg}
                    />
                </View>
                <View style={styles.textContainer} >
                    <Text style={styles.productTitle} >{favItem.title}</Text>
                    <Text style={styles.productSupplier} >{favItem.supplier}</Text>
                    <Text style={styles.productSupplier} >{favItem.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <ScreenHeaderBtn 
                        iconUrl={icons.minus} dimension={"70%"} 
                        handlePress={()=>decrementToFav(favItem._id)}
                    />
                   
                </View>
            </TouchableOpacity>
            </View>
        </View>
    );
}

export default FavTile;