import { View, Text, StyleSheet, 
TextInput, TouchableOpacity, 
Keyboard, TouchableWithoutFeedback, Modal, Alert } from 'react-native'
import React, {useState, useContext, useRef} from 'react'
import { format } from 'date-fns'
import ContainerGradiente from './ContainerGradiente'
import { AuthContext } from '../contexts/AuthProvider'

import firebase from './FirebaseConnetion'

import ModalPicker from '../components/ModalPicker'

import Header from '../components/Header'
import { onChange } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

export default function New() {

  const navigation = useNavigation() 
  const {user:usuario} = useContext(AuthContext);

  const [valor,setValor] = useState()
  console.log('valor', valor)
  const [anotacao, setAnotacao] = useState()
  const [tipo, setTipo] = useState()
  const [selectedLanguage, setSelectedLanguage] = useState()

  const [chooseData, setchooseData] = useState('Select Item...')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool)
  }

  const setData = (option) => {
    setchooseData(option)
  }

  console.log('chooseData = ', chooseData)
  const animation = useRef(null)

  // RegistrarDinheiroAnimacao
  async function animacaoAdd(){
    return new Promise((resolve) =>{
      navigation.navigate('RegistrarDinheiroAnimacao')
      resolve()
  })
  }

  async function homePage(){
    return new Promise((resolve) =>{
      setTimeout(() => {
        navigation.navigate('Resumo')
        resolve()
      },2000)
    })
  }


  //  ADICIONAR NO FIREBASE E ATUALIZAR O SALDO
  async function handleAdd(){
    await animacaoAdd()
    await homePage()
    let uid = usuario.uid;
    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      chooseData: chooseData,
      valor: parseFloat(valor),
      anotacao: anotacao ? anotacao : '' ,
      date: format(new Date(), 'dd/MM/yy')
    })

    // atualizar o saldo

    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot)=>{
      let saldo = parseFloat(snapshot.val().saldo);

      chooseData === 'Despesa' ? saldo = saldo - parseFloat(valor) : saldo = saldo + parseFloat(valor);

      user.child('saldo').set(saldo);
    });
    Keyboard.dismiss();
    setValor('');
    setAnotacao('');

    // navigation.navigate('Resumo')

  }

  function handleSumit(){
    Keyboard.dismiss()
    if(isNaN(parseFloat(valor)) || chooseData === null){
    alert('Preencha todos os campos')
    return;
  }
    Alert.alert(
      'Confirmado dados',
      `Tipo ${chooseData} - Valor: ${ valor.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        },
      ],
    );
  }

  return (
    <ContainerGradiente>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <View style={styles.containerNew}>
        <Header/>
        <Text style={styles.textoNew}>Digite os valores para registrar</Text>
        <TextInput style={[styles.inputNew,{marginTop:30}]}
        placeholder='Valor desejado'
        keyboardType='numeric'
        value={valor}
        onChangeText={ (text) => setValor(text.replace(',','.'))}
        // returnKeyLabel='next'
        // onSubmitEditing={() => Keyboard.dismiss() }
        />
        {/* PICKER */}
        <TextInput style={[styles.inputNew,{marginTop:20}]}
        placeholder='Anotação'
        keyboardType='default'
        value={anotacao}
        onChangeText={ (text) => setAnotacao(text)}
        />
       <View style={styles.containerModal}>
      <TouchableOpacity 
        onPress={() => changeModalVisibility(true)}
        style={styles.touchableOpacity}
      >
        <Text style={styles.text}>{chooseData}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType='fase'
        visible={isModalVisible}
        onRequestClose={() => changeModalVisibility(false)}
      >
        <ModalPicker
        changeModalVisibility={changeModalVisibility}
        setData={setData}
        />
      </Modal>
    </View>
        <TouchableOpacity style={styles.registrarNew}
        onPress={handleSumit}
        >
          <Text style={styles.textNew}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
    </ContainerGradiente>
  )
};

const styles = StyleSheet.create({
  
  containerNew:{
    color:'#fff',
  },
  textoNew:{
    textAlign:"center",
    fontSize:20,
    // marginBottom:25,
    color:'#fff',
  },
  inputNew:{
    height:50,
    padding:10,
    marginHorizontal:10,
    alignItems:'center',
    backgroundColor:'rgba(255,255,255,0.9)',
    borderRadius:10,
    fontSize:17,
  },
  registrarNew:{
    height:50,
    backgroundColor:'#00b94a',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:10,
    borderRadius:10,
  },
  textNew:{
    fontSize:21,
    fontWeight:'bold',
    color:'#fff',
  },
  containerModal:{
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20,
  },
  text:{
    marginVertical:10,
    fontSize:25,
  },
  touchableOpacity:{
    height:50,
    borderRadius:10,
    backgroundColor:'rgba(255,255,255,0.9)',
    alignSelf:'stretch',
    paddingHorizontal:20,
    marginHorizontal:10,
  },

});