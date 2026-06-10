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

import { auth, db } from "../../config/firebase";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

type HistoryItem = {
  id: string;
  type: string;
  result: string;
  date: string;
  timestamp: number;
};

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  

  const loadHistory = async () => {
    try {
      const uid = auth.currentUser?.uid;

      console.log("History Screen UID:", uid);

      if (!uid) {
        setLoading(false);
        return;
      }
      const allHistory: HistoryItem[] = [];

      // CROP HISTORY
      const cropSnapshot = await getDocs(
        query(
          collection(db, "users", uid, "cropHistory"),
          orderBy("createdAt", "desc")
        )
      );
console.log("Crop History Count:", cropSnapshot.size);
      cropSnapshot.forEach((doc) => {
        const item: any = doc.data();

        const timestamp = item.createdAt?.seconds
          ? item.createdAt.seconds * 1000
          : 0;

        allHistory.push({
          id: doc.id,

          type: "🌾 पीक शिफारस",

          result: `पीक: ${item.crop}
गाव: ${item.village}
माती: ${item.soil}
हंगाम: ${item.season}`,

          date: timestamp
            ? new Date(timestamp).toLocaleString()
            : "दिनांक उपलब्ध नाही",

          timestamp,
        });
      });

      // DISEASE HISTORY
      const diseaseSnapshot = await getDocs(
        query(
          collection(db, "users", uid, "diseaseHistory"),
          orderBy("createdAt", "desc")
        )
      );

      diseaseSnapshot.forEach((doc) => {
        const item: any = doc.data();

        const timestamp = item.createdAt?.seconds
          ? item.createdAt.seconds * 1000
          : 0;

        allHistory.push({
          id: doc.id,

          type: "🦠 रोग ओळख",

          result: `पीक: ${item.crop}
रोग: ${item.disease}
विश्वास: ${item.confidence}%`,

          date: timestamp
            ? new Date(timestamp).toLocaleString()
            : "दिनांक उपलब्ध नाही",

          timestamp,
        });
      });

      // SORT LATEST FIRST
      allHistory.sort(
        (a, b) => b.timestamp - a.timestamp
      );

      setHistory(allHistory);
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
      <Text style={styles.type}>{item.type}</Text>

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