import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";

import {
  useEffect,
  useState
} from "react";

import { Ionicons } from "@expo/vector-icons";

import {
  criarAgendamento,
  listarAgendamentos,
  excluirAgendamento
} from "../../src/services/agendamentoService";

export default function Agendamentos(){

  const [hora,setHora] =
    useState("");

  const [peso,setPeso] =
    useState("100");

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

    if(!peso || Number(peso) <= 0){

      Alert.alert(
        "Erro",
        "Digite uma quantidade válida"
      );

      return;

    }

    if(Number(peso) > 300){

      Alert.alert(
        "Limite excedido",
        "Máximo permitido: 300g"
      );

      return;

    }

    try{

      await criarAgendamento(
        hora,
        Number(peso)
      );

      setHora("");
      setPeso("100");

      carregar();

      Alert.alert(
        "Sucesso",
        "Agendamento criado com sucesso"
      );

    }catch(error){

      Alert.alert(
        "Erro",
        "Falha ao criar"
      );

    }

  }

  async function remover(id:number){

    try{

      await excluirAgendamento(id);

      carregar();

    }catch(error){

      Alert.alert(
        "Erro",
        "Falha ao excluir"
      );

    }

  }

  return(

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>

        <Text style={styles.pageTitle}>
          Agendamentos
        </Text>

        <Text style={styles.pageSubtitle}>
          Programe horários automáticos para alimentar seu pet
        </Text>

      </View>

      <View style={styles.infoCard}>

        <View style={styles.infoIconBox}>

          <Ionicons
            name="time-outline"
            size={22}
            color="#7B3FA1"
          />

        </View>

        <View style={styles.infoContent}>

          <Text style={styles.infoTitle}>
            Dica de agendamento
          </Text>

          <Text style={styles.infoText}>
            Informe o horário no formato 24h, por exemplo: 08:00 ou 18:30.
          </Text>

        </View>

      </View>

      <View style={styles.formCard}>

        <Text style={styles.sectionTitle}>
          Novo agendamento
        </Text>

        <Text style={styles.label}>
          Horário
        </Text>

        <View style={styles.inputContainer}>

          <Ionicons
            name="alarm-outline"
            size={20}
            color="#7B3FA1"
          />

          <TextInput
            style={styles.input}
            placeholder="08:00"
            placeholderTextColor="#999"
            value={hora}
            onChangeText={setHora}
          />

        </View>

        <Text style={styles.label}>
          Quantidade
        </Text>

        <View style={styles.inputContainer}>

          <Ionicons
            name="restaurant-outline"
            size={20}
            color="#7B3FA1"
          />

          <TextInput
            style={styles.input}
            placeholder="100"
            placeholderTextColor="#999"
            value={peso}
            onChangeText={setPeso}
            keyboardType="numeric"
          />

          <Text style={styles.unit}>
            g
          </Text>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={criar}
        >

          <Text style={styles.buttonText}>
            Criar agendamento
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.listHeader}>

        <Text style={styles.sectionTitle}>
          Horários cadastrados
        </Text>

        <Text style={styles.countText}>
          {lista.length} ativo(s)
        </Text>

      </View>

      <FlatList
        data={lista}
        scrollEnabled={false}
        keyExtractor={(item)=>
          item.id.toString()
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          lista.length === 0
            ? styles.emptyList
            : styles.listContent
        }
        ListEmptyComponent={

          <View style={styles.emptyCard}>

            <Ionicons
              name="calendar-outline"
              size={34}
              color="#7B3FA1"
            />

            <Text style={styles.emptyTitle}>
              Nenhum agendamento ainda
            </Text>

            <Text style={styles.emptyText}>
              Crie um horário para liberar ração automaticamente.
            </Text>

          </View>

        }
        renderItem={({item})=>(

          <View style={styles.scheduleCard}>

            <View style={styles.scheduleInfo}>

              <View style={styles.scheduleIconBox}>

                <Ionicons
                  name="time-outline"
                  size={22}
                  color="#7B3FA1"
                />

              </View>

              <View>

                <Text style={styles.hora}>
                  {item.hora.substring(0,5)}
                </Text>

                <Text style={styles.peso}>
                  {item.peso_desejado ?? item.peso ?? 0}g de ração
                </Text>

              </View>

            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={()=>remover(item.id)}
            >

              <Ionicons
                name="trash-outline"
                size={20}
                color="#E74C3C"
              />

            </TouchableOpacity>

          </View>

        )}

      />

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
    borderColor:"#E7D4EF",
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

  formCard:{
    backgroundColor:"#FFFFFF",
    padding:20,
    borderRadius:22,
    elevation:3,
    marginBottom:22,
  },

  sectionTitle:{
    fontSize:18,
    fontWeight:"bold",
    color:"#2E2E2E",
  },

  label:{
    fontSize:14,
    color:"#555",
    fontWeight:"600",
    marginTop:16,
    marginBottom:8,
  },

  inputContainer:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#F8F6FB",
    borderRadius:14,
    paddingHorizontal:14,
    borderWidth:1,
    borderColor:"#E7D4EF",
  },

  input:{
    flex:1,
    paddingVertical:14,
    paddingHorizontal:10,
    fontSize:16,
    color:"#2E2E2E",
    fontWeight:"600",
  },

  unit:{
    fontSize:15,
    color:"#777",
    fontWeight:"bold",
  },

  button:{
    backgroundColor:"#7B3FA1",
    padding:16,
    borderRadius:16,
    alignItems:"center",
    marginTop:20,
  },

  buttonText:{
    color:"#FFFFFF",
    fontWeight:"bold",
    fontSize:16,
  },

  listHeader:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:12,
  },

  countText:{
    fontSize:13,
    color:"#777",
    fontWeight:"600",
  },

  listContent:{
    paddingBottom:30,
  },

  scheduleCard:{
    backgroundColor:"#FFFFFF",
    padding:16,
    borderRadius:18,
    marginBottom:12,
    elevation:2,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },

  scheduleInfo:{
    flexDirection:"row",
    alignItems:"center",
    flex:1,
  },

  scheduleIconBox:{
    width:44,
    height:44,
    borderRadius:22,
    backgroundColor:"#F3E8F7",
    justifyContent:"center",
    alignItems:"center",
    marginRight:12,
  },

  hora:{
    fontSize:20,
    fontWeight:"bold",
    color:"#2E2E2E",
  },

  peso:{
    fontSize:13,
    color:"#666",
    marginTop:3,
  },

  deleteButton:{
    width:42,
    height:42,
    borderRadius:21,
    backgroundColor:"#FDEDEC",
    justifyContent:"center",
    alignItems:"center",
  },

  emptyList:{
    flexGrow:1,
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

  bottomSpace:{
    height:30,
  },

});