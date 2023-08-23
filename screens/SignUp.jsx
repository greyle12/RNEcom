import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, Alert } from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup'

import styles from './login.style';
import { Button, BackBtn } from '../components';
import { TextInput } from 'react-native';
import icons from '../assets/constants/icons';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import { COLORS, SIZES } from '../assets/constants';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    email: Yup.string().email('Provide a valid email address').required('Required'),
    location: Yup.string().min(3, 'Provide a valid location').required('Required'),
  });

const SignUp = ({navigation}) => {

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

    const registerUser = async (values) => {
        setLoader(true)

        try {
            const endpoint = 'http://10.0.2.2:3000/api/register';
            const data = values;

            const response = await axios.post(endpoint, data)

            if(response.status === 201){
                navigation.replace('Login')
            }
        } catch (error) {
            console.log("Error in register", error)
        }

    }


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View>
                    <BackBtn onPress={()=> navigation.goBack()}/>
                    <Image 
                        source={require('../assets/images/bk.png')}
                        style={{height: SIZES.height/4,
                        width: SIZES.width,
                        resizeMode: "contain",
                        marginBottom: SIZES.xxLarge}}
                    />

                    <Text style={styles.title}>Unlimit Luxurious Furniture</Text>

                    <Formik
                        initialValues={{username: '', email: '', password: '', location: ''}}
                        validationSchema={validationSchema}
                        onSubmit={(values)=>registerUser(values)}
                    >

                    {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched  }) => (
                        <View>
                            
                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Username</Text>
                                <View style={styles.inputWrapper(touched.username ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.user}
                                        dimension={"60%"}
                                    />
                                    <TextInput
                                        placeholder='Enter username'
                                        onFocus={()=> {setFieldTouched('username')}}
                                        onBlur={()=>{setFieldTouched('username', '')}}
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />
                                </View>
                                {touched.username && errors.username && (
                                    <Text style={styles.errMsg}>{errors.username}</Text>
                                )}
                            </View>
                            
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

                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Location</Text>
                                <View style={styles.inputWrapper(touched.location ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.location}
                                        dimension={"90%"}
                                    />
                                    <TextInput
                                        placeholder='Enter location'
                                        onFocus={()=> {setFieldTouched('location')}}
                                        onBlur={()=>{setFieldTouched('location', '')}}
                                        value={values.location}
                                        onChangeText={handleChange('location')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />
                                </View>
                                {touched.location && errors.location && (
                                    <Text style={styles.errMsg}>{errors.location}</Text>
                                )}
                            </View>
                            <Button title={"SIGNUP"} onPress={isValid ? handleSubmit: invalidForm} isValid={isValid} />
                        
                                    <Text style={styles.registration} onPress={()=> {navigation.navigate('Login')}}>Login</Text>
                        
                        </View>

                    )}
                    </Formik>

                    
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default SignUp;