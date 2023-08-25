import React from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './productCardView.style';
import fn1 from '../../assets/images/fn1.jpg';
import ScreenHeaderBtn from '../header/ScreenHeaderBtn';
import icons from '../../assets/constants/icons';
import { useNavigation } from '@react-navigation/native';

const ProductCardView=({item}) =>{
    const navigation = useNavigation();
    //console.log({item})
    return (
        <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails", {item})}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{
                            uri: item.imageUrl,
                        }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
                    <Text style={styles.prise}>${item.price}</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                    <ScreenHeaderBtn iconUrl={icons.heartOutline} dimension={"100%"}/>
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    );
}

export default ProductCardView;