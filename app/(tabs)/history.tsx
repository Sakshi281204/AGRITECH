import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

type HistoryItem = {
  id: string;
  type: string;
  result: string;
  date: string;
};

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "history")
      );

      const data: HistoryItem[] = [];

      querySnapshot.forEach((document) => {
        const item: any = document.data();

        let formattedDate = "No Date";

        if (item.date) {
          if (
            typeof item.date === "object" &&
            item.date.seconds
          ) {
            formattedDate = new Date(
              item.date.seconds * 1000
            ).toLocaleString();
          } else {
            formattedDate = String(item.date);
          }
        }

        data.push({
          id: document.id,
          type: item.type || "AGRITECH",
          result: item.result || "माहिती उपलब्ध नाही",
          date: formattedDate,
        });
      });

      setHistory(data);
    } catch (error) {
      console.log("History Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const callKrushiAdhikari = () => {
    Linking.openURL("tel:18001801551");
  };

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.card}>
      <Text style={styles.type}>
        {item.type}
      </Text>

      <Text style={styles.result}>
        {item.result}
      </Text>

      <Text style={styles.date}>
        {item.date}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        📜 AGRITECH इतिहास
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2E7D32"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              अजून कोणताही इतिहास उपलब्ध नाही
            </Text>
          }
        />
      )}

      <TouchableOpacity
        style={styles.callButton}
        onPress={callKrushiAdhikari}
      >
        <Ionicons
          name="call"
          size={22}
          color="#fff"
        />

        <Text style={styles.callText}>
          कृषी अधिकारी यांना कॉल करा
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 15,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 3,
  },

  type: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  result: {
    fontSize: 15,
    color: "#333",
    marginTop: 8,
  },

  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
  },

  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 16,
    color: "#777",
  },

  callButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  callText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});