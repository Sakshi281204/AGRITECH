import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function TestBackend() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(
          "https://devoted-spontaneity-production.up.railway.app/docs"
        );

        console.log("STATUS:", response.status);

        if (response.ok) {
          console.log("Backend is reachable ✅");
        }
      } catch (error) {
        console.log("CONNECTION ERROR ❌:", error);
      }
    };

    testConnection();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Checking backend connection...</Text>
    </View>
  );
}