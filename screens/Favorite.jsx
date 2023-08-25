import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import FavTile from '../components/products/FavTile';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import icons from '../assets/constants/icons';
import { COLORS, SIZES } from "../assets/constants/index";
import { useNavigation } from '@react-navigation/native';

const Favorite = () => {
    const [loader, setLoader] = useState(false)
    const [favoriteData, setFavoriteData] = useState(null);
    const navigation = useNavigation()

    useEffect(()=>{
        getFavList();
    }, []);

    const getFavList = async () => {
        const id = await AsyncStorage.getItem('id')
        const userId = `${JSON.parse(id)}`;
        console.log("======id:", userId)
        try {
            console.log("trying get FavList!")
            
            const endpoint=`http://10.0.2.2:3000/api/favorite/find/${userId}`
            const response = await axios.get(endpoint)
            
            if(response.status === 200){
                console.log("get favList complete. res ==200!", response.data[0].favoriteList)
                console.log("before favoriteData:", favoriteData)
                setFavoriteData(response.data[0].favoriteList)
                
            } else{
                console.log("res!= 200")
                Alert.alert(
                    "Error to get favorite list ",
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
            console.log("Error to :", error)
        }
        
    }
    console.log("after favoriteData:", favoriteData)

    return(
        <View>
            {favoriteData === null ? (
                <Text>
                    There is nothing in your cart, go to community to add something!
                </Text>
            ) : (
                <View>
                    <View style={styles.upperRow} >
                        <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension={"100%"} handlePress={()=>navigation.goBack()} />
                    </View>
                    <FlatList 
                        data={favoriteData}
                        //keyExtractor={(item) => item._id}
                        renderItem={({item})=> (<FavTile item = {item} />)}
                        style={{marginHorizontal: 12}}
                    />
                </View>
        )}
        
        </View>
    )
}

export default Favorite;


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