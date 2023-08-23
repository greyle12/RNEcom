import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, Alert } from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup'

import styles from './login.style';
import { Button, BackBtn } from '../components';
import { TextInput } from 'react-native';
import icons from '../assets/constants/icons';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import { COLORS } from '../assets/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';




const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    email: Yup.string().email('Provide a valid email address').required('Required'),
  });


const Login = ({navigation}) => {
    const [loader, setLoader] = useState(false)
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setObsecureText] = useState(false)

    const invalidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please provide al required fields",
            [
                {
                    text: "Cancel", onPress: ()=>console.log("cancel clear")
                },
                {
                    text: "Continue", onPress: ()=>console.log("continue clear")
                },
                {defaultIndex : 1}
            ]
        )
    }

    const login = async (values) => {
        setLoader(true)
        console.log(values)

        try {
            const endpoint="http://10.0.2.2:3000/api/login"
            const data = values;

            const response = await axios.post(endpoint, data)
            if(response.status === 200){
                setLoader(false)
                console.log("Login successfully!")
                //console.log(response.data)
                setResponseData(response.data);

                await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData))
                
                //const newUser = await AsyncStorage.getItem(`user${responseData._id}`)
                await AsyncStorage.setItem('id', JSON.stringify(responseData._id))
                navigation.replace('Bottom Navgation')


            }else{
                Alert.alert(
                    "Error logging in ",
                    "Please provide a valid credentials",
                    [
                        {
                            text: "Cancel", onPress: ()=>console.log("cancel clear")
                        },
                        {
                            text: "Continue", onPress: ()=>console.log("continue clear")
                        },
                        {defaultIndex : 1}
                    ]
                )
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "Oops, somethine went wrong, please try again",
                [
                    {defaultIndex : 1}
                ]
            )
        }finally{
            setLoader(false);
        }
    }
    
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View>
                    <BackBtn onPress={()=> navigation.goBack()}/>
                    <Image 
                        source={require('../assets/images/bk.png')}
                        style={styles.loginImage}
                    />

                    <Text style={styles.title}>Unlimit Luxurious Furniture</Text>

                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={validationSchema}
                        onSubmit={(values)=>login(values)}
                    >

                    {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched  }) => (
                        <View>
                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Email</Text>
                                <View style={styles.inputWrapper(touched.email ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.mail}
                                        dimension={"90%"}
                                    />
                                    <TextInput
                                        placeholder='Enter email'
                                        onFocus={()=> {setFieldTouched('email')}}
                                        onBlur={()=>{setFieldTouched('email', '')}}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />
                                </View>
                                {touched.email && errors.email && (
                                    <Text style={styles.errMsg}>{errors.email}</Text>
                                )}
                            </View>

                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputWrapper(touched.password ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.lock}
                                        dimension={"60%"}
                                    />
                                    <TextInput
                                        secureTextEntry={obsecureText}
                                        placeholder='Enter password'
                                        onFocus={()=> {setFieldTouched('password')}}
                                        onBlur={()=>{setFieldTouched('password', '')}}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />

                                    <ScreenHeaderBtn 
                                        iconUrl={obsecureText? icons.heart : icons.heartOutline}
                                        dimension={"70%"}
                                        handlePress={()=>{setObsecureText(!obsecureText)}}

                                    />
                                </View>
                                {touched.password && errors.password && (
                                    <Text style={styles.errMsg}>{errors.password}</Text>
                                )}
                            </View>
                            <Button 
                                title={"L O G I N"} 
                                onPress={isValid ? handleSubmit: invalidForm} 
                                isValid={isValid} 
                                loader={loader}
                            />
                        
                                    <Text style={styles.registration} onPress={()=> {navigation.navigate('SignUp')}}>Resgister</Text>
                        
                        </View>

                    )}
                    </Formik>

                    
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Login;