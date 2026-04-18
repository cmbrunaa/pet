import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";

import { useState } from "react";

import {
  liberarRacao
} from "../../src/services/alimentadorService";

export default function Alimentar() {

  const [quantidade,setQuantidade] =
    useState("100");

  const [loading,setLoading] =
    useState(false);

  async function handleAlimentar(){

    const valor =
      Number(quantidade);

    // 🚨 validação

    if(
      !quantidade ||
      isNaN(valor) ||
      valor <= 0
    ){

      Alert.alert(
        "Erro",
        "Digite uma quantidade válida"
      );

      return;

    }

    // 🚨 limite seguro

    if(valor > 300){

      Alert.alert(
        "Limite excedido",
        "Máximo permitido: 300g"
      );

      return;

    }

    try{

      setLoading(true);

      console.log(
        "🍖 MANUAL:",
        valor
      );

      const resposta =
        await liberarRacao(valor);

      console.log(
        "📦 RESPOSTA:",
        resposta
      );

      Alert.alert(
        "Sucesso",
        `🐶 Liberado ${valor}g`
      );

      // reset para padrão

      setQuantidade("100");

    }catch(error){

      console.log(
        "Erro manual:",
        error
      );

      Alert.alert(
        "Erro",
        "Falha ao enviar comando"
      );

    }finally{

      setLoading(false);

    }

  }

  return(

    <View style={styles.container}>

      <Text style={styles.title}>
        🍖 Alimentar Manual
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Quantidade (g)"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAlimentar}
        disabled={loading}
      >

        {loading ? (

          <ActivityIndicator color="#fff"/>

        ) : (

          <Text style={styles.buttonText}>
            Liberar Ração
          </Text>

        )}

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:20,
    backgroundColor:"#f5f5f5"
  },

  title:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:20
  },

  input:{
    width:"80%",
    backgroundColor:"#fff",
    padding:15,
    borderRadius:12,
    marginBottom:20,
    fontSize:16
  },

  button:{
    backgroundColor:"#000",
    padding:18,
    borderRadius:12,
    width:"80%",
    alignItems:"center"
  },

  buttonText:{
    color:"#fff",
    fontSize:18,
    fontWeight:"bold"
  }

});