import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAuth } from "../../src/context/AuthContext";

export default function Perfil() {

  const {
    usuario,
    logout
  } = useAuth();

  async function handleLogout(){

    Alert.alert(
      "Sair",
      "Deseja sair da conta?",
      [
        {
          text:"Cancelar",
          style:"cancel"
        },
        {
          text:"Sair",
          style:"destructive",
          onPress: async ()=>{

            await logout();

            router.replace("/");

          }
        }
      ]
    );

  }

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>

        <View style={styles.avatarContainer}>

          <Ionicons
            name="person-outline"
            size={52}
            color="#7B3FA1"
          />

        </View>

        <Text style={styles.name}>
          {usuario?.nome ?? "Usuário"}
        </Text>

        <Text style={styles.email}>
          {usuario?.email ?? "Email não informado"}
        </Text>

      </View>

      <View style={styles.card}>

        <View style={styles.cardTop}>

          <View style={styles.iconBox}>

            <Ionicons
              name="paw-outline"
              size={24}
              color="#7B3FA1"
            />

          </View>

          <Text style={styles.cardTitle}>
            Informações do pet
          </Text>

        </View>

        <View style={styles.infoRow}>

          <Text style={styles.infoLabel}>
            Nome do pet
          </Text>

          <Text style={styles.infoValue}>
            {usuario?.nomePet ?? "Não informado"}
          </Text>

        </View>

      </View>

      <View style={styles.card}>

        <View style={styles.cardTop}>

          <View style={styles.iconBox}>

            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#7B3FA1"
            />

          </View>

          <Text style={styles.cardTitle}>
            Sobre
          </Text>

        </View>

        <Text style={styles.infoText}>
          O PetFeeder auxilia no controle da alimentação do pet por meio de
          automação, histórico de consumo e recomendação inteligente baseada nos
          dados registrados.
        </Text>

      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >

        <Ionicons
          name="log-out-outline"
          size={22}
          color="#fff"
        />

        <Text style={styles.logoutText}>
          Sair da conta
        </Text>

      </TouchableOpacity>

      <View style={styles.bottomSpace}/>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F8F6FB",
    padding:20,
  },

  header:{
    alignItems:"center",
    paddingTop:20,
    paddingBottom:28,
  },

  avatarContainer:{
    width:108,
    height:108,
    borderRadius:54,
    backgroundColor:"#F3E8F7",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:15,
  },

  name:{
    fontSize:28,
    fontWeight:"bold",
    color:"#2E2E2E",
    textAlign:"center",
  },

  email:{
    fontSize:14,
    color:"#777",
    marginTop:5,
    textAlign:"center",
  },

  card:{
    backgroundColor:"#FFFFFF",
    padding:20,
    borderRadius:22,
    marginBottom:16,
    elevation:2,
  },

  cardTop:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:16,
  },

  iconBox:{
    width:42,
    height:42,
    borderRadius:21,
    backgroundColor:"#F3E8F7",
    justifyContent:"center",
    alignItems:"center",
    marginRight:12,
  },

  cardTitle:{
    fontSize:18,
    fontWeight:"bold",
    color:"#2E2E2E",
  },

  infoRow:{
    backgroundColor:"#F8F6FB",
    borderRadius:16,
    padding:16,
  },

  infoLabel:{
    fontSize:13,
    color:"#777",
    fontWeight:"600",
    marginBottom:4,
  },

  infoValue:{
    fontSize:18,
    color:"#2E2E2E",
    fontWeight:"bold",
  },

  infoText:{
    fontSize:14,
    color:"#666",
    lineHeight:22,
  },

  logoutButton:{
    backgroundColor:"#7B3FA1",
    padding:18,
    borderRadius:18,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginTop:10,
  },

  logoutText:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16,
    marginLeft:10,
  },

  bottomSpace:{
    height:30,
  },

});