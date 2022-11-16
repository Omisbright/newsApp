import React from 'react';
import { StyleSheet, TouchableOpacity, Linking, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RegularText from './RegularText';
import BoldText from './BoldText';


const {height, width} = Dimensions.get("window")

const NewsCard = ({item}) => {

    const { navigate } = useNavigation()

    const generateBoxShadowStyle = (
        xOffset,
        yOffset,
        shadowColorIos,
        shadowOpacity,
        shadowRadius,
        elevation,
        shadowColorAndroid,
      ) => {
        if (Platform.OS === 'ios') {
          styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: {width: xOffset, height: yOffset},
            shadowOpacity,
            shadowRadius,
          };
        } else if (Platform.OS === 'android') {
          styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
          };
        }
      };
    generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717');

    const handleNavigation  = () => {
        navigate("Reader", {url: item?.url})
    }

    return (
        <TouchableOpacity onPress={handleNavigation} style={[styles.container, styles.boxShadow]}>
            <View style={styles.menu}>
                <BoldText customstyle={styles.heading}>{item.title}</BoldText>
            </View>
            <View style={styles.menu}>
                <RegularText customstyle={styles.subText}>Type: </RegularText>
                <RegularText customstyle={styles.text}>{item.type}</RegularText>
            </View>
            <View style={styles.menu}>
                <RegularText customstyle={styles.subText}>By: </RegularText>
                <RegularText customstyle={styles.text}>{item.by}</RegularText>
            </View>
            <View style={styles.menu}>
                <RegularText customstyle={styles.subText}>Score: </RegularText>
                <RegularText customstyle={styles.text}>{item.score}</RegularText>
            </View>
        </TouchableOpacity>
    )
}

export default NewsCard

const styles = StyleSheet.create({

    container: {
        borderRadius: 15,
        backgroundColor: "#fff",
        marginVertical: 5,
        paddingHorizontal: 12,
        paddingVertical: 10,
        width: width/1.1
    },

    heading: {
        marginVertical: 2,
        color: "rgba(28, 28, 28, 1)",
        fontSize: 14, 
        lineHeight: 15,
    },

    menu: {
        marginVertical: 2,
        flexDirection: "row",
        alignItems: "center"
    },

    subText: {
        fontSize: 12,
    },

    text: {
        fontSize: 12,
        lineHeight: 16
    }
})
