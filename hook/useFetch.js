import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useState, useEffect} from 'react';

const useFetch=()=> {
    
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () =>{
        //const id = await AsyncStorage.getItem('id')
       // console.log("trying get userid!", id)
        setIsLoading(true)
        try {
            //console.log("trying get!")
            const response = await axios.get('http://10.0.2.2:3000/api/products/')
            
            setData(response.data)
            //console.log("get complete!", data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=> {
        fetchData()
    }, []);

    const refetch = () => {
        setIsLoading(true)
        fetchData();
    }
    
    return {data, isLoading, error, refetch};
}

export default useFetch;