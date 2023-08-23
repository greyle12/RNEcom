import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { COLORS, SIZES } from '../assets/constants';
import { ActivityIndicator } from 'react-native';



const Button = ({title, onPress, isValid, loader}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.primary)} onPress={onPress}>
            
            {loader === false ? (
              <Text style={styles.btnText} >{title}</Text>
            ): (<ActivityIndicator/>)}
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    btnStyle: (bcgColor)=>({
        height: 50,
        width: "90%",
        marginVertical: 20,
        marginHorizontal: 20,
        backgroundColor: bcgColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    }),
    btnText:{
        fontSize: 18,
        color: COLORS.white
    }
})
export default Button;