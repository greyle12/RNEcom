import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';

import CartTile from '../components/products/CartTile';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import icons from '../assets/constants/icons';
import { COLORS, SIZES } from "../assets/constants/index";
import { Button } from '../components';
import { Alert } from 'react-native';

const Cart = () => {
    const [loader, setLoader] = useState(false)
    const [cartData, setCartData] = useState([]);
    let total = 0
    const navigation = useNavigation()
    const [totalPrice, setTotalPrice] = useState(0)
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    useEffect(()=>{
        getCart().then(()=>{
            // console.log("Data:", cartData)
            // let resdata = cartData
            // if (resdata !== null){
            //     resdata.map((item)=>{
            //         total += item.quantity* item.cartItem.price
            //     })
            //     console.log("total:", total.toFixed(2))
            //     setTotalPrice(total.toFixed(2))
            // }
        })
    },[cartData]);


    const getCart = async () => {
        const id = await AsyncStorage.getItem('id')
        const userId = `${JSON.parse(id)}`;
        //console.log("======id:", userId)
        try {
            //console.log("trying get cart!")
            
            const endpoint=`http://10.0.2.2:3000/api/cart/find/${userId}`
            const response = await axios.get(endpoint)
            
            if(response.status === 200){
                let resdata =  await response.data[0].products
                setCartData(resdata)
                //console.log("cartItemData:", JSON.stringify(cartData))
                //const cart = 
                //console.log("cartdata:",cartData)
                //console.log("get cart complete!")
                if (resdata.length != 0){
                    resdata.map((item)=>{
                        total += item.quantity* item.cartItem.price
                    })
                    //console.log("total:", total.toFixed(2))
                    setTotalPrice(total.toFixed(2))
                }
                
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
    // const countTotal=async()=>{
    //     //console.log("cartData:", cartData)
    //     if (cartData !== null){
    //         cartData.map((item)=>{
    //             total += item.quantity* item.cartItem.price
    //         })
    //         //console.log("total:", total.toFixed(2))
    //         setTotalPrice(total.toFixed(2))
    //     }
    // }
    const onCheckout = async()=>{
        let stripeTotal = (totalPrice*100).toFixed()
        const stripeReq = {"amount": stripeTotal}
        console.log("stripeReq", stripeReq)
        const stripeUrl = 'http://10.0.2.2:3000/api/payments/intents'
        // 1. Create a payment intent
        const response = await axios.post(stripeUrl, stripeReq);
      if (response.error) {
        Alert.alert('Something went wrong in payment intent',error);
        return;
      }
      console.log(response.data.paymentIntent);
      // 2. Initialize the Payment sheet
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'notJust.dev',
        paymentIntentClientSecret: response.data.paymentIntent,
      });
      if (initResponse.error) {
        console.log(initResponse.error);
        Alert.alert('Something went wrong');
        return;
      }
  
      // 3. Present the Payment Sheet from Stripe
      const paymentResponse = await presentPaymentSheet();
  
      if (paymentResponse.error) {
        console.log("paymentResponse.error",paymentResponse.error);
        Alert.alert(
          `Error code: ${paymentResponse.error.code}`,
          paymentResponse.error.message
        );
        return;
      }
  
      // 4. If payment ok -> create the order
    }

    return(
        
        <SafeAreaView style={styles.container}>
        <View>
            {cartData.length == 0 ? (
                <View>
                <View style={styles.upperRow} >
                <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension={"100%"} handlePress={()=>navigation.goBack()} />
            </View>
                <Text>
                    There is nothing in your cart, go to community to add something!
                </Text>
                </View>
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
                    <View style={styles.wrapper}>
                        <Text style={styles.totalTxt}>Total:                                {totalPrice}</Text>
                        <Button style={styles.checkoutBtn} title={"checkout"} loader={false} isValid={false} onPress={onCheckout} />
                    </View>
                </View>
        )}
        
        
        </View>
        </SafeAreaView>
        
    )
}

export default Cart;


const styles = StyleSheet.create({
    container:{

    },
    upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    top: SIZES.xxLarge,
    width: SIZES.width -44,
    zIndex: 999,
    marginBottom: 50
    },
    wrapper:{
        alignItems: "center",
        paddingLeft: SIZES.small/2,
        paddingTop: SIZES.xxlarge,
        marginTop: 10,
       
    },
    totalTxt:{
        fontSize: SIZES.xLarge,
        fontStyle: 'normal',
        fontWeight: '700',
        marginLeft: 20,
        marginBottom: '20%'

    },
    
})