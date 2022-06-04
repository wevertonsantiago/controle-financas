import { View, Text, StyleSheet ,TouchableOpacity, FlatList, Alert } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'

import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../contexts/AuthProvider'
import Header from '../components/Header'
import HistoricoList from '../components/HistoricoList'
import ContainerGradiente from './ContainerGradiente'

import firebase from './FirebaseConnetion'
import { format } from 'date-fns'

export default function HomeConteudo() {

    const { user, signOut } = useContext(AuthContext)

    const [historico, setHistorico] = useState([ ])
    const [valorTotal,setValorTotal] = useState(0)
    

    const navigation = useNavigation()

    async function sair(){
      await signOut()
      user && navigation.navigate('SignIn')
    }

    useEffect(()=>{
      // Read LEITURA DO FIREBASE MOSTRAR NA TELA
      async function loadList(){
       const uid = user && user.uid;
       await firebase.database().ref('users').child(uid).on('value',(snapshot)=>{
          const data = snapshot.val()
          if (data !== null){
            setValorTotal(data.saldo)
          } else {
            setValorTotal('Erro na leitura')
          }
        });
        await firebase.database().ref('historico').child(uid).orderByChild('date')
        .equalTo(format(new Date, 'dd/MM/yy')).limitToLast(10).on('value',(snapshot)=>{
          setHistorico([])
          snapshot.forEach((childItem)=> {
            let list ={
              key: childItem.key,
              date: childItem.val().date,
              chooseData: childItem.val().chooseData,
              valor: childItem.val().valor,
              anotacao: childItem.val().anotacao,
            };
            setHistorico(oldArray => [...oldArray, list].reverse());
          })
        })
      }
      loadList();
    },[]);

    function real(valor){
     return valor.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})
    }

    function handleDelete(data){
      Alert.alert(
        'Cuidado!',
        `Deseja excluir ${data.chooseData} - Valor ${data.valor.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})} ?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Deletar',
            onPress: () => handleDeleteSucess(data)
          }
        ]
      )
    }
    // DELETAR DELET FIREBASE CRUD
    async function handleDeleteSucess(data){
      const uid = user && user.uid;
      await firebase.database().ref('historico').child(uid).child(data.key).remove()
      // Corrigindo o valor depois do Delete
      .then( async () =>{
        let saldoAtual = valorTotal;
        data.chooseData == 'Despesa' ? saldoAtual = valorTotal + parseFloat(data.valor) : saldoAtual = valorTotal - parseFloat(data.valor)
        
        //AGORA EDITAR CRUD O NOVO VALOR DO SALDO NO FIREBASE
        await firebase.database().ref('users').child(uid).child('saldo').set(saldoAtual) 
      })
      .cath((error)=>{
        console.log(error)
      })
    }

  return (
    <ContainerGradiente>
    <View>
        <Header/>
        <View style={styles.containerConteudo}>
          <View style={{flexDirection:'row'}}>
              <Text style={{color:'#fff', fontSize:20}}>Bem vindo, </Text>
              <Text style={styles.textoConteudo}>{user && user.nome}</Text>
          </View>
            <Text style={{color:"#fff", fontSize:15 ,marginTop:10}}>Total:</Text>
            <Text style={[styles.saldoConteudo,{marginBottom:15}]}>{valorTotal.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Registrar')} style={{backgroundColor:'#00b94a', marginHorizontal:15, borderRadius:10,marginBottom:15}}>
          <Text style={{color:'#fff', fontSize:20, fontWeight:'700', textAlign:'center',height:40,paddingTop:8}}> Registrar</Text>
        </TouchableOpacity>
        <Text style={[styles.saldoConteudo,{marginBottom:15}]}>Últimos registros:</Text>
        <FlatList style={styles.listaConteudo}
        showsVerticalScrollIndicator={false} // Para não aparecer a barra de rolagem Vertical
        data={historico}
        heyExtrator={item => item.key}
        renderItem={({item}) => (<HistoricoList data={item} deleteItem={handleDelete}/>)}

        />
    </View>
    </ContainerGradiente>
  )
}

const styles = StyleSheet.create({

    containerConteudo:{
        marginLeft:15,
    },
    textoConteudo:{
        color:'#fff',
        fontSize:20,
        fontStyle: 'italic',
    },
    saldoConteudo:{
        color:'#fff',
        fontSize:30,
        fontWeight:'bold',
        // marginBottom:15,
    },

    listaConteudo:{
      paddingTop:15,
      backgroundColor:'#fff',
      borderTopLeftRadius:15,
      borderTopRightRadius:15,
      marginHorizontal:8,
      height:'100%'
    },
});