import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  useEffect,
  useState
} from "react";

import { Ionicons } from "@expo/vector-icons";

import {
  getHistorico
} from "../../src/services/historicoService";

export default function Historicos(){

  const [historico,setHistorico] =
    useState<any[]>([]);

  const [loading,setLoading] =
    useState(true);

  const [refreshing,setRefreshing] =
    useState(false);

  useEffect(()=>{

    carregarHistorico();

  },[]);

  async function carregarHistorico(){

    try{

      const data =
        await getHistorico();

      setHistorico(data);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  }

  async function atualizar(){

    setRefreshing(true);

    await carregarHistorico();

    setRefreshing(false);

  }

  function formatarData(data:string){

    return new Date(data).toLocaleString(
      "pt-BR",
      {
        day:"2-digit",
        month:"2-digit",
        year:"numeric",
        hour:"2-digit",
        minute:"2-digit"
      }
    );

  }

  function obterTipo(item:any){

    return (
      item.tipo ||
      item.origem ||
      "Manual"
    );

  }

  function obterIconeTipo(tipo:string){

    const tipoFormatado =
      tipo.toLowerCase();

    if(tipoFormatado.includes("agendamento")){

      return "calendar-outline" as const;

    }

    if(tipoFormatado.includes("ia") || tipoFormatado.includes("recomend")){

      return "sparkles-outline" as const;

    }

    return "hand-left-outline" as const;

  }

  if(loading){

    return(

      <View style={styles.center}>

        <ActivityIndicator
          size="large"
          color="#7B3FA1"
        />

      </View>

    );

  }

  return(

    <FlatList
      data={historico}
      keyExtractor={(item)=>
        item.id.toString()
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={atualizar}
        />
      }
      contentContainerStyle={[
        styles.container,
        historico.length === 0 && styles.emptyContainer
      ]}
      ListHeaderComponent={

        <View style={styles.header}>

          <Text style={styles.pageTitle}>
            Histórico
          </Text>

          <Text style={styles.pageSubtitle}>
            Acompanhe as alimentações realizadas pelo sistema
          </Text>

        </View>

      }
      renderItem={({item})=>{

        const tipo =
          obterTipo(item);

        return(

          <View style={styles.card}>

            <View style={styles.iconBox}>

              <Ionicons
                name={obterIconeTipo(tipo)}
                size={24}
                color="#7B3FA1"
              />

            </View>

            <View style={styles.cardContent}>

              <View style={styles.cardTop}>

                <Text style={styles.quantidade}>
                  {item.quantidade} g
                </Text>

                <View style={styles.badge}>

                  <Text style={styles.badgeText}>
                    {tipo}
                  </Text>

                </View>

              </View>

              <Text style={styles.data}>
                {formatarData(item.data)}
              </Text>

              <Text style={styles.details}>
                Peso desejado: {item.peso_desejado ?? 0}g
              </Text>

            </View>

          </View>

        );

      }}
      ListEmptyComponent={

        <View style={styles.emptyCard}>

          <Ionicons
            name="document-text-outline"
            size={38}
            color="#7B3FA1"
          />

          <Text style={styles.emptyTitle}>
            Nenhum registro ainda
          </Text>

          <Text style={styles.emptyText}>
            As alimentações realizadas aparecerão aqui.
          </Text>

        </View>

      }
    />

  );

}
const styles = StyleSheet.create({

  container:{
    padding:20,
    backgroundColor:"#F8F6FB",
    paddingBottom:30,
  },

  emptyContainer:{
    flexGrow:1,
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#F8F6FB",
  },

  header:{
    paddingTop:10,
    paddingBottom:20,
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
    lineHeight:20,
  },

  card:{
    backgroundColor:"#fff",
    padding:16,
    borderRadius:18,
    marginBottom:12,
    elevation:2,
    flexDirection:"row",
    alignItems:"center",
  },

  iconBox:{
    width:46,
    height:46,
    borderRadius:23,
    backgroundColor:"#F3E8F7",
    justifyContent:"center",
    alignItems:"center",
    marginRight:12,
  },

  cardContent:{
    flex:1,
  },

  cardTop:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:4,
  },

  quantidade:{
    fontSize:22,
    fontWeight:"bold",
    color:"#2E2E2E",
  },

  badge:{
    backgroundColor:"#F3E8F7",
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:12,
  },

  badgeText:{
    fontSize:12,
    color:"#7B3FA1",
    fontWeight:"bold",
  },

  data:{
    color:"#666",
    fontSize:13,
    marginTop:2,
  },

  details:{
    color:"#888",
    fontSize:12,
    marginTop:4,
  },

  emptyCard:{
    backgroundColor:"#FFFFFF",
    padding:28,
    borderRadius:22,
    alignItems:"center",
    elevation:2,
  },

  emptyTitle:{
    fontSize:17,
    fontWeight:"bold",
    color:"#2E2E2E",
    marginTop:12,
  },

  emptyText:{
    fontSize:13,
    color:"#666",
    textAlign:"center",
    marginTop:6,
    lineHeight:19,
  },

});