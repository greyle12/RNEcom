import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../hook/useFetch';


const ProductRow = () => {
    const {data, isLoading, error} = useFetch()
    
    const products = [1,2,3,4]
    return (
        <View style={{marginTop: SIZES.medium}}>
            {isLoading ? (
                <ActivityIndicator size={SIZES.large} color={COLORS.primary}/>
            ): error ? (
                
                <Text>Something went wrong </Text>
            ):(
                <FlatList 
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <ProductCardView item={item}/>}
                horizontal
                contentContainerStyle={{columnGap: SIZES.medium}}
            />
            )}
        </View>
    );
}

export default ProductRow;