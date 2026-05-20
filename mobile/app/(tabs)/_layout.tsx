import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#e6f3f2",
        },

        headerTintColor: "#fff",

        tabBarStyle: {
          backgroundColor: "#ab81b6",
          borderTopColor: "#4f404024",
          borderTopWidth: 2,
          borderTopEndRadius: 12,
          borderTopLeftRadius: 12,
        },

        tabBarActiveTintColor: "#fff",

        tabBarInactiveTintColor: "#555",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/logo_pet_feeder.png")}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  marginRight: 10,
                }}
              />

              <Text
                style={{
                  color: "#E2A9F1",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                SmartFeeder
              </Text>
            </View>
          ),

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="alimentar"
        options={{
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/logo_pet_feeder.png")}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  marginRight: 10,
                }}
              />

              <Text
                style={{
                  color: "#E2A9F1",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                SmartFeeder
              </Text>
            </View>
          ),

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="agendamentos"
        options={{
          title: "Agendar",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/logo_pet_feeder.png")}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  marginRight: 10,
                }}
              />

              <Text
                style={{
                  color: "#E2A9F1",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                SmartFeeder
              </Text>
            </View>
          ),

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="historico"
        options={{
          title: "Histórico",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/logo_pet_feeder.png")}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  marginRight: 10,
                }}
              />

              <Text
                style={{
                  color: "#E2A9F1",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                SmartFeeder
              </Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",

          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/logo_pet_feeder.png")}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  marginRight: 10,
                }}
              />

              <Text
                style={{
                  color: "#E2A9F1",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                SmartFeeder
              </Text>
            </View>
          ),

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
