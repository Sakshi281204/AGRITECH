import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

type MandiItem = {
  id: string;
  taluka: string;
  crop: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  updated_at: string;
};

export default function MandiScreen() {
  const [taluka, setTaluka] = useState("Niphad");
  const [crop, setCrop] = useState("Onion");
  const [data, setData] = useState<MandiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setData([
        {
          id: "1",
          taluka: "Niphad",
          crop: "Onion",
          min_price: 1200,
          max_price: 1500,
          modal_price: 1350,
          updated_at: "26 Feb 2026, 4:30 PM",
        },
        {
          id: "2",
          taluka: "Sinnar",
          crop: "Tomato",
          min_price: 900,
          max_price: 1300,
          modal_price: 1100,
          updated_at: "26 Feb 2026, 4:10 PM",
        },
        {
          id: "3",
          taluka: "Yeola",
          crop: "Grapes",
          min_price: 2000,
          max_price: 2500,
          modal_price: 2300,
          updated_at: "26 Feb 2026, 3:50 PM",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filtered = data.filter(
    (item) => item.taluka === taluka && item.crop === crop
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <Text style={styles.title}>📊 नाशिक बाजारभाव</Text>

        <Text style={styles.label}>तालुका निवडा</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={taluka}
            onValueChange={(value) => setTaluka(value)}
          >
            <Picker.Item label="निफाड" value="Niphad" />
            <Picker.Item label="सिन्नर" value="Sinnar" />
            <Picker.Item label="येवला" value="Yeola" />
          </Picker>
        </View>

        <Text style={styles.label}>पीक निवडा</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={crop}
            onValueChange={(value) => setCrop(value)}
          >
            <Picker.Item label="कांदा" value="Onion" />
            <Picker.Item label="टोमॅटो" value="Tomato" />
            <Picker.Item label="द्राक्ष" value="Grapes" />
          </Picker>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <Text style={styles.empty}>
                निवडलेल्या पिकासाठी डेटा उपलब्ध नाही
              </Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.crop}>
                  {crop === "Onion"
                    ? "कांदा"
                    : crop === "Tomato"
                    ? "टोमॅटो"
                    : "द्राक्ष"}
                </Text>
                <Text>किमान भाव: ₹{item.min_price}</Text>
                <Text>कमाल भाव: ₹{item.max_price}</Text>
                <Text style={styles.modal}>
                  सरासरी भाव: ₹{item.modal_price}
                </Text>
                <Text style={styles.time}>
                  शेवटचा अपडेट: {item.updated_at}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5FFF5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2E7D32",
    marginBottom: 15,
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
  },
  pickerContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  crop: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modal: {
    marginTop: 5,
    fontWeight: "bold",
  },
  time: {
    marginTop: 5,
    fontSize: 12,
    color: "gray",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
  },
});