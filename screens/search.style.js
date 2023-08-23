import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../assets/constants/index";



const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        marginHorizontal: SIZES.small,
        height: 50,
    },
    searchIcon:{
        marginHorizontal: 10,
        color: COLORS.gray,
        marginTop:SIZES.small
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        marginRight: SIZES.small,
        borderRadius: SIZES.small,
    },
    searchInput:{
        
        height: "80%",
        width: "100%",
        paddingHorizontal: SIZES.small,
    },
    searchBtn: {
        width: 50,
        height: "70%",
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignContent: "center",
        
    },
    searchImage:{
        resizeMode: "contain",
        width: SIZES.width-100,
        height: SIZES.height - 300,
        opacity: 0.9,
    }
})

export default styles