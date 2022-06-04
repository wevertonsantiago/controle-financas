import { View, Text, StyleSheet } from 'react-native'
import React  from 'react'
import LinearGradient from 'react-native-linear-gradient'

// Site da biblioteca https://www.npmjs.com/package/react-native-linear-gradient
// npm install react-native-linear-gradient --save

const ContainerGradienteAnimacao = ({children}) => {
    return ( 
    <LinearGradient 
    colors={['#000','#00b34a']}
    style={styles.gradient}>
        <View style={styles.container}>
            {children}
        </View>
    </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex:1,
        
    },
    container:{
        flex:1,
        // marginHorizontal: 15,
    },
});

export default ContainerGradienteAnimacao;