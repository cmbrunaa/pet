import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert
} from "react-native";

import {
  useEffect,
  useState
} from "react";

import {
  getEstatisticas,
  getPesoAtual
} from "../../src/services/dashboardService";

import {
  getRecomendacaoIA
} from "../../src/services/iaService";

import {
  liberarRacao
} from "../../src/services/alimentadorService";

export default function Dashboard() {

  const [estatisticas,setEstatisticas] =
    useState<any>(null);

  const [peso,setPeso] =
    useState<number>(0);

  const [ia,setIa] =
    useState<any>(null);

  const [loading,setLoading] =
    useState(true);

  const [refreshing,setRefreshing] =
    useState(false);

  useEffect(()=>{

    carregarDados();

  },[]);

  async function carregarDados(){

    try{

      const stats =
        await getEstatisticas();

      const pesoAtual =
        await getPesoAtual();

      const recomendacaoIA =
        await getRecomendacaoIA();

      setEstatisticas(stats);
      setPeso(pesoAtual);
      setIa(recomendacaoIA);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  }

  async function atualizar(){

    setRefreshing(true);

    await carregarDados();

    setRefreshing(false);

  }

  // 🚨 STATUS BASEADO EM PESO

  function obterStatusPeso(){

    if(peso <= 0){

      return {
        texto:"Sem ração",
        cor:"#ff3b30"
      };

    }

    if(peso <= 100){

      return {
        texto:"Baixo",
        cor:"#ff9500"
      };

    }

    if(peso >= 300){

      return {
        texto:"Cheio",
        cor:"#007aff"
      };

    }

    return {
      texto:"Normal",
      cor:"#34c759"
    };

  }

  // 🤖 BOTÃO IA

  async function alimentarComIA(){

    try{

      if(!ia?.recomendacao){

        Alert.alert(
          "Aviso",
          "Sem recomendação disponível"
        );

        return;

      }

      await liberarRacao(
        ia.recomendacao
      );

      Alert.alert(
        "Sucesso",
        `🐶 Alimentado com ${ia.recomendacao}g`
      );

      carregarDados();

    }catch(error){

      Alert.alert(
        "Erro",
        "Falha ao alimentar"
      );

    }

  }

  if(loading){

    return(

      <View style={styles.center}>

        <ActivityIndicator size="large"/>

      </View>

    );

  }

  const status =
    obterStatusPeso();

  return(

    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={atualizar}
        />
      }
    >

      {/* STATUS */}

      <View
        style={[
          styles.statusBox,
          {
            backgroundColor:
              status.cor
          }
        ]}
      >

        <Text style={styles.statusText}>
          {status.texto}
        </Text>

      </View>

      {/* GRID */}

      <View style={styles.grid}>

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Peso
          </Text>

          <Text style={styles.value}>
            {peso} g
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Média diária
          </Text>

          <Text style={styles.value}>
            {estatisticas?.mediaDiaria ?? 0} g
          </Text>

        </View>

      </View>

      {/* CONSUMO TOTAL */}

      <View style={styles.cardFull}>

        <Text style={styles.cardTitle}>
          Consumo Total
        </Text>

        <Text style={styles.value}>
          {estatisticas?.totalConsumido ?? 0} g
        </Text>

      </View>

      {/* ALERTA */}

      <View style={styles.cardAlert}>

        <Text style={styles.cardTitle}>
          🚨 Consumo
        </Text>

        <Text style={styles.value}>
          {estatisticas?.alertaConsumo ?? "Normal"}
        </Text>

      </View>

      {/* IA */}

      <View style={styles.cardIA}>

        <Text style={styles.cardTitleIA}>
          🤖 Recomendação IA
        </Text>

        <Text style={styles.valueIA}>
          {ia?.recomendacao ?? 0} g
        </Text>

        <TouchableOpacity
          style={styles.buttonIA}
          onPress={alimentarComIA}
        >

          <Text style={styles.buttonText}>
            Alimentar com IA
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#f2f4f7"
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  statusBox:{
    padding:15,
    borderRadius:14,
    marginBottom:20,
    alignItems:"center"
  },

  statusText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },

  card:{
    width:"48%",
    backgroundColor:"#fff",
    padding:20,
    borderRadius:14,
    marginBottom:15,
    elevation:2
  },

  cardFull:{
    backgroundColor:"#fff",
    padding:20,
    borderRadius:14,
    marginBottom:15,
    elevation:2
  },

  cardAlert:{
    backgroundColor:"#fff",
    padding:20,
    borderRadius:14,
    marginBottom:15,
    elevation:2
  },

  cardIA:{
    backgroundColor:"#000",
    padding:20,
    borderRadius:14,
    marginTop:10
  },

  cardTitle:{
    fontSize:14,
    color:"#666"
  },

  cardTitleIA:{
    fontSize:14,
    color:"#aaa"
  },

  value:{
    fontSize:26,
    fontWeight:"bold",
    marginTop:5
  },

  valueIA:{
    fontSize:32,
    fontWeight:"bold",
    color:"#fff",
    marginTop:5
  },

  buttonIA:{
    backgroundColor:"#fff",
    padding:14,
    borderRadius:10,
    marginTop:12,
    alignItems:"center"
  },

  buttonText:{
    fontWeight:"bold",
    color:"#000"
  }

});