import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useNavigation } from '@react-navigation/native';

export default function Header() {

    const navigation = useNavigation();

  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity 
      onPress={() => navigation.toggleDrawer()}
      >
          <Ionicons name='menu' color='#FFF' size={30}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    containerHeader:{
      marginTop:40,
      marginLeft:15,
      width: '100%',
      height:50,
    },
 
  
  });