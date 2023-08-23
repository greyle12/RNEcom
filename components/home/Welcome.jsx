import React from 'react';
import { View, TouchableOpacity, Text, TextInput} from 'react-native';
import styles from './welcome.style';
import { COLORS, SIZES } from '../../assets/constants';
import ScreenHeaderBtn from '../header/ScreenHeaderBtn';
import icons from '../../assets/constants/icons';

import { useNavigation } from '@react-navigation/native';

const  Welcome =() => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall)}>Find the most</Text>
                <Text style={styles.welcomeTxt(COLORS.primary, 0)}>Luxurious Furniture</Text>
            </View>
            <View style={styles.searchContainer}>
                <TouchableOpacity style={styles.searchIcon}>
                    <ScreenHeaderBtn iconUrl={icons.search}  dimension='100%' />
                </TouchableOpacity>
                    <View style={styles.searchWrapper} >
                        <TextInput
                            style={styles.searchInput}
                            value=''
                            onPressIn={()=>navigation.navigate("Search")}
                            placeholder='What are you looking for'
                        />
                    </View>
              
                <TouchableOpacity  style={styles.searchBtn}>
                    <ScreenHeaderBtn 
                        iconUrl={icons.camera}  
                        dimension='100%' 
                    />
                </TouchableOpacity>
            
            </View>
            
        </View>
    );
}

export default Welcome;
