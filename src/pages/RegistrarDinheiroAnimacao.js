import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import ContainerGradienteAnimacao from './ContainerGradienteAnimacao'

export default function RegistrarDinheiroAnimacao() {
  return (
    <ContainerGradienteAnimacao>
      <LottieView
      source={(require('../assets/verificado.json'))}
      autoPlay={true}
      loop={true}
      />
    </ContainerGradienteAnimacao>
  )
}