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

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] =
    useState(false);

  const { login } = useAuth();

  async function handleLogin() {

    if (!email || !senha) {

      Alert.alert(
        "Erro",
        "Preencha email e senha"
      );

      return;

    }

    try {

      setLoading(true);

      await login(email, senha);

      Alert.alert(
        "Sucesso",
        "Login realizado!"
      );

    } catch (error) {

      Alert.alert(
        "Erro",
        "Email ou senha inválidos"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        🐶 Pet Feeder
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >

        {loading ? (

          <ActivityIndicator
            color="#fff"
          />

        ) : (

          <Text style={styles.buttonText}>
            Entrar
          </Text>

        )}

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#ee131e",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

});