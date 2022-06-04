import { View, Text } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'

import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LoadingAnimacao from './LoadingAnimacao';
import RegistrarDinheiroAnimacao from './RegistrarDinheiroAnimacao';

import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext } from '../contexts/AuthProvider'

export default function Rotas() {
    const Stack = createStackNavigator();
    const { user, singed, loading } = useContext(AuthContext)

    const [ inicialRoute, setInicialRoute ] = useState()

  return (
     // initialRouteName={user ? "Home" : "SignIn" }
    //  user ==  undefined ? "LoadingAnimacao"
    <Stack.Navigator initialRouteName={inicialRoute} > 
         <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
             <Stack.Screen name="SignUp" component={SignUp} 
                 options={{
                 headerStyle:{
                 backgroundColor:'#131313',
                 borderBottomWidth:1,
                 borderBottomColor:'#00b34a',  
                 },
                 headerTintColor:'#fff',
                 headerBackTitleVisible: false,
                 headerTitle:''
                 }}/> 
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="LoadingAnimacao" component={LoadingAnimacao} options={{headerShown: false}} />
            <Stack.Screen name="RegistrarDinheiroAnimacao" component={RegistrarDinheiroAnimacao} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}