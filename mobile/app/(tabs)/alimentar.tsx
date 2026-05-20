import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView
} from "react-native";

import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

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
        "MANUAL:",
        valor
      );

      const resposta =
        await liberarRacao(valor);

      console.log(
        "RESPOSTA:",
        resposta
      );

      Alert.alert(
        "Sucesso",
        `Liberado ${valor}g`
      );

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

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>

        <Text style={styles.pageTitle}>
          Alimentar
        </Text>

        <Text style={styles.pageSubtitle}>
          Controle manual da alimentação do seu pet
        </Text>

      </View>

      <View style={styles.infoCard}>

        <View style={styles.infoIconBox}>

          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#7B3FA1"
          />

        </View>

        <View style={styles.infoContent}>

          <Text style={styles.infoTitle}>
            Dica de alimentação
          </Text>

          <Text style={styles.infoText}>
            Recomendado utilizar entre 50g e 200g por alimentação.
          </Text>

        </View>

      </View>

      <View style={styles.card}>

        <View style={styles.iconBox}>

          <Ionicons
            name="restaurant-outline"
            size={38}
            color="#7B3FA1"
          />

        </View>

        <Text style={styles.title}>
          Liberar ração
        </Text>

        <Text style={styles.description}>
          Informe a quantidade desejada para liberar manualmente.
        </Text>

        <Text style={styles.label}>
          Quantidade
        </Text>

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            placeholder="100"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          <Text style={styles.unit}>
            g
          </Text>

        </View>

        <View style={styles.quickButtons}>

          <TouchableOpacity
            style={[
              styles.quickButton,
              quantidade === "50" &&
              styles.quickButtonActive
            ]}
            onPress={()=>setQuantidade("50")}
          >

            <Text
              style={[
                styles.quickButtonText,
                quantidade === "50" &&
                styles.quickButtonTextActive
              ]}
            >
              50g
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickButton,
              quantidade === "100" &&
              styles.quickButtonActive
            ]}
            onPress={()=>setQuantidade("100")}
          >

            <Text
              style={[
                styles.quickButtonText,
                quantidade === "100" &&
                styles.quickButtonTextActive
              ]}
            >
              100g
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickButton,
              quantidade === "200" &&
              styles.quickButtonActive
            ]}
            onPress={()=>setQuantidade("200")}
          >

            <Text
              style={[
                styles.quickButtonText,
                quantidade === "200" &&
                styles.quickButtonTextActive
              ]}
            >
              200g
            </Text>

          </TouchableOpacity>

        </View>

        <View style={styles.progressBackground}>

          <View
            style={[
              styles.progressFill,
              {
                width:`${
                  Math.min(
                    (Number(quantidade || 0) / 300) * 100,
                    100
                  )
                }%`
              }
            ]}
          />

        </View>

        <Text style={styles.limitText}>
          Limite seguro: até 300g por liberação.
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.buttonDisabled
          ]}
          onPress={handleAlimentar}
          disabled={loading}
        >

          {loading ? (

            <ActivityIndicator color="#fff"/>

          ) : (

            <Text style={styles.buttonText}>
              Liberar ração
            </Text>

          )}

        </TouchableOpacity>

      </View>

      <View style={styles.bottomSpace}/>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#ffffff"
  },

  header:{
    paddingTop:10,
    paddingBottom:18,
  },

  pageTitle:{
    fontSize:30,
    fontWeight:"bold",
    color:"#2E2E2E",
  },

  pageSubtitle:{
    fontSize:14,
    color:"#777",
    marginTop:4,
    lineHeight:20
  },

  infoCard:{
    flexDirection:"row",
    backgroundColor:"#F3E8F7",
    padding:16,
    borderRadius:18,
    marginBottom:18,
    borderWidth:1,
    borderColor:"#e9cdf5",
  },

  infoIconBox:{
    width:38,
    height:38,
    borderRadius:19,
    backgroundColor:"#FFFFFF",
    justifyContent:"center",
    alignItems:"center",
    marginRight:12,
  },

  infoContent:{
    flex:1,
  },

  infoTitle:{
    fontSize:15,
    fontWeight:"bold",
    color:"#2E2E2E",
    marginBottom:4,
  },

  infoText:{
    fontSize:13,
    color:"#666",
    lineHeight:19,
  },

  card:{
    width:"100%",
    backgroundColor:"#fff",
    borderRadius:24,
    padding:24,
    elevation:4,
  },

  iconBox:{
    width:70,
    height:70,
    borderRadius:35,
    backgroundColor:"#F3E8F7",
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:14,
  },

  title:{
    textAlign:"center",
    fontSize:24,
    fontWeight:"bold",
    marginBottom:8,
    color:"#2E2E2E"
  },

  description:{
    textAlign:"center",
    color:"#666",
    marginBottom:24,
    lineHeight:22,
  },

  label:{
    fontSize:14,
    color:"#555",
    fontWeight:"600",
    marginBottom:8,
  },

  inputContainer:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#F8F6FB",
    borderRadius:14,
    paddingHorizontal:15,
    marginBottom:18,
    borderWidth:1,
    borderColor:"#E7D4EF",
  },

  input:{
    flex:1,
    paddingVertical:15,
    fontSize:20,
    fontWeight:"bold",
    color:"#2E2E2E",
  },

  unit:{
    fontSize:18,
    color:"#777",
    fontWeight:"bold",
  },

  quickButtons:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:18,
  },

  quickButton:{
    flex:1,
    backgroundColor:"#F3E8F7",
    paddingVertical:12,
    borderRadius:14,
    alignItems:"center",
    marginHorizontal:4,
  },

  quickButtonActive:{
    backgroundColor:"#7B3FA1",
  },

  quickButtonText:{
    color:"#7B3FA1",
    fontWeight:"bold",
  },

  quickButtonTextActive:{
    color:"#FFFFFF",
  },

  progressBackground:{
    width:"100%",
    height:10,
    backgroundColor:"#EEE",
    borderRadius:20,
    overflow:"hidden",
    marginBottom:10,
  },

  progressFill:{
    height:"100%",
    backgroundColor:"#7B3FA1",
    borderRadius:20,
  },

  limitText:{
    fontSize:12,
    color:"#777",
    marginBottom:22,
  },

  button:{
    backgroundColor:"#7B3FA1",
    padding:16,
    borderRadius:16,
    width:"100%",
    alignItems:"center"
  },

  buttonDisabled:{
    opacity:0.7,
  },

  buttonText:{
    color:"#FFFFFF",
    fontSize:17,
    fontWeight:"bold"
  },

  bottomSpace:{
    height:30,
  }

});