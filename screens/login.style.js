import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../assets/constants/index";

const styles = StyleSheet.create({
    loginImage: {
        height: SIZES.height/2.4,
        width: SIZES.width -60,
        resizeMode: "contain",
        marginBottom: SIZES.xxLarge
    },
    title: {
        marginTop: SIZES.large,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        alignItems: "center",
        marginBottom: SIZES.xLarge
    },
    wrapper: {
        marginBottom: 2,
        marginHorizontal: 20,
    },
    label: {
        fontSize: SIZES.xSmall,
        marginEnd: 5,
        marginBottom: 5,
        textAlign: "right",
    },
    inputWrapper: (borderColor)=>({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: "row",
        paddingHorizontol : 15,
        alignItems: "center"
    
    }),
    errMsg: {
        marginTop: 5,
        marginLeft: 5,
        fontSize: 10,
        color: COLORS.red
    },
    registration:{
        marginTop: 20,
        textAlign: "center",
    }
})

export default styles