import React,
{
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import {
  getEstatisticas,
  getPesoAtual
} from "../services/dashboardService";

export default function DashboardScreen() {

  const [peso, setPeso] =
    useState(0);

  const [estatisticas, setEstatisticas] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function carregarDados() {

      try {

        const pesoAtual =
          await getPesoAtual();

        const dados =
          await getEstatisticas();

        setPeso(pesoAtual);

        setEstatisticas(dados);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    carregarDados();

  }, []);

  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator size="large" />

      </View>

    );

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Dashboard 🐶
      </Text>

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Peso Atual
        </Text>

        <Text style={styles.cardValue}>
          {peso} kg
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Estatísticas
        </Text>

        <Text>
          {JSON.stringify(estatisticas)}
        </Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardValue: {
    fontSize: 24,
    color: "#000000",
  },

});