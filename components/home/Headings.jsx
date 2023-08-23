import React from 'react';
import { View } from 'react-native';
import styles from './headings.style';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScreenHeaderBtn from '../header/ScreenHeaderBtn';
import icons from '../../assets/constants/icons';
import { useNavigation } from '@react-navigation/native';

const Headings=() => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>New Rivals</Text>
                
                <ScreenHeaderBtn iconUrl={icons.menu} dimension={"100%"} handlePress={()=>navigation.navigate("ProductList")}/>
                
            </View>

        </View>
    );
}

export default Headings;