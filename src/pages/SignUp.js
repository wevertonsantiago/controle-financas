import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback,Keyboard, RefreshControl, ScrollView, Alert,ActivityIndicator} from 'react-native'
import React, {useState, useContext} from 'react'
import auth from '@react-native-firebase/auth'
import ContainerGradiente from './ContainerGradiente'

import { AuthContext } from '../contexts/AuthProvider'
import { useNavigation } from '@react-navigation/native'

export default function SignUp() {

  const [nome,setNome] = useState('')  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [subirLayout, setSubirLayout] = useState()
  const [loading, setLoading] = useState(false)

  const { signUp, user, loadingButton } = useContext(AuthContext)
  const navigation = useNavigation()

  async function loaginUser() {
    setLoading(true) 
    await signUp(email, password, nome)
    setLoading(false)
      Alert.alert(
        "Conta registrada com sucesso!",
        "Por favor, faça o login com email e senha cadastrada",
        [
          { text: "OK", onPress: () => navigation.navigate('SignIn') }
        ]
      )
  }

  async function handleSignUp(){
    nome === '' || email === '' || password === '' ?
      Alert.alert(
        "Atenção!",
        "Por favor, preencher os campos de Nome, Email e Senha.",
        [
          {
            text: "OK",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ]
      ) : nome && email && password ? loaginUser() : null

  }

  const [ atualizando,setAtualizando ] = useState(false)
  const aoAtualizar = () =>{
    setAtualizando(true)
    setTimeout(() => {setAtualizando(false)},1000)
  }

  return (
    <ContainerGradiente>
      <ScrollView
      scrollEnabled={false}
      >
        <RefreshControl
        refreshing={atualizando}
        onRefresh={aoAtualizar}
        />
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View style={{ justifyContent:'center', paddingTop:200}}>
          <KeyboardAvoidingView>
            <View style={{marginTop: subirLayout ? -130 : -60  }}>
              <Text style={{fontSize:23,color:'#fff',textAlign:'center',marginBottom:20}}>Criar Conta</Text>
          <Text style={{marginLeft:10, color:'#fff'}}>Nome</Text>
                <TextInput
                style={styles.input}
                placeholder='Nome'
                placeholderTextColor="#fff"
                selectionColor='#fff'
                autoCorrect={false}
                autoCapitalize='none'
                value={nome}
                onChangeText={(text) => setNome(text) }
                onFocus={() => setSubirLayout(true)}
                onBlur={() => setSubirLayout(false)}
                />
                <Text style={{marginLeft:10, color:'#fff'}}>Email</Text>
                <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor="#fff"
                selectionColor='#fff'
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
                value={email}
                onChangeText={(text) => setEmail(text) }
                onFocus={() => setSubirLayout(true)}
                onBlur={() => setSubirLayout(false)}
                />
                <Text style={{marginLeft:10, color:'#fff'}}>Senha</Text>
                <TextInput
                style={styles.input}
                placeholder='Senha'
                placeholderTextColor="#fff" 
                selectionColor='#fff'
                autoCorrect={false}
                autoCapitalize='none'
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                onFocus={() => setSubirLayout(true)}
                onBlur={() => setSubirLayout(false)}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                  {
                    loading ? (
                      <ActivityIndicator style={{paddingVertical:8}} size={20} color='fff'/>
                    ) : ( 
                  <Text style={styles.textButton}>Cadastrar</Text>
                    )
                  }
                </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
      </View>
        </TouchableWithoutFeedback>
      </ScrollView>
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
      fontSize:15
    },
  });