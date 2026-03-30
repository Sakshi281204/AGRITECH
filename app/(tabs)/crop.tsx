import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import cropData from "C:\\Users\\asus\\project\\agritech\\data\\cropdata.json";

export default function CropScreen() {
  const [selectedTaluka, setSelectedTaluka] = useState<any>(null);
  const [villages, setVillages] = useState<any[]>([]);
  const [village, setVillage] = useState("");

  const [season, setSeason] = useState("Kharif");
  const [areaAcre, setAreaAcre] = useState(1);
  const [water, setWater] = useState("पाऊस");
  const [soil, setSoil] = useState("मध्यम");

  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const fetchCrops = async () => {
    setLoading(true);
    setShowResult(false);

    try {
      const bodyData = {
        season: season.toLowerCase(),
        soil: soil,
        water: water,
        land: areaAcre,
        taluka: selectedTaluka?.taluka_name_en,
      };

      console.log("Sending:", bodyData);

      const response = await fetch(
        "http://192.168.31.252:8000/api/crops/recommend", // 🔁 CHANGE IP
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();

      console.log("Response:", data);

      setResult(data);
      setShowResult(true);
    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>
          🌱 आपल्या शेतासाठी योग्य पीक शोधा
        </Text>

        {/* TALUKA */}
        <Text style={styles.label}>📍 तालुका</Text>
        <Picker
          selectedValue={selectedTaluka}
          onValueChange={(value) => {
            setSelectedTaluka(value);
            setVillages(value?.villages || []);
          }}
        >
          <Picker.Item label="तालुका निवडा" value={null} />
          {cropData.talukas.map((t: any, index: number) => (
            <Picker.Item
              key={index}
              label={t.taluka_name_mr}
              value={t}
            />
          ))}
        </Picker>

        {/* VILLAGE */}
        <Text style={styles.label}>🏡 गाव</Text>
        <Picker selectedValue={village} onValueChange={setVillage}>
          <Picker.Item label="गाव निवडा" value="" />
          {villages.map((v: any, index: number) => (
            <Picker.Item
              key={index}
              label={v.village_name_mr}
              value={v.village_name_en}
            />
          ))}
        </Picker>

        {/* SEASON */}
        <Text style={styles.label}>🌦 हंगाम</Text>
        <Picker selectedValue={season} onValueChange={setSeason}>
          <Picker.Item label="खरीप" value="Kharif" />
          <Picker.Item label="रब्बी" value="Rabbi" />
        </Picker>

        {/* AREA */}
        <Text style={styles.label}>
          📏 शेती क्षेत्र: {areaAcre} एकर
        </Text>
        <Slider
          minimumValue={0.5}
          maximumValue={25}
          step={0.5}
          value={areaAcre}
          onValueChange={(value: number) => setAreaAcre(value)}
        />

        {/* WATER */}
        <Text style={styles.label}>💧 पाणी</Text>
        {["पाऊस", "विहीर", "कालवा", "ठिबक"].map((w) => (
          <TouchableOpacity key={w} onPress={() => setWater(w)}>
            <Text style={water === w ? styles.selected : styles.option}>
              {water === w ? "🔘" : "⚪"} {w}
            </Text>
          </TouchableOpacity>
        ))}

        {/* SOIL */}
        <Text style={styles.label}>🌍 माती</Text>
        <View style={styles.soilRow}>
          {["काळी", "मध्यम", "हलकी"].map((s) => (
            <TouchableOpacity
              key={s}
              style={[
                styles.soilBtn,
                soil === s && styles.soilSelected,
              ]}
              onPress={() => setSoil(s)}
            >
              <Text>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.mainBtn} onPress={fetchCrops}>
          <Text style={styles.mainBtnText}>🌾 पीक शोधा</Text>
        </TouchableOpacity>

        {/* LOADING */}
        {loading && <ActivityIndicator size="large" color="green" />}

        {/* RESULT */}
        {showResult && result.length > 0 && (
          <View style={styles.card}>
            {result.map((item, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={styles.cropName}>
                  🌾 {item.crop} ({item.marathi})
                </Text>
                <Text>📍 तालुका: {item.taluka}</Text>
                <Text>🏡 गाव: {item.village}</Text>
                <Text>🌦 Season: {item.season}</Text>
                <Text>🌍 Soil: {item.soil.join(", ")}</Text>
                <Text>💧 Water: {item.water.join(", ")}</Text>
                <Text>📏 Min Land: {item.min_land} acres</Text>
              </View>
            ))}
          </View>
        )}

        {showResult && result.length === 0 && (
          <Text style={{ marginTop: 20 }}>
            ❌ योग्य पीक सापडले नाही
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F4FFF4" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#2E7D32",
  },
  label: { fontSize: 16, marginTop: 15, fontWeight: "600" },
  option: { fontSize: 16, marginVertical: 4 },
  selected: { fontSize: 16, marginVertical: 4, color: "#2E7D32" },
  soilRow: { flexDirection: "row", marginTop: 8 },
  soilBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
  soilSelected: { backgroundColor: "#C8E6C9" },
  mainBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  mainBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  cropName: { fontSize: 18, fontWeight: "bold" },
});