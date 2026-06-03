import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha");

      return;
    }

    try {
      setLoading(true);

      await login(email, senha);

      router.replace("/(tabs)/dashboard");
    } catch (error) {
      Alert.alert("Erro", "Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="paw" size={55} color="#7B3FA1" />
        </View>

        <Text style={styles.title}>PetFeeder</Text>

        <Text style={styles.subtitle}>
          Controle inteligente para alimentação do seu pet
        </Text>
      </View>

      {/* CARD LOGIN */}

      <View style={styles.card}>
        {/* EMAIL */}

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
          />
        </View>

        {/* SENHA */}

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

        {/* BOTÃO */}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        {/* CRIAR CONTA */}

        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => router.push("/cadastro")}
        >
          <Text style={styles.createAccountText}>Criar nova conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F8F6FB",
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
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
  createAccount: {
    marginTop: 18,
    alignItems: "center",
  },

  createAccountText: {
    color: "#7B3FA1",
    fontWeight: "bold",
    fontSize: 15,
  },
});
