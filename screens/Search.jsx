import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, Text, TextInput, Image, FlatList} from 'react-native';
import styles from './search.style';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import icons from '../assets/constants/icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SearchTile from '../components/products/SearchTile';



const Search = () => {
    const [searchKey, setSearchKey] = useState('')
    const [searchResults, setSearchResults] = useState([])
    
    //const navigation = useNavigation();
    //http://localhost:3000/api/products/
    handleSearch = async() => {
        try {
            const response = axios.get(`http://10.0.2.2:3000/api/products/search/${searchKey}`)
            //console.log(searchKey);
            //console.log('=============================');
            //console.log( (await response).data)
            //.log('=============================');
            setSearchResults( (await response).data)
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error("Data:", error.response.data);
                console.error("Status:", error.response.status);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error("Request was made but no response:", error.request);
            } else {
                // Something happened in setting up the request and triggered an error
                console.error("Error", error.message);
            }
        }
    }

    return(
        <SafeAreaView>
            <View style={styles.searchContainer}>
                <TouchableOpacity style={styles.searchIcon}>
                    <ScreenHeaderBtn iconUrl={icons.camera}  dimension='100%' />
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchKey}
                        onChangeText={setSearchKey}
                        placeholder='What are you looking for'
                    />
                </View>
              
                <TouchableOpacity  style={styles.searchBtn}>
                    <ScreenHeaderBtn 
                        iconUrl={icons.search}  
                        dimension='100%' 
                        handlePress={()=>handleSearch()}
                    />
                </TouchableOpacity>
            
            </View>
            {searchResults.length === 0 ? (
                <View style={{flex: 1}} >
                    <Image 
                        source={require('../assets/images/Pose23.png')}
                        style={styles.searchImage}
                    />
                </View>
            ): (
                <FlatList 
                    data={searchResults}
                    keyExtractor={(item) => item._id}
                    renderItem={({item})=> (<SearchTile item = {item} />)}
                    style={{marginHorizontal: 12}}
                />
            )}
        </SafeAreaView>
    )
}

export default Search;