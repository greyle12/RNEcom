import React from 'react';
import { SafeAreaView } from 'react-native';
import styles from './newRival.style';
import { View, Text } from 'react-native';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import icons from '../assets/constants/icons';
import { useNavigation } from '@react-navigation/native';
import ProductList from '../components/products/ProductList';

const NewRivals=() => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.upperRow} >
                    <ScreenHeaderBtn 
                        iconUrl={icons.chevronLeft} 
                        dimension={"80%"} 
                        handlePress={()=>navigation.goBack()} 
                    />
                    <Text style={styles.heading}>Products</Text>
                
                </View>
                
                <ProductList />
            </View>
        </SafeAreaView>
    );
}

export default NewRivals;