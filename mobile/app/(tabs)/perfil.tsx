import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Perfil() {

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <View style={styles.avatarContainer}>

          <Ionicons
            name="person"
            size={55}
            color="#7B3FA1"
          />

        </View>

        <Text style={styles.name}>
          Usuário
        </Text>

        <Text style={styles.email}>
          usuario@email.com
        </Text>

      </View>

      {/* CARD PET */}

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
            Meu Pet
          </Text>

        </View>

        <Text style={styles.infoText}>
          Nome do pet: Thor
        </Text>

        <Text style={styles.infoText}>
          Alimentação monitorada automaticamente pelo SmartFeeder.
        </Text>

      </View>

      {/* SOBRE */}

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
            Sobre o App
          </Text>

        </View>

        <Text style={styles.infoText}>
          SmartFeeder é um sistema inteligente de alimentação automática para pets,
          utilizando IoT e recomendação inteligente de consumo.
        </Text>

      </View>

      {/* BOTÃO */}

      <TouchableOpacity style={styles.logoutButton}>

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
    paddingBottom:30,
  },

  avatarContainer:{
    width:110,
    height:110,
    borderRadius:55,
    backgroundColor:"#F3E8F7",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:15,
  },

  name:{
    fontSize:28,
    fontWeight:"bold",
    color:"#2E2E2E",
  },

  email:{
    fontSize:14,
    color:"#777",
    marginTop:5,
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

  infoText:{
    fontSize:14,
    color:"#666",
    lineHeight:22,
    marginBottom:10,
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