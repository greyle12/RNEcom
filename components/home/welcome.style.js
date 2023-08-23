import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../assets/constants/index"

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    welcomeTxt: (color) => ({
        fontSize: SIZES.medium,
        marginTop: SIZES.xSmall,
        color: color,
        marginHorizontal: 12,
    }),
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        marginHorizontal: SIZES.small,
        height: 50
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
        height: "100%",
        width: "100%",
        paddingHorizontal: SIZES.small,
    },
    searchBtn: {
        width: 50,
        height: "100%",
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignContent: "center",
        
    },
})

export default styles;