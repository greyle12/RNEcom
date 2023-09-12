
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, Alert } from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup'

import styles from './post.style';
import { Button, BackBtn } from '../components';
import { TextInput } from 'react-native';
import icons from '../assets/constants/icons';
import ScreenHeaderBtn from '../components/header/ScreenHeaderBtn';
import { COLORS, SIZES } from '../assets/constants';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    supplier: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    imageUrl: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    product_location: Yup.string().min(3, 'Provide a valid location').required('Required'),
  });

const Post = ({navigation}) => {

    const [loader, setLoader] = useState(false)
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setObsecureText] = useState(false)

    const invalidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please provide all required fields",
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
                        style={{height: SIZES.height/6,
                        width: SIZES.width,
                        resizeMode: "contain",
                        marginBottom: SIZES.xxLarge}}
                    />

                    <Text style={styles.title}>Unlimit Luxurious Furniture Post</Text>

                    <Formik
                        initialValues={{title: '', supplier: '', price: '', imageUrl: '', description: '', product_location: ''}}
                        validationSchema={validationSchema}
                        onSubmit={(values)=>registerUser(values)}
                    >

                    {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched  }) => (
                        <View>
                            
                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Title</Text>
                                <View style={styles.inputWrapper(touched.username ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.user}
                                        dimension={"60%"}
                                    />
                                    <TextInput
                                        placeholder='Enter product title'
                                        onFocus={()=> {setFieldTouched('title')}}
                                        onBlur={()=>{setFieldTouched('title', '')}}
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />
                                </View>
                                {touched.title && errors.title && (
                                    <Text style={styles.errMsg}>{errors.title}</Text>
                                )}
                            </View>
                            
                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Supplier</Text>
                                <View style={styles.inputWrapper(touched.supplier ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.mail}
                                        dimension={"90%"}
                                    />
                                    <TextInput
                                        placeholder='Enter Supplier'
                                        onFocus={()=> {setFieldTouched('supplier')}}
                                        onBlur={()=>{setFieldTouched('supplier', '')}}
                                        value={values.supplier}
                                        onChangeText={handleChange('supplier')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />
                                </View>
                                {touched.supplier && errors.supplier && (
                                    <Text style={styles.errMsg}>{errors.supplier}</Text>
                                )}
                            </View>

                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Price</Text>
                                <View style={styles.inputWrapper(touched.price ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.mail}
                                        dimension={"90%"}
                                    />
                                    <TextInput
                                        placeholder='Enter Price'
                                        onFocus={()=> {setFieldTouched('price')}}
                                        onBlur={()=>{setFieldTouched('price', '')}}
                                        value={values.price}
                                        onChangeText={handleChange('price')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />
                                </View>
                                {touched.price && errors.price && (
                                    <Text style={styles.errMsg}>{errors.price}</Text>
                                )}
                            </View>

                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Description</Text>
                                <View style={styles.inputWrapper(touched.description ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.mail}
                                        dimension={"90%"}
                                    />
                                    <TextInput
                                        placeholder='Enter Description'
                                        onFocus={()=> {setFieldTouched('description')}}
                                        onBlur={()=>{setFieldTouched('description', '')}}
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />
                                </View>
                                {touched.description && errors.description && (
                                    <Text style={styles.errMsg}>{errors.description}</Text>
                                )}
                            </View>


                            <View style={styles.wrapper}>
                                <Text style={styles.label}>Location</Text>
                                <View style={styles.inputWrapper(touched.product_location ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.location}
                                        dimension={"90%"}
                                    />
                                    <TextInput
                                        placeholder='Enter product_location'
                                        onFocus={()=> {setFieldTouched('product_location')}}
                                        onBlur={()=>{setFieldTouched('product_location', '')}}
                                        value={values.product_location}
                                        onChangeText={handleChange('product_location')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />
                                </View>
                                {touched.product_location && errors.product_location && (
                                    <Text style={styles.errMsg}>{errors.product_location}</Text>
                                )}
                            </View>

                            <View style={styles.wrapper}>
                                <Text style={styles.label}>image</Text>
                                <View style={styles.inputWrapper(touched.imageUrl ? COLORS.secondary: COLORS.offwhite)}>
                                    <ScreenHeaderBtn 
                                        iconUrl={icons.mail}
                                        dimension={"90%"}
                                    />
                                    <TextInput
                                        placeholder='Enter image'
                                        onFocus={()=> {setFieldTouched('imageUrl')}}
                                        onBlur={()=>{setFieldTouched('imageUrl', '')}}
                                        value={values.imageUrl}
                                        onChangeText={handleChange('imageUrl')}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                    />
                                </View>
                                {touched.imageUrl && errors.imageUrl && (
                                    <Text style={styles.errMsg}>{errors.imageUrl}</Text>
                                )}
                            </View>
                            <Button title={"SIGNUP"} onPress={isValid ? handleSubmit: invalidForm} isValid={isValid} />
                        
                                    <Text style={styles.registration} onPress={()=> {navigation.navigate('Home')}}>Home</Text>
                        
                        </View>

                    )}
                    </Formik>

                    
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default Post;