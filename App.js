import 'react-native-gesture-handler';
import { View, Text, StatusBar } from 'react-native'
import React from 'react'

import Rotas from './src/pages/Rotas'
import AuthProvider from './src/contexts/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';



export default function App() {
  LogBox.ignoreLogs([
    'Console Warning',' FIREBASE WARNING: Using an unspecified index',"Warning: Can't perform a React state","Warning: Failed prop type: Invalid prop",'EventEmitter.removeListener',"Sending `onAnimatedValueUpdate`",'AsyncStorage has been extracted','TypeError: undefined is not a function','Possible Unhandled Promise Rejection '
  ]);
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle='light-content'/>
        <Rotas/>
      </NavigationContainer>
    </AuthProvider>
  )
}