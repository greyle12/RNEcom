import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './navigation/BottomTab';
import { Cart, ProductDetails, NewRivals, Login, Favorite, Orders, SignUp, SelfProfile, Post} from './screens';
import { registerRootComponent } from 'expo';
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createNativeStackNavigator();

const STRIPE_KEY = 
'pk_test_51NpD1PAsIX4ftLGJcOspKoTCTDjT2QB1kebQJz4cfKQPQ3rXxIJ0zoVbOhuQvQsOy6ppiRoYcg6AMrnLO5a8amOq00KZSBGWfJ'

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf")
  })

  const onLayoutRootView = useCallback(async() => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded] );

  if(!fontsLoaded){
    console.log("!fontloaded")
  }


  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Bottom Navgation'
          component={BottomTab}
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name='Cart'
          component={Cart}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name='ProductDetails'
          component={ProductDetails}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name='ProductList'
          component={NewRivals}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name='Login'
          component={Login}
          options={{headerShown:false}}
        />

        <Stack.Screen 
          name='Favorite'
          component={Favorite}
          options={{headerShown:false}}
        />

        <Stack.Screen 
          name='Orders'
          component={Orders}
          options={{headerShown:false}}
        />

        <Stack.Screen 
          name='SignUp'
          component={SignUp}
          options={{headerShown:false}}
        />

        <Stack.Screen 
          name='SelfProfile'
          component={SelfProfile}
          options={{headerShown:false}}
        />

        <Stack.Screen 
          name='Post'
          component={Post}
          options={{headerShown:false}}
        />



      </Stack.Navigator>
    </NavigationContainer>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

