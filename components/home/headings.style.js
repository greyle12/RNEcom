import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../assets/constants/index"

const styles = StyleSheet.create({
    container:{
        marginBottom: -SIZES.xSmall,
        marginHorizontal: 12
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerTitle: {
        fontSize: SIZES.xLarge
    }
})

export default styles;