import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useContext} from 'react'

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthProvider';

import Header from '../components/Header';
import ContainerGradiente from './ContainerGradiente';

export default function Profile() {

  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  async function sair(){
    navigation.navigate('Resumo')
    await signOut()
    user && navigation.navigate('SignIn')
  }

  return (
    <ContainerGradiente>
      <View style={styles.containerProfile}>
        <Header/>
        <Text style={styles.textoProfile}>O que deseja fazer, {user && user.nome}</Text>
        <TouchableOpacity style={styles.bottunProfile}
        onPress={() => navigation.navigate('Registrar')}
        >
          <Text style={styles.bottunTexto} >Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottunSair}
        onPress={() => sair()}  
        >
          <Text style={styles.bottunTexto}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ContainerGradiente>
  )
}

const styles = StyleSheet.create({
  containerProfile:{
    alignItems: 'center',
  },

  textoProfile:{
    textAlign:"center",
    fontSize:20,
    marginBottom:25,
    color:'#fff',
  },

  bottunProfile:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#00b94a',
    width:'90%',
    height:45,
    borderRadius:10,
    marginBottom:10,
  },

  bottunTexto:{
    fontSize:18,
    color:'#fff',
    fontWeight:'bold',
  },

  bottunSair:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#c62c36',
    width:'90%',
    height:45,
    borderRadius:10,
    marginBottom:10,
  },

});