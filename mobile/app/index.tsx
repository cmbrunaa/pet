import { Redirect } from "expo-router";
import { useAuth } from "../src/context/AuthContext";

import {
  View,
  ActivityIndicator
} from "react-native";

export default function Index() {

  const {
    userToken,
    loading
  } = useAuth();

  if (loading) {

    return (

      <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}>

        <ActivityIndicator size="large" />

      </View>

    );

  }

  if (userToken) {

    return <Redirect href="/(tabs)/dashboard" />;

  }

  return <Redirect href="/login" />;

}