import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {

  return (

    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },

        headerTintColor: "#fff",

        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#111",
        },

        tabBarActiveTintColor: "#fff",

        tabBarInactiveTintColor: "#555",
      }}
    >

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name="grid-outline"
              size={size}
              color={color}
            />

          ),

        }}
      />

      <Tabs.Screen
        name="alimentar"
        options={{
          title: "Alimentar",

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name="restaurant-outline"
              size={size}
              color={color}
            />

          ),

        }}
      />

      <Tabs.Screen
        name="agendamentos"
        options={{
          title: "Agendar",

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name="calendar-outline"
              size={size}
              color={color}
            />

          ),

        }}
      />

      <Tabs.Screen
        name="historico"
        options={{
          title: "Histórico",

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name="time-outline"
              size={size}
              color={color}
            />

          ),

        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />

          ),

        }}
      />

    </Tabs>

  );

}