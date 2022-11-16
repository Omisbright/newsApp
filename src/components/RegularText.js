import React from 'react'
import { StyleSheet, View } from 'react-native';
import {Text} from 'react-native-paper';

const RegularText = ({children, customstyle}) => {
    return (
        <View>
            <Text style={[styles.text, customstyle]}>{children}</Text>
        </View>
    )
}

export default RegularText;

const styles = StyleSheet.create({
    text: {
        fontFamily: "BentonSans Regular",
        fontSize: 12,
        color: "black"
    }
})
