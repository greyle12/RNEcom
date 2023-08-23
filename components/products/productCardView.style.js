import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../assets/constants"

const styles = StyleSheet.create({
    container:{
        width: 182,
        height: 240,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary
    },
    imageContainer: {
        flex:1,
        width: 170,
        marginLeft: SIZES.small/2,
        marginTop: SIZES.small/2,
        borderRadius: SIZES.small,
        overflow: "hidden",
        backgroundColor: COLORS.gray,
    },
    image:{
        aspectRatio: 1,
        resizeMode: 'cover'
    },
    details: {
        padding: SIZES.small
    },
    title:{
        fontSize: SIZES.large,
        marginBottom: 2
    },
    supplier :{
        fontSize: SIZES.small,
        marginBottom: 2,
        color: COLORS.gray
    },
    prise: {
        fontSize: SIZES.medium,
    },
    addBtn: {
        position: "absolute",
        bottom: SIZES.xSmall,
        right: SIZES.xSmall,
    }
})

export default styles;