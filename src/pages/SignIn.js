import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../contexts/AuthProvider' 
import LottieView from 'lottie-react-native'
import ContainerGradiente from './ContainerGradiente'

import Ionicons from 'react-native-vector-icons/Ionicons'

export default function SignIn() {

  const [email,setEmail] = useState(false)
  const [password,setPassword] = useState(false)
  const [olho, setOlho] = useState(false)

  function handleEye(){
    setOlho(!olho)
  }

  console.log('email', email)
  console.log('password', password)

  const [conteudo, setConteudo] = useState()

  const navigation = useNavigation()
  const isFocused = useIsFocused();
  const { signIn, user, singed, loadingButton, setLoadingButton } = useContext(AuthContext)

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
        navigation.navigate('Home')
        resolve()
      },3000)
    })
  }

  async function handleLogin(){
    // alert('Por favor, preencher os camos de Email e Senha.')
      
    email == false || email == undefined || password == false || password == undefined ? 
    Alert.alert(
      "Atenção!",
      "Por favor, preencher os campos de Email e Senha.",
      [
        {
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    )
    : email == false || email == undefined || password == false || password == undefined ? setLoadingButton(false) :
    await signIn(email,password) ? user && await animacaoLogin() && await homePage() : null

    setEmail()
    setPassword()
  }

  async function loginAutomatico(){
    await animacaoLogin()
    await homePage()
  }

  useFocusEffect(
    React.useCallback(() => {
      isFocused && singed && loginAutomatico()
    }, [singed])
  );


  // useEffect(()=>{
  //   // setTimou com loading aqui para não aparecer a tela inicial
  //   singed && loginAutomatico()
  // },[singed])
  
  console.log('user Login page SignIn = ', user)
  console.log('singed Login page SignIn = ', singed)

  return (
    <ContainerGradiente>

      <View style={{ justifyContent:'center', marginTop:80}}>
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>

          <KeyboardAvoidingView>
          
          <LottieView
            style={{ width:250, height:250, marginLeft:22}}
            source={(require('../assets/login.json'))}
            autoPlay={true}
            loop={true}
            />

            <View style={{marginTop:-35}}>
                <Text style={{marginLeft:10, color:'#fff'}}>Email</Text>
                <TextInput
                style={[styles.input,{ marginBottom:10}]}
                placeholder='Email'
                placeholderTextColor="#fff"
                selectionColor='#fff'
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
                value={email}
                onChangeText={(text) => setEmail(text) }
                />
                <Text style={{marginLeft:10, marginTop:-5, color:'#fff'}}>Senha</Text>
                <View style={styles.inputArea}>
                  <TextInput
                  style={{width:'90%', color:'#fff'}}
                  placeholder='Senha'
                  placeholderTextColor="#fff" 
                  selectionColor='#fff'
                  autoCorrect={false}
                  autoCapitalize='none'
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={olho ? false : true}
                  />
                  <TouchableOpacity onPress={handleEye}>
                  <Ionicons name= {olho ? 'eye' : "eye-off"} color='#fff' size={25}/>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  {
                    loadingButton ? (
                      <ActivityIndicator style={{paddingVertical:8}} size={20} color='fff'/>
                    ) : ( 
                      <Text style={styles.textButton}>Login</Text>
                    )
                  }
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCriar}
                onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.textButtonCriar}>Criar uma conta</Text>
                </TouchableOpacity>

            </View>

          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </ContainerGradiente>
  )
}

const styles = StyleSheet.create({
  
    input:{
      backgroundColor:'#000',
      marginBottom:8,
      color:'#fff',
      marginHorizontal:10,
      height:50,
      fontSize:16,
      padding:8,
      borderRadius:10,
    },
    button:{
      backgroundColor:'#00b34a',
      marginTop:16,
      marginHorizontal:10,
      height:50,
      padding:8,
      borderRadius:10,
      
    },
    inputArea:{
      flexDirection:'row',
      marginHorizontal:10,
      backgroundColor:'#121212',
      borderRadius:10,
      height:50,
      alignItems:'center',
      padding:8,
      justifyContent:'space-between'
    },
    textButton:{
      color:'#fff',
      fontSize:28,
      textAlign:'center',
      lineHeight:36
    },
    buttonCriar:{
      margin:10,
    },
    textButtonCriar:{
      textAlign:'right',
      fontSize:15,
      color:'#fff'
    },
  });