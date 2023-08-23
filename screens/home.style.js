import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../assets/constants/index";

const styles = StyleSheet.create({
    textStyle: {
        fontFamily:"bold",
        fontSize: 40
    },
    appBarWrapper: {
        marginHorizontal: 22,
        marginTop: SIZES.small,
    },
    appBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    location :{
        fontSize: SIZES.medium,
        color: COLORS.gray,

    },
    cartCount: {
        position:"absolute",
        bottom: 30,
        width: 16,
        height: 16,
        left: 29,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "green",
        justifyContent: "center",
        zIndex: 999
    },
    cartNum: {
        // fontFamily: "regular",
        fontWeight: 900,
        fontSize: 10,
        color: COLORS.lightWhite,
    }
})

export default styles
