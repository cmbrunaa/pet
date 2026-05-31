import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../src/services/api";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomePet, setNomePet] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCadastro() {
    if (!nome || !email || !senha || !nomePet) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/usuarios", {
        nome,
        email,
        senha,
        nomePet,
      });

      Alert.alert("Sucesso", "Conta criada com sucesso!");

      router.replace("/");

    } catch (error: any) {
      Alert.alert(
        "Erro",
        error?.response?.data?.erro || "Falha ao criar conta"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="paw"
            size={55}
            color="#7B3FA1"
          />
        </View>

        <Text style={styles.title}>Criar conta</Text>

        <Text style={styles.subtitle}>
          Cadastre-se para controlar a alimentação do seu pet
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="account-outline"
            size={22}
            color="#7B3FA1"
            style={styles.inputIcon}
          />

          <TextInput
            placeholder="Seu nome"
            placeholderTextColor="#999"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color="#7B3FA1"
            style={styles.inputIcon}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={22}
            color="#7B3FA1"
            style={styles.inputIcon}
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="dog"
            size={22}
            color="#7B3FA1"
            style={styles.inputIcon}
          />

          <TextInput
            placeholder="Nome do pet"
            placeholderTextColor="#999"
            style={styles.input}
            value={nomePet}
            onChangeText={setNomePet}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleCadastro}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.loginText}>
            Já tenho conta
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F6FB",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  header: {
    alignItems: "center",
    marginBottom: 35,
  },

  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EFE3F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E2E2E",
  },

  subtitle: {
    marginTop: 10,
    color: "#666",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    elevation: 4,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F3F7",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 18,
    height: 58,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#2E2E2E",
  },

  button: {
    backgroundColor: "#7B3FA1",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginLink: {
    marginTop: 18,
    alignItems: "center",
  },

  loginText: {
    color: "#7B3FA1",
    fontWeight: "bold",
  },
});