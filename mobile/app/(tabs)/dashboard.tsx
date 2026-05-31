import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import {
  getEstatisticas,
  getPesoAtual,
} from "../../src/services/dashboardService";

import { getRecomendacaoIA } from "../../src/services/iaService";

import { liberarRacao } from "../../src/services/alimentadorService";

export default function Dashboard() {
  const [estatisticas, setEstatisticas] = useState<any>(null);

  const [peso, setPeso] = useState<number>(0);

  const [ia, setIa] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const stats = await getEstatisticas();

      const pesoAtual = await getPesoAtual();

      const recomendacaoIA = await getRecomendacaoIA();

      setEstatisticas(stats);
      setPeso(pesoAtual);
      setIa(recomendacaoIA);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function atualizar() {
    setRefreshing(true);

    await carregarDados();

    setRefreshing(false);
  }

  function obterStatusPeso() {
    if (peso <= 0) {
      return {
        texto: "Sem ração",
        cor: "#E74C3C",
        icon: "close-circle-outline" as const,
      };
    }

    if (peso <= 100) {
      return {
        texto: "Baixo",
        cor: "#F39C12",
        icon: "alert-circle-outline" as const,
      };
    }

    if (peso >= 300) {
      return {
        texto: "Cheio",
        cor: "#5DADE2",
        icon: "checkmark-circle-outline" as const,
      };
    }

    return {
      texto: "Normal",
      cor: "#2ECC71",
      icon: "checkmark-done-circle-outline" as const,
    };
  }

  async function alimentarComIA() {
    try {
      if (!ia?.recomendacao) {
        Alert.alert("Aviso", "Sem recomendação disponível");

        return;
      }

      await liberarRacao(ia.recomendacao);

      Alert.alert("Sucesso", `Alimentado com ${ia.recomendacao}g`);

      carregarDados();
    } catch (error) {
      Alert.alert("Erro", "Falha ao alimentar");
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7B3FA1" />
      </View>
    );
  }

  const status = obterStatusPeso();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={atualizar} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.appTitle}>Dashboard</Text>

        <Text style={styles.appSubtitle}>
          Acompanhe o consumo e o status do alimentador
        </Text>
      </View>

      <View
        style={[
          styles.statusBox,
          {
            backgroundColor: status.cor,
          },
        ]}
      >
        <View style={styles.statusContent}>
          <Ionicons name={status.icon} size={23} color="#fff" />

          <Text style={styles.statusText}>Status: {status.texto}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="scale-outline" size={20} color="#7B3FA1" />

            <Text style={styles.cardTitle}>Peso atual</Text>
          </View>

          <Text style={styles.value}>{peso} g</Text>

          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.min((peso / 500) * 100, 100)}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="analytics-outline" size={20} color="#7B3FA1" />

            <Text style={styles.cardTitle}>Média diária</Text>
          </View>

          <Text style={styles.value}>{estatisticas?.mediaDiaria ?? 0} g</Text>

          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.min(
                    ((estatisticas?.mediaDiaria ?? 0) / 500) * 100,
                    100,
                  )}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.cardFull}>
        <View style={styles.cardHeader}>
          <Ionicons name="bar-chart-outline" size={20} color="#7B3FA1" />

          <Text style={styles.cardTitle}>Consumo total</Text>
        </View>

        <Text style={styles.value}>{estatisticas?.totalConsumido ?? 0} g</Text>

        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${Math.min(
                  ((estatisticas?.totalConsumido ?? 0) / 2000) * 100,
                  100,
                )}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.cardAlert}>
        <View style={styles.cardHeader}>
          <Ionicons name="alert-circle-outline" size={20} color="#F39C12" />

          <Text style={styles.cardTitle}>Consumo</Text>
        </View>

        <Text style={styles.alertText}>
          {estatisticas?.alertaConsumo ?? "Normal"}
        </Text>
      </View>

      <View style={styles.cardIA}>
        <View style={styles.cardHeader}>
          <Ionicons name="sparkles-outline" size={22} color="#7B3FA1" />

          <Text style={styles.cardTitleIA}>Análise Inteligente</Text>
        </View>

        <Text style={styles.iaDescription}>
          {ia?.mensagem ??
            "Análise baseada no histórico de consumo registrado pelo sistema."}
        </Text>

        <View style={styles.iaBox}>
          <Text style={styles.iaLabel}>Consumo médio diário</Text>

          <Text style={styles.iaText}>{ia?.mediaDiaria ?? 0}g</Text>
        </View>

        <View style={styles.iaBox}>
          <Text style={styles.iaLabel}>Padrão identificado</Text>

          <Text style={styles.iaText}>{ia?.padrao ?? "Indisponível"}</Text>
        </View>

        <Text style={styles.recommendationLabel}>
          Recomendação por alimentação
        </Text>

        <Text style={styles.valueIA}>{ia?.recomendacao ?? 0} g</Text>

        <TouchableOpacity style={styles.buttonIA} onPress={alimentarComIA}>
          <Text style={styles.buttonText}>Liberar recomendação</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F6FB",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F6FB",
  },

  header: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 20,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E2E2E",
  },

  appSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
    lineHeight: 20,
  },

  statusBox: {
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "center",
    elevation: 2,
  },

  statusContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  statusText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 2,
  },

  cardFull: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 2,
  },

  cardAlert: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#F39C12",
  },

  cardIA: {
    backgroundColor: "#F3E8F7",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E7D4EF",
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },

  cardTitleIA: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2E2E2E",
  },

  value: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 6,
    color: "#2E2E2E",
  },

  alertText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 6,
    color: "#2E2E2E",
  },

  iaDescription: {
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },

  valueIA: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#2E2E2E",
    marginTop: 18,
  },

  buttonIA: {
    backgroundColor: "#7B3FA1",
    padding: 15,
    borderRadius: 14,
    marginTop: 18,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
  },

  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#EEE",
    borderRadius: 20,
    marginTop: 12,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#7B3FA1",
    borderRadius: 20,
  },
  iaBox: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 14,
    marginTop: 10,
  },

  iaLabel: {
    fontSize: 12,
    color: "#777",
    fontWeight: "600",
  },

  iaText: {
    fontSize: 15,
    color: "#2E2E2E",
    fontWeight: "bold",
    marginTop: 3,
  },

  recommendationLabel: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
    marginTop: 18,
  },
  bottomSpace: {
    height: 30,
  },
});
