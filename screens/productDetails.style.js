import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../assets/constants/index";

const styles = StyleSheet.create({
   container: {
    flex:1,
    backgroundColor: COLORS.lightWhite,
   },
   upperRow:{
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width -44,
    zIndex: 999
   },
   image:{
    marginTop: -20,
    resizeMode: "center",
    width: "100%" ,
    height: (Dimensions.get('screen').width - 2 * 32),
   },
   details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
   },
   titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width -44,
    top: 20,
   },
   title:{
    // fontFamily: "Cochin",
    fontSize: SIZES.large
   },
   priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large
   },
   price: {
    padding: 10,
    fontSize: SIZES.large
   },
   ratingRow :{
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width -10,
    top: 5,
   },
   rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",

   },
   ratingTxt:{
    color: COLORS.gray
   },
   description: {
    fontSize: SIZES.large -2,
   },
   descriptionWrapper: {
    marginTop: SIZES.large*2,
    marginHorizontal: SIZES.large
   },
   descTxt:{
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small
   },
   cartRow: {
    paddingBottom: SIZES.small,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width,
   },
   cartBtn: {
    width: SIZES.width*0.4,
    backgroundColor: COLORS.black,
    padding: SIZES.small/2,
    borderRadius: SIZES.large,
    marginLeft: 12
   },
   cartTitle: {
    marginLeft: SIZES.small,
    fontSize: SIZES.medium,
    color: COLORS.lightWhite
   },
   addCart: {
    backgroundColor: COLORS.black
   }

})

export default styles