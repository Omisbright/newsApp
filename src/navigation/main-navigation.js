import * as React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Reader from '../screens/reader';
import HomeScreen from '../screens/home';
import AboutScreen from '../screens/about';
import Login from '../auth/login';
import SignUp from '../auth/signup';

const Stack = createStackNavigator();

const MainNavigation = () => (

    <Stack.Navigator
        initialRouteName="Login"
        statusBar="#fff"
        screenOptions={{
            header: () => null,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
    >
        <Stack.Screen name="Reader" component={Reader} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
)

export {MainNavigation}