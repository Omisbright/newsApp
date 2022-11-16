import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import { MainNavigation } from './src/navigation/main-navigation';
import { store } from './src/redux/store';


export default function App() {
  return (
    <Provider store={ store } >
      <NavigationContainer>
          <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
}