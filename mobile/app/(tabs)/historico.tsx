import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";

import {
  useEffect,
  useState
} from "react";

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

  if(loading){

    return(

      <View style={styles.center}>

        <ActivityIndicator
          size="large"
          color="#000"
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

      contentContainerStyle={
        styles.container
      }

      renderItem={({item})=>(

        <View style={styles.card}>

          <Text style={styles.quantidade}>
            🍖 {item.quantidade} g
          </Text>

          <Text style={styles.data}>
            📅 {new Date(item.data)
              .toLocaleString()}
          </Text>

        </View>

      )}

      ListEmptyComponent={(

        <Text style={styles.empty}>
          Nenhum registro ainda
        </Text>

      )}
    />

  );

}

const styles = StyleSheet.create({

  container:{
    padding:15,
    backgroundColor:"#f2f4f7"
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  card:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:12,
    marginBottom:10,
    elevation:2
  },

  quantidade:{
    fontSize:18,
    fontWeight:"bold"
  },

  data:{
    color:"#666",
    marginTop:5
  },

  empty:{
    textAlign:"center",
    marginTop:50,
    color:"#666"
  }

});