import { View, Text, Alert } from 'react-native'
import React, {createContext, useState, useEffect} from 'react'
import auth from '@react-native-firebase/auth'

// npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from '../pages/FirebaseConnetion';

import { set } from 'date-fns';

export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  
  const [user,setUser] = useState()
  const [loading,setLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)

  // Logar Usuário
  async function signIn(email, password){
    setLoadingButton(true)
    await firebase.auth().signInWithEmailAndPassword(email,password)
    .then(async(value)=>{
      let uid = value.user.uid;
      await firebase.database().ref('users').child(uid).once('value')
      .then((snapshot)=>{
        let data = {
          uid: uid,
          nome: snapshot.val().nome,
          email: value.user.email,
        };
        setUser(data);
        // Login permanente
        storageUser(data);
        // 
        setLoadingButton(false)
      })
    })
    .catch((error)=>{
      alert(`${error.code}. Por favor, verifique o seu email, senha e a sua conexão com a internet ou tente novamente mais tarde.`)
      setLoadingButton(false)
    })
  }
  // Fim Logar usuário
  
  // Verificar email válido
  async function verificarEmail(email, password){
    return new Promise((resolve) =>{
      auth().createUserWithEmailAndPassword(email, password)
      .then( console.log('Verificado'))
      .catch((error)=>{
         if (error.code === 'auth/invalid-email'){
          alert(`Email não é válido! Por favor, digite um email válido.`)
        } else{
          // alert(`${error.code}. Por favor, verifique o seu email e a sua conexão com a internet ou tente novamente mais tarde.`)
        }
      resolve()
      })
    })
  }

  // Cadastrar Usuario
  async function signUp(email, password, nome){
    setLoadingButton(true)
    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(async(value)=>{ 
      let uid = value.user.uid;
      await firebase.database().ref('users').child(uid).set({
        saldo: 0,
        email: email,
        nome: nome,
        uid: uid,
      })
      .then(() =>{
        let data ={
          uid:uid,
          nome: nome,
          email: value.user.email
        };
        setUser(data);
        setLoadingButton(false)
      })
    })
  // })
    .catch((error)=>{
      if (error.code === 'auth/email-already-in-use'){
        alert(`Email já existe! Por favor, digite um email diferente ou faça o login com o email já cadastrado.`)
      } if (error.code === 'auth/invalid-email'){
        alert(`Email não é válido! Por favor, digite um email válido.`)
      } else{
        console.log(e)
      }
    })
    setLoadingButton(false)
    await delayApagar()

  } 
  // 

  function delayApagar(){
    return new Promise((resolve) => {
      setTimeout(() =>{
         firebase.auth().signOut();
         AsyncStorage.clear()
        .then( () => {
           setUser(); 
        })
        resolve()
      }, 2000)
    })
  }
  
  // PARA CONTINUAR COM O LOGIN, A MENOS QUE APERTAR SAIR E LIMPAR O storageUser(data)
  async function storageUser(data){
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }
  // 'Auth_user' Tem que ser o mesmo nome de string nos dois
  useEffect(()=>{
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('Auth_user');
      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
    console.log('Context Api Use Effect :>> ');
  },[])
  // 

  // Sair do App
  async function signOut(){
    await firebase.auth().signOut();
    await AsyncStorage.clear()
    .then( () => {
       setUser(); 
    })
  }
  // 

  function apagar(){
    return new Promise((resolve)=>{
      setTimeout(() => {
        signOut()
        resolve()
     }, 1000)
    })
  }

  
  return (
    // value={{signed: !!user, user}}
    <AuthContext.Provider value={{ singed: !!user, signUp, signIn, user,loading, 
    signOut,loadingButton,setLoadingButton}}>
      {children}
    </AuthContext.Provider>
  )
}