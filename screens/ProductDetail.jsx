import React , { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './productDetails.style';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import icons from '../assets/constants/icons';
import fn1 from '../assets/images/fn1.jpg'
import { SimpleLineIcons } from '@expo/vector-icons';
import * as Font from 'expo-font'
import { SIZES } from '../assets/constants';
import { useRoute } from '@react-navigation/native';

const ProductDetails = ({navigation}) => {
    const route = useRoute();
    const {item} = route.params;
    //console.log(item)
    const [count, setCount] = useState(1)

    const increment = () => {
        console.log("+1")
        setCount(count + 1)
    }
    const decrement = () => {
        if (count > 1){
            console.log("-1")
            setCount(count -1 )
        }
        else{
            console.log("no!")
        }
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.upperRow} >
                <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension={"100%"} handlePress={()=>navigation.goBack()} />
                <ScreenHeaderBtn iconUrl={icons.heart} dimension={"100%"} handlePress={()=>navigation.goBack()} />
            </View>
            <Image 
                source={{
                    uri: item.imageUrl,
                }}
                style={styles.image}
            />
            <View style={styles.details}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}> {item.title} </Text>
                    <View style={styles.priceWrapper} >
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                </View>
                <View style={styles.ratingRow}>
                    
                    <View style={styles.rating} >
                        {[1,2,3,4,5].map((index)=>(
                            <ScreenHeaderBtn 
                                iconUrl={icons.heartOutline} 
                                dimension={"70%"} 
                                key={index} 
                            />
                        ))}
                        <Text style={styles.ratingTxt} >(4.9)</Text>
                    </View>
                    <View style={styles.rating} >
                        
                        <ScreenHeaderBtn iconUrl={icons.plus} dimension={"70%"} handlePress={()=>increment()}/>
                        
                        <Text style={styles.ratingTxt}>{count}</Text>
                        
                        <ScreenHeaderBtn iconUrl={icons.minus} dimension={"70%"} handlePress={()=>decrement()}/>
                        
                    </View>
                </View>
                <View style={styles.descriptionWrapper} >
                    <Text style={styles.description}>Description</Text>
                    <Text style={styles.descTxt} >{item.description}</Text>
                </View>
                <View style={styles.cartRow} >
                    <TouchableOpacity onPress={()=>{}} style={styles.cartBtn}>
                        <Text style={styles.cartTitle}>ADD TO CART</Text>
                    </TouchableOpacity>
                    <ScreenHeaderBtn style={styles.addCart} iconUrl={icons.cart} dimension={"100%"} handlePress={()=>{}} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetails;