//react
import React from 'react';

//react native
import { StyleSheet, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';

//icons
import { AntDesign } from '@expo/vector-icons';

//background image
import bg from "../assets/images/myBackground.jpg";

//dimensions
 const {height, width} = Dimensions.get("window");

 //customstyle
 import RegularText from "../components/RegularText";
 import BoldText from "../components/BoldText"

const AboutScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.imgBackground} resizeMode="cover" source={bg}>
                <BoldText customstyle={styles.heading}>
                    About
                </BoldText>
                <View>
                    <View style={styles.textBackground}>
                        <RegularText customstyle={styles.body}>
                            I am a software engineer who is passionate about technology. 
                            I have special interests in visual design and mobile applications. {"\n"}
                            I love to solve problems, improve everyday and contribute meaningfully wherever I am. {"\n"} {"\n"}

                            I am Samuel Fayomi.
                        </RegularText>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.icon}>
                        <AntDesign name="arrowright" size={24} color="black" />
                </TouchableOpacity>
            </ImageBackground>

        </View>
    )
}

export default AboutScreen;

const styles = StyleSheet.create({

    body: {
        color: "#000",
        lineHeight: 30,
        textAlign:"justify",
        fontSize: 14
    },

    container: {
        flex: 1
    },

    heading: {
        color: "#fff",
        fontSize: 30,
        alignSelf: "center",
    },

    icon: {
        backgroundColor: "#fff",
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center", 
    },

    imgBackground: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    textBackground: {
        backgroundColor: "rgb(255,255,255)",
        borderRadius: 8,
        height: height/3,
        padding: 15,
    }
})
