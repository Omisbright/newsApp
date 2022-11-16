import React, { useState } from 'react';
import { Dimensions, Alert, ImageBackground, Keyboard, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import SQLite from 'react-native-sqlite-storage';
import { useFocusEffect } from '@react-navigation/core';
import { RFValue } from "react-native-responsive-fontsize"

import loginBackground from "../assets/images/loginBackground.png";
import BoldText from '../components/BoldText';
import RegularText from '../components/RegularText';

const window = Dimensions.get("window")


const Login = ({navigation}) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [show, setShow] = React.useState(true);

    const db = SQLite.openDatabase(
        {
            name: "MainDB",
            location: "default",
        },
        () => {},
        error => {console.log("error form db", error)}
    );

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                +"Users "
                +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Email TEXT);" 
            )
        })
    };

    const setData = async () => {
        if (username.length === 0 || password.length === 0) {
            Alert.alert('Warning!', 'Please input your details.')
        } else {
            try {
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        "INSERT INTO Users (Username, Email) VALUES (?,?)",
                        [username, password]
                    );
                })
                navigation.navigate('About');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Email FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            navigation.navigate('Home');
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            createTable();
            getData()
        }, [navigation])
    );


    const togglePassword = () => {
        setShow(!show)
    };

    return (
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground resizeMode="cover" source={loginBackground} style={styles.mainContainer}>
                <StatusBar animated={true} backgroundColor="#4A2E0D"/>    
                <View style={styles.innerContainer}>
                    <View>
                        <BoldText customstyle={styles.boldWelcomeText}>Welcome,</BoldText>
                        <RegularText customstyle={styles.subWelcomeText}>Let's get you back</RegularText>
                    </View>
                    <View>
                        <View style={styles.textInputContainer}>
                            <TextInput autoCorrect={false} autoCapitalize={false} onChangeText={text => setUsername(text)} value={username} label="Username" style={styles.textInput}/> 
                            <TextInput autoCorrect={false} autoCapitalize={false} onChangeText={text => setPassword(text)} label="Password" secureTextEntry={show} style={styles.textInput} right={<TextInput.Icon name="eye" onPress={togglePassword} />}/>
                            <TouchableOpacity>
                                <RegularText customstyle={styles.forgotPasswordText}>Forgot password?</RegularText>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setData()} style={styles.loginContainer}>
                            <RegularText customstyle={styles.loginText}>LOGIN</RegularText>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setData()} style={styles.loginWithFingerprintContainer}>
                        <Ionicons name="finger-print-sharp" style={styles.loginWithFingerprintIcon} color="rgba(28, 28, 28, 1)" size={32}/>
                        <RegularText customstyle={styles.loginWithFingerprintText}>LOGIN WITH FINGERPRINT</RegularText>
                    </TouchableOpacity>
                    <View style={styles.newToContainer}>
                        <RegularText customstyle={styles.newToText}>New to News App? </RegularText>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <RegularText customstyle={styles.createAccountText}>Create Account </RegularText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
       </TouchableWithoutFeedback>
)};

export default Login;

const styles = StyleSheet.create({
    boldWelcomeText: {
        fontSize: 24, 
        color: "rgba(28, 28, 28, 1)", 
        marginVertical: 5
    },
    createAccountText: {
        color:"#FFA500"
    },
    forgotPasswordText: {
        color:"#000", 
        marginTop: 3, 
        fontSize: RFValue(12)
    },
    innerContainer: {
        marginHorizontal: 12, 
        flex: 1, 
        justifyContent: "space-evenly"
    },
    loginContainer: {
        backgroundColor:"#4A2E0D"
    },
    loginText: {
        color:"#fff", 
        fontWeight:"bold", 
        alignSelf:"center", 
        padding:20
    },
    loginWithFingerprintContainer: {
        flexDirection:"row", 
        alignItems: "center", 
        justifyContent:"center"
    },
    loginWithFingerprintIcon: {
        marginHorizontal: 6
    },
    loginWithFingerprintText: {
        color:"rgba(28, 28, 28, 1)"
    },
    mainContainer: {
        justifyContent: "flex-start",
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
    },
    newToContainer: {
        flexDirection: "row", 
        justifyContent: "center"
    },
    newToText: {
        color:"rgba(28, 28, 28, 1)"
    },
    subWelcomeText: {
        fontSize: 12, 
        color: "rgba(28, 28, 28, 1)", marginVertical: 5
    },
    textInput: {
        marginVertical: 10, 
        color: "#F1F1F1"
    },
    textInputContainer: {
        marginBottom: 40
    }
})


