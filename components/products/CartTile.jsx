import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

import styles from './searchTile.style';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartTile = ({item}) => {
    const navigation = useNavigation()
    const cartItem = item.cartItem
    console.log("cartItem:",cartItem)
    return (
        <View>
            <TouchableOpacity style={styles.container} 
            onPress={()=>{navigation.navigate('ProductDetails', {item})}}>
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
                    <Text >+</Text>
                    <Text style={styles.productQuantity} >{item.quantity}</Text>
                    <Text >-</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default CartTile;