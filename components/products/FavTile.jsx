import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './searchTile.style';

import { useNavigation } from '@react-navigation/native';
import ScreenHeaderBtn from  '../header/ScreenHeaderBtn'
import icons from '../../assets/constants/icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';


const FavTile = ({item}) => {
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState(null)
    //const [favitem, setFavitem] = useState(null)
    const [favData, setFavData] = useState(null)

    console.log("======================================================")
    console.log("Item:",item)
    const navigation = useNavigation()
    const favItem = item.favoriteItem
    console.log("favItem:",favItem)
    //getItem()

    // useLayoutEffect(()=>{
    //     getItem(item.favoriteItem)
    // }, [])

    // const [favinfo, setFavinfo] = useState(()=>{
        
    // })

    useEffect (()=>{
        getUserId();
        getInfo(item.favoriteItem)
    }, []);

    const getUserId = async () => {
        const id = await AsyncStorage.getItem('id')
        const Id = `${JSON.parse(id)}`;
        //console.log("======id:", Id)
        setUserId(Id)
        
    }

    const  getInfo = async(values)=>{
        
        try {
            const endpoint = `http://10.0.2.2:3000/api/products/${values}`
            //const data = values;

            const response = await axios.get(endpoint)

            if(response.status === 200){
                console.log("get FavItem successfully!", response.data)
                setFavData(response.data)
                setLoading(false)
            }
            
        } catch (error) {
            console.log("Error to get FavItem !", error)
            setLoading(false)
        }
        

    }

    
    //console.log("result:", result)


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
        const getItemShcema = `http://10.0.2.2:3000/api/products/${values}`
        console.log(getItemShcema)
        try {
            const response = await axios.get(getItemShcema)
            if(response.status === 200){
                //console.log("get favItem successfully!:", response.data)
                let item = response.data
                navigation.navigate('ProductDetails', {item})
            }
        }catch(error){
            console.log("Error to get favItem :", error)
        }
    }

    console.log("FAVDATA:",favData)

    if (loading) return(<ActivityIndicator/>)



    return (
        <View>
            
            <View style={styles.cartContainer}>
            <TouchableOpacity style={styles.container} 
            onPress={()=>{getFavItem(favItem)}}>
                <View style={styles.image}>
                    <Image source={{uri: favData.imageUrl}} 
                        style={styles.productImg}
                    />
                </View>
                <View style={styles.textContainer} >
                    <Text style={styles.productTitle} >{favData.title}</Text>
                    <Text style={styles.productSupplier} >{favData.supplier}</Text>
                    <Text style={styles.productSupplier} >{favData.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <ScreenHeaderBtn 
                        iconUrl={icons.minus} dimension={"70%"} 
                        handlePress={()=>decrementToFav(favItem)}
                    />
                   
                </View>
            </TouchableOpacity>
            </View>
        </View>
    );
}

export default FavTile;