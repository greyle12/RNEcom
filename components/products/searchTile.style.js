import { StyleSheet } from "react-native"
import { COLORS, SHADOWS, SIZES } from "../../assets/constants"

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SIZES.small,
        flexDirection: "row",
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: "#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.lightWhite
    },
    image: {
        width: 70,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignContent: "center",
    },
    productImg: {
        width: "100%",
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: "cover",
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium,
    },
    productTitle: {
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
    productSupplier: {
        fontSize: SIZES.small+2,
        color: COLORS.gray,
        marginTop: 3,
    },
    productPrice: {
        
    },
    quantityContainer:{
        //marginRight: SIZES.small,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    productQuantity: {
        fontSize: SIZES.medium+2,
        color: COLORS.black,
    },
    upperRow:{
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        top: SIZES.large,
        width: SIZES.width -44,
        zIndex: 999,
        marginBottom: 15,
       },
    cartContainer: {
        flex: 1,
        marginBottom: 10,
    }
})

export default styles;