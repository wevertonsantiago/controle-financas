import { View, Text, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'



export default function ModalPicker(props) {
    
    const OPTIONS = ['Receita','Despesa']
    const WIDTH = Dimensions.get('window').width
    const HEIGHT = Dimensions.get('window').height

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option);
    }
    
    const option = OPTIONS.map((item,index) => {
        return(
            <TouchableOpacity
             style={styles.option}
             key={index}
             onPress={() => onPressItem(item)}
            >
                <View style={{marginTop:120,marginBottom:40,}}>
                    <Text style={styles.text}>
                        {item}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    })

  return (
    <TouchableOpacity
        onPress={() => props.changeModalVisibility(false)}
        style={styles.containerPicker}
    >
        <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT/2}]}>
            <ScrollView>
                {option}
            </ScrollView>
        </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    containerPicker:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    modal:{
        backgroundColor:'#CCCCCC',
        borderRadius:10,
    },
    option:{
        flex:1,
        // alignItems:'flex-start',
        
    },
    text:{

        textAlign:'center',
        // backgroundColor:'red',
        // marginTop:100,
        // marginLeft:20,
        fontSize:20,
        fontWeight:'bold',
    },
})