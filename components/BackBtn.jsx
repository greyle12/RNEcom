import React from 'react';
import ScreenHeaderBtn from './header/ScreenHeaderBtn';
import icons from '../assets/constants/icons';
import { View, StyleSheet} from 'react-native';
import { SIZES } from '../assets/constants';



const BackBtn = ({onPress}) => {
    return (
        <View style={styles.backbtn}>
            <ScreenHeaderBtn 
                iconUrl={icons.chevronLeft}
                dimension={"100%"}
                handlePress={onPress}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({
    backbtn:{
        marginTop: 20,
        alignItems: "center",
        position: "absolute",
        zIndex: 999,
        top: SIZES.large-20
    }
})
export default BackBtn;