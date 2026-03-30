import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type QueryItem = {
  id: string;
  question: string;
  date: string;
  time: string;
};

export default function History() {
  const [queries] = useState<QueryItem[]>([
    {
      id: "1",
      question: "कापूस पिकावर गुलाबी बोंडअळी कशी नियंत्रणात आणावी?",
      date: "10 Feb 2026",
      time: "10:45 AM",
    },
    {
      id: "2",
      question: "गव्हासाठी योग्य खताचे प्रमाण किती असावे?",
      date: "09 Feb 2026",
      time: "04:20 PM",
    },
    {
      id: "3",
      question: "ड्रिप सिंचनासाठी अनुदान योजना माहिती",
      date: "08 Feb 2026",
      time: "01:10 PM",
    },
  ]);

  const callKrushiAdhikari = () => {
    Linking.openURL("tel:9876543210");
  };

  const renderItem = ({ item }: { item: QueryItem }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name="help-circle-outline" size={22} color="#2E7D32" />
        <Text style={styles.question}>{item.question}</Text>
      </View>

      <View style={styles.dateRow}>
        <Ionicons name="calendar-outline" size={16} color="#555" />
        <Text style={styles.dateText}>
          {item.date} | {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.header}>📜 शेतकरी प्रश्न इतिहास</Text>

      <FlatList
        data={queries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.callButton} onPress={callKrushiAdhikari}>
        <Ionicons name="call" size={22} color="#fff" />
        <Text style={styles.callText}>कृषी अधिकारी यांना कॉल करा</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 10,   // extra spacing
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  question: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  dateText: {
    marginLeft: 5,
    fontSize: 13,
    color: "#666",
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
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
