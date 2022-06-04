import { View, Text } from 'react-native'
import React from 'react'

import HomeConteudo from './HomeConteudo';
import New from './New';
import Profile from './Profile';
import CustomDrawer from '../components/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer'

export default function Home() {

    const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName={"Home"} 
    drawerContent={(props) => <CustomDrawer {...props}/> }
    drawerStyle={{
        backgroundColor: '#171717',
    }}
    drawerContentOptions={{
        labelStyle:{
            fontWeight:'bold'
        },
        activeTintColor:'#fff',
        activeBackgroundColor:'#00b94a',
        inactiveBackgroundColor:'#000',
        inactiveTintColor:'#DDD',
        itemStyle:{
            marginVertical:5,
        }
    }}
    >
        <Drawer.Screen name="Resumo" component={HomeConteudo} options={{headerShown: false}}  />
        <Drawer.Screen name="Registrar" component={New} options={{headerShown: false}} />
        <Drawer.Screen name="Perfil" component={Profile} options={{headerShown: false}} />
    </Drawer.Navigator>
  )
}