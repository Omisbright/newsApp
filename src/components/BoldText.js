import React from 'react'
import { StyleSheet, View } from 'react-native';
import {Text} from 'react-native-paper';

const BoldText = ({children, customstyle}) => {
    return (
        <View>
            <Text style={[styles.text, customstyle]}>{children}</Text>
        </View>
    )
}

export default BoldText;

const styles = StyleSheet.create({
    text: {
        fontFamily: "BentonSans Bold",
        fontSize: 12,
        color: "black"
    }
})
