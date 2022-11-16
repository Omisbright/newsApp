import React, { useState } from 'react';
import { Dimensions, SafeAreaView, FlatList, Platform, ImageBackground, RefreshControl, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {RFValue} from "react-native-responsive-fontsize"

import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";

import NewsCard from '../components/newsCard';
import { getStories } from '../redux/reducer';
import RegularText from '../components/RegularText';
import BoldText from '../components/BoldText';

const {height, width} = Dimensions.get("window");

const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();

    const stories = useSelector(state => state.newsApp.stories)
    const loading = useSelector(state => state.newsApp.loading)

    const [limit, setLimit] = useState(4)

    let pictures = [img1, img2, img3, img4, img5]
    const [currentIndex, setCurrentIndex] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
          const interval = setInterval(() => {
              setCurrentIndex(currentIndex + 1)
              if (currentIndex === 4) {
                setCurrentIndex(0)
              }
            }, 8000);
          return () => clearInterval(interval);
        }, [currentIndex])
    );

    useFocusEffect(
        React.useCallback(() => {
            getMoreStories(limit)
        }, [navigation])
    );

    const getMoreStories = () => {
        setLimit(limit + 4)
        dispatch(getStories(limit))
    }

    return (
        <>
            <ImageBackground style={styles.imgBackground} resizeMode="cover" source={pictures[currentIndex]}>
                <SafeAreaView
                    backgroundColor="transparent"
                    height={Platform.OS === "android" ? insets.top + RFValue(12) : RFValue(5)}
                >
                    <StatusBar
                        animated
                        backgroundColor="transparent"
                        barStyle="light-content"
                        translucent
                    />
                </SafeAreaView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" style={styles.backIcon} size={24} color="white" />
                </TouchableOpacity>
                <View>
                    <BoldText customstyle={styles.heading}>News of the day</BoldText>
                    <View style={styles.topSubText}>
                        <RegularText customstyle={styles.subheading}>Bringing you the latest news from around the world</RegularText>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.newsBackground}>
                <FlatList
                    data={stories}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <NewsCard item={item}/>
                    )}
                    contentContainerStyle={styles.contentContainerStyle}
                    ListEmptyComponent={
                        <View style={styles.emtpyTextContainer}>
                            <RegularText customstyle={styles.emptyTextText}>
                                List is empty
                            </RegularText>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={{alignItems: "center"}}>
                            {stories.length > 0 ? (
                                <RegularText customstyle={styles.listFooterComponentText}>
                                    Scroll to load more news
                                </RegularText> 
                            ) : null}
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                    onEndReached={getMoreStories}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={() => dispatch(getStories(4))} />}
                    refreshing={loading}
                />
            </View>
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    backIcon: {
        marginTop: 5
    },
    container: {
        flex: 1
    },
    contentContainerStyle: {
        paddingBottom: 200,
        alignItems: "center"
    },
    emtpyTextContainer: { 
        alignItems: "center", 
        marginTop: height/3
    },
    emptyTextText: { 
        color: "#000", 
        fontSize: 12
    },
    heading: {
        color: "#fff",
        fontSize: 35,
        marginVertical: 2,
    },
    imgBackground: {
        flex: 0.35,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingBottom: 20,
        backgroundColor: "#000",
    },
    listFooterComponentText: {
        color:"#4A2E0D", 
        fontSize: 12, 
        marginTop: height/35
    },
    newsBackground: {
        borderRadius: 20,
        backgroundColor: "#fff",
        width: width,
        flex: 0.7,
        borderRadius: 15,
        padding: 10
    },
    subheading: {
        color: "#fff",
        marginVertical: 3,
        fontSize: 17,
        lineHeight: 24,
    },
    topSubText: {
        backgroundColor: "rgba(28, 28, 28, 1)", 
        paddingHorizontal: 10
    }
})
