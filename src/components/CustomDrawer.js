import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

export default function CustomDrawer(props) {
    
    const { user, signOut } = useContext(AuthContext)
    const navigation = useNavigation()

    async function animacaoLogin(){
      return new Promise((resolve) =>{
          navigation.navigate('LoadingAnimacao')
          console.log('Animacao')
          resolve()
      })
    }

    async function homePage(){
      return new Promise((resolve) =>{
        setTimeout(() => {
          user && navigation.navigate('SignIn')
          resolve()
        },3000)
      })
    }
    
   async function sair(props){
        props.navigation.closeDrawer()
        await signOut()
        await animacaoLogin()
        await homePage()
      }
  return (
      <DrawerContentScrollView {...props}>
        <View style={{alignItems:"center", justifyContent:'center', marginTop:25}}>
            <Text style={{color:'#fff', fontSize:18}}>Bem Vindo!</Text>
            <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>{user && user.nome}</Text>
        </View>

        <DrawerItemList {...props}/>
        <DrawerItem {...props}
         label='Sair'
         inactiveBackgroundColor='#c62c36'
         onPress={() => sair(props)}   
        />
      </DrawerContentScrollView>
  )
}