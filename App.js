import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './navigation/BottomTab';
import { Cart, ProductDetails, NewRivals, Login, Favorite, Orders, SignUp } from './screens';
import { registerRootComponent } from 'expo';


const Stack = createNativeStackNavigator();

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



      </Stack.Navigator>
    </NavigationContainer>
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

