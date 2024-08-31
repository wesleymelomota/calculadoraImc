/*desenvolver um component que vai receber o imc e comparar e elerte sobre peso normal, sobre peso etc */
/*
Abaixo de 18,5: Abaixo do peso
Entre 18,5 e 24,9: Peso normal
Entre 25,0 e 29,9: Sobrepeso
Entre 30,0 e 34,9: Obesidade grau I
Entre 35,0 e 39,9: Obesidade grau II
40,0 ou mais: Obesidade grau III (obesidade mórbida)
*/
import React, {useState} from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default function AlertImc(props){
     const [msgImc, setMsgImc] = useState("")
     function checarImc(props){
        switch(props.imc){
            case props.imc < 18.5:
                setMsgImc(`Com o IMC ${props.imc}: Abaixo do peso`)
                break
            case props.imc > 18.5 && props.imc  <= 24.9:
                setMsgImc(`Com o IMC ${props.imc}: Peso normal`)
                break
            case props.imc > 25.0 && props.imc <= 29.9:
                setMsgImc(`Com o IMC ${props.imc}: Sobrepeso`)
                break
            case props.imc > 30.0 && props.imc <= 34.9:
                setMsgImc(`Com o IMC ${props.imc}: Obesidade grau I`)
                break
            case props.imc > 35.0 && props.imc <= 39.9:
                setMsgImc(`Com o IMC ${props.imc}: Obesidade grau II`)
                break
            case props.imc > 40.0:
                setMsgImc(`Com o IMC ${props.imc}: Obesidade grau III (Obesidade mórbida)`)
                break
    
         }
     }
     
     return(
        <View>
            <Text style={styles.colorText}>{msgImc}</Text>
        </View>
     )
}