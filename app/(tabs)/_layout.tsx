
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1b5e20",
        tabBarInactiveTintColor: "#6d6d6d",
        tabBarStyle: {
          backgroundColor: "#f1f8e9",
          height: Platform.OS === "ios" ? 85 : 65,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopWidth: 0.5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="crop"
        options={{
          title: "पीक",
          tabBarIcon: ({ color }) => (
            <Ionicons name="leaf" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="disease"
        options={{
          title: "रोग",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bug-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="weather"
        options={{
          title: "हवामान",
          tabBarIcon: ({ color }) => (
            <Ionicons name="partly-sunny" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="mandi"
        options={{
          title: "मंडी",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash-outline" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cropguide"
        options={{
          title: "मार्गदर्शक",
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "इतिहास",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "प्रोफाइल",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
