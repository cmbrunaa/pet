import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";

import {
  useEffect,
  useState
} from "react";

import {
  criarAgendamento,
  listarAgendamentos,
  excluirAgendamento
} from "../../src/services/agendamentoService";

export default function Agendamentos(){

  const [hora,setHora] =
    useState("");

  const [peso,setPeso] =
    useState("300");

  const [lista,setLista] =
    useState<any[]>([]);

  useEffect(()=>{

    carregar();

  },[]);

  async function carregar(){

    try{

      const dados =
        await listarAgendamentos();

      setLista(dados);

    }catch(error){

      console.log(error);

    }

  }

  async function criar(){

    if(!hora){

      Alert.alert(
        "Erro",
        "Digite um horário"
      );

      return;

    }

    try{

      await criarAgendamento(
        hora,
        Number(peso)
      );

      setHora("");

      carregar();

    }catch(error){

      Alert.alert(
        "Erro",
        "Falha ao criar"
      );

    }

  }

  async function remover(id:number){

    await excluirAgendamento(id);

    carregar();

  }

  return(

    <View style={styles.container}>

      <Text style={styles.title}>
        ⏰ Agendamentos
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Horário (ex: 08:00)"
        value={hora}
        onChangeText={setHora}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade (g)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={criar}
      >

        <Text style={styles.buttonText}>
          Criar Agendamento
        </Text>

      </TouchableOpacity>

      <FlatList
        data={lista}

        keyExtractor={(item)=>
          item.id.toString()
        }

        renderItem={({item})=>(

          <View style={styles.card}>

            <Text style={styles.hora}>
              🕒 {item.hora.substring(0,5)}
            </Text>

            <Text style={styles.peso}>
              🍖 {item.peso_desejado ?? item.peso ?? 0} g
            </Text>

            <TouchableOpacity
              onPress={()=>remover(item.id)}
            >

              <Text style={styles.excluir}>
                Excluir
              </Text>

            </TouchableOpacity>

          </View>

        )}

      />

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#f2f4f7"
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:15
  },

  input:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:12,
    marginBottom:10
  },

  button:{
    backgroundColor:"#000",
    padding:15,
    borderRadius:12,
    alignItems:"center",
    marginBottom:15
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  },

  card:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:12,
    marginBottom:10
  },

  hora:{
    fontSize:16,
    fontWeight:"bold"
  },

  peso:{
    marginTop:5
  },

  excluir:{
    color:"red",
    marginTop:8
  }

});