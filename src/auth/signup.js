import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import { Alert, Dimensions, ImageBackground, Keyboard, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import SQLite from 'react-native-sqlite-storage';
import { RFValue } from "react-native-responsive-fontsize"

import loginBackground from "../assets/images/loginBackground.png";
import BoldText from '../components/BoldText';
import RegularText from '../components/RegularText';

const window = Dimensions.get("window")

const SignUp = ({navigation}) => {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [show, setShow] = React.useState(false);


    useFocusEffect(
        React.useCallback(() => {
            createTable();
        }, [navigation])
    );

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
        if (username.length === 0 || email.length === 0) {
            Alert.alert('Warning!', 'Please input your details.')
        } else {
            try {
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        "INSERT INTO Users (Username, Email) VALUES (?,?)",
                        [username, email]
                    );
                })
                navigation.navigate('About');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const togglePassword = () => {
        setShow(!show)
    };

    return (
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground resizeMode="cover" source={loginBackground} style={styles.mainContainer}>
            <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" style={styles.backIcon} size={24} color="black" />
            </TouchableOpacity>
                <StatusBar animated={true} backgroundColor="#4A2E0D"/>    
                <View style={styles.innerContainer}>
                    <View>
                        <BoldText customstyle={styles.setupProfileText}>Setup your Profile</BoldText>
                        <RegularText customstyle={styles.setupProfileSubtext}>Fill the forms and submit</RegularText>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput onChangeText={text => setUsername(text)} label="Username" style={styles.textInput}/>
                        <TextInput onChangeText={text => setEmail(text)} label="Input your email" style={styles.textInput}/>
                        <TextInput onChangeText={text => setPassword(text)} secureTextEntry={show} label="Create Password"  style={styles.textInput} right={<TextInput.Icon name="eye" onPress={togglePassword} />}/>
                    </View>
                    <TouchableOpacity onPress={() => setData()} style={styles.signupTextContainer}>
                        <RegularText customstyle={styles.signupText}>SIGN UP</RegularText>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
       </TouchableWithoutFeedback>
)};

export default SignUp;

const styles = StyleSheet.create({
    backIcon: {
        marginTop: 5
    },
    backIconContainer: {
        marginHorizontal: 12, 
        marginTop: 10
    },
    innerContainer: {
        marginHorizontal: 12, 
        flex: 1, 
        justifyContent: "center"
    },
    mainContainer: {
        justifyContent: "flex-start",
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
    },
    setupProfileSubtext: {
        fontSize: RFValue(12), 
        color: "rgba(28, 28, 28, 1)"
    },
    setupProfileText: {
        fontSize: 24, 
        fontWeight: "bold", 
        color: "rgba(28, 28, 28, 1)", 
        marginVertical: 5
    },
    signupText: {
        color:"#fff", 
        fontWeight:"bold", 
        alignSelf:"center", 
        padding:20
    },
    signupTextContainer: {
        backgroundColor:"#4A2E0D"
    },
    textInput: {
        marginVertical: 10, 
        color: "#F1F1F1" 
    },
    textInputContainer: {
        marginVertical: 40
    }
})


