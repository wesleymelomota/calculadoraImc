import React, {useState} from 'react'
import {View, Text, TextInput, Vibration,  
    TouchableOpacity, Keyboard, Pressable, FlatList,
} from 'react-native';
import ResultImc from './resultImc'
import styles from './style'
import AlertImc from './resultImc/alert';

export default function Form(){

    const [altura, setAltura] = useState(null);
    const [peso, setPeso] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha Peso e Altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [erroMessage, setErroMessage] = useState(null);
    const [imcList, setImcList] = useState([]);

    function imcCalculator(){
        let alturaFormatada = altura.replace(",", ".");
        let totalImc = (peso / (alturaFormatada*alturaFormatada)).toFixed(2);
        setImcList( (arg) => [...arg, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc);
        
    }
    function verificarImc(){
        if(imc == null){
            Vibration.vibrate();
            setErroMessage("Campo Obrigatorio*")
            return
        }
    }
    
    
    function validationImc(){
        if(altura != null && peso != null){
            imcCalculator()
            setAltura(null)
            setPeso(null)
            setMessageImc("Seu imc é igual: ")
            Keyboard.dismiss()
            setTextButton("Calcular Novamente")
            setErroMessage(null)
        }else{
            verificarImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("Preencha Peso e Altura")
        }
    }
    return(
        <View style={styles.formContext}>
             {imc == null ?
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.erroMessage}>{erroMessage}</Text>
                <TextInput style={styles.input} onChangeText={setAltura} value={altura} placeholder='Ex. 1.70' keyboardType='numeric'/>
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.erroMessage}>{erroMessage}</Text>
                <TextInput style={styles.input} onChangeText={setPeso} value={peso} placeholder='Ex. 86.120' keyboardType='numeric'/>
                
                <TouchableOpacity
                style={styles.buttonCalculator} 
                onPress={() => validationImc()} 
                title={textButton}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </Pressable> 
            :
            <View style={styles.exhibitionResultImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                <TouchableOpacity
                style={styles.buttonCalculator} 
                onPress={() => validationImc()} 
                title={textButton}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
            <FlatList style={styles.listImcs}  data={imcList.reverse()}
            renderItem={({item}) => {
                return(
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.textResulItemList}>Resultado IMC é:</Text>
                        {item.imc}
                    </Text>
                )
            }}
            keyExtractor={(item) =>{
                item.id
            }}
            showsVerticalScrollIndicator={false}
            />
        </View>
    )
}