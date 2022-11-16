import { StyleSheet, SafeAreaView, View, TouchableOpacity, Platform, StatusBar } from 'react-native'
import React from 'react';
import WebView from "react-native-webview"
import ActivityLoader from '../components/ActivityLoader';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {RFValue} from "react-native-responsive-fontsize"
import RegularText from '../components/RegularText';

const Reader = ({navigation, route}) => {

    const url = route?.params?.url
    const insets = useSafeAreaInsets();
  return (
    <>
        <SafeAreaView
            backgroundColor="#4A2E0D"
            height={Platform.OS === "android" ? insets.top + RFValue(12) : RFValue(5)}
        >
            <StatusBar
                animated
                backgroundColor="#4A2E0D"
                barStyle="light-content"
            />
        </SafeAreaView>
        <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            <RegularText customstyle={styles.goBackText}>Go back</RegularText>
        </TouchableOpacity>
        <WebView 
            originWhitelist={['*']}
            source={{ uri: url }} 
            startInLoadingState
            renderLoading={() => <ActivityLoader visible={true} />}
            style={{flex: 1}}
        />
    </>
  )
}

export default Reader;

const styles = StyleSheet.create({
    goBackContainer: {
        padding: 16, 
        backgroundColor: "white", 
        flexDirection: "row", 
        alignItems: "center"
    },
    goBackText: {
        fontSize: RFValue(12)
    }
})