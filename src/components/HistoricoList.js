import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'


export default function HistoricoList({data,deleteItem}) {
  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data) }>
      <View style={styles.containerHistoricoList}>
          <View style={{backgroundColor:data.chooseData == 'Despesa'? '#C62c36': '#049301',
          flexDirection:'row',
          width:'30%',
          alignItems:'center',
          // justifyContent:'space-between',
          borderRadius:7,
          marginVertical:5,
          marginHorizontal:5,
          }}>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:-70}}>
              <Icon style={styles.containerIcon} name={data.chooseData == 'Despesa' ? "arrow-down" : "arrow-up"}
              color='#fff' 
              size={20}/>
              <Text style={styles.textReceita}> {data.chooseData} </Text>
            </View>
            <View style={{flexDirection:'column', flexWrap:'wrap'}}>
              <Text style={{marginLeft:data.chooseData == 'Despesa'? 10 : 20, marginTop:-10, paddingLeft:90, width:'150%', fontWeight:'bold'}}> {data.date} </Text>
            </View>
              <Text style={{ width:'220%',position:'absolute',marginLeft:115,paddingTop:40, textAlign:'center' }}>{data.anotacao ? '-' : ''} {data.anotacao}</Text>
          </View>
        <Text style={styles.textValor}> {data.valor.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})} </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  containerHistoricoList:{
    marginBottom: 5,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal:8,
    borderRadius:10,
  },
  containerIcon:{
    flexDirection:'row',
    paddingVertical:3,
    marginLeft:75,
  },
  textReceita:{
    color:'#fff',
    fontSize:16,
    paddingRight:4,
  },
  textValor:{
    fontSize:22,
    fontWeight:'bold',
    marginHorizontal:5,
  },

});