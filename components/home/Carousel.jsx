import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import fn1 from '../../assets/images/fn1.jpg'
import fn2 from '../../assets/images/fn2.jpg'
import fn3 from '../../assets/images/fn3.jpg'
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../assets/constants';

const Carousel =(props)=> {
    const slides = [fn1, fn2, fn3]
    return (
        <View style={styles.carouselContainer}>
            <SliderBox 
                images={slides} 
                dotColor={COLORS.primary}
                inactiveDotColor = {COLORS.secondary}
                ImageComponentStyle = {{borderRadius: 15, width: "95%", marginTop: 0}}
                autoplay
                circleLoop
            />
        </View>
    );
}

export default Carousel;

const styles = StyleSheet.create({
    carouselContainer:{
        position: "relative",
        // height: 400,
        marginTop: 0
    }
})