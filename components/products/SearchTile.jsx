import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';


import styles from './searchTile.style';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchTile = ({item}) => {
    const navigation = useNavigation()
    //console.log(item)
    return (
        <View>
            <TouchableOpacity style={styles.container} 
            onPress={()=>{navigation.navigate('ProductDetails', {item})}}>
                <View style={styles.image}>
                    <Image source={{uri: item.imageUrl}} 
                        style={styles.productImg}
                    />
                </View>
                <View style={styles.textContainer} >
                    <Text style={styles.productTitle} >{item.title}</Text>
                    <Text style={styles.productSupplier} >{item.supplier}</Text>
                    <Text style={styles.productSupplier} >{item.price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default SearchTile;