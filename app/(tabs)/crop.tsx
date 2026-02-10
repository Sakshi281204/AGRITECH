import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* ---------- TYPES ---------- */
type District = "Nashik" | "Jalgaon" | "Dhule";
type Season = "Kharip" | "Rabbi" | "Year";

/* ---------- DATA ---------- */
const districtData = {
  Nashik: {
    Dindori: ["Vani", "Palkhed", "Janori"],
    Igatpuri: ["Ghoti", "Trimbak"],
  },
  Jalgaon: {
    Jalgaon: ["Savda", "Asoda"],
    Pachora: ["Bhadli", "Anturli"],
  },
  Dhule: {
    Dhule: ["Khede", "Kapadane"],
    Sakri: ["Dondaicha", "Zirne"],
  },
} as const;

/* ---------- SCREEN ---------- */
export default function CropScreen() {
  const [district, setDistrict] = useState<District>("Nashik");
  const [taluka, setTaluka] = useState("Dindori");
  const [village, setVillage] = useState("");
  const [season, setSeason] = useState<Season>("Kharip");
  const [areaAcre, setAreaAcre] = useState<number>(1);
  const [water, setWater] = useState("पाऊस");
  const [soil, setSoil] = useState("मध्यम");
  const [showResult, setShowResult] = useState(false);

  const talukas = Object.keys(districtData[district]);
  const villages: string[] =
    districtData[district][
      taluka as keyof (typeof districtData)[typeof district]
    ] || [];

  return (
    <ScrollView style={styles.container}>
      {/* ---------- HEADER ---------- */}
      <Text style={styles.header}>
        🌱 आपल्या शेतासाठी योग्य पीक शोधा
      </Text>

      {/* ---------- PICKERS ---------- */}
      <Text style={styles.label}>🏞 जिल्हा</Text>
      <Picker selectedValue={district} onValueChange={(v: District) => {
        setDistrict(v);
        setTaluka(Object.keys(districtData[v])[0]);
        setVillage("");
      }}>
        {Object.keys(districtData).map(d => (
          <Picker.Item key={d} label={d} value={d} />
        ))}
      </Picker>

      <Text style={styles.label}>🏘 तालुका</Text>
      <Picker selectedValue={taluka} onValueChange={setTaluka}>
        {talukas.map(t => (
          <Picker.Item key={t} label={t} value={t} />
        ))}
      </Picker>

      <Text style={styles.label}>🏡 गाव</Text>
      <Picker selectedValue={village} onValueChange={setVillage}>
        <Picker.Item label="गाव निवडा" value="" />
        {villages.map(v => (
          <Picker.Item key={v} label={v} value={v} />
        ))}
      </Picker>

      <Text style={styles.label}>🌦 हंगाम</Text>
      <Picker selectedValue={season} onValueChange={setSeason}>
        <Picker.Item label="खरीप" value="Kharip" />
        <Picker.Item label="रब्बी" value="Rabbi" />
        <Picker.Item label="पूर्ण वर्ष" value="Year" />
      </Picker>

      {/* ---------- AREA ---------- */}
      {/* शेती क्षेत्र (एकर) */}

      <Text style={styles.label}>शेती क्षेत्र: {areaAcre} एकर</Text>
      <Slider
        minimumValue={0.5}
        maximumValue={25}
        step={0.5}
        value={areaAcre}
        onValueChange={(value: number) => setAreaAcre(value)}
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#2E7D32"
        />


      {/* ---------- WATER ---------- */}
      <Text style={styles.label}>💧 पाण्याचा स्रोत</Text>
      {["पाऊस", "विहीर", "कालवा", "ठिबक"].map(w => (
        <TouchableOpacity key={w} onPress={() => setWater(w)}>
          <Text style={water === w ? styles.selected : styles.option}>
            {water === w ? "🔘" : "⚪"} {w}
          </Text>
        </TouchableOpacity>
      ))}

      {/* ---------- SOIL ---------- */}
      <Text style={styles.label}>🌍 मातीचा प्रकार</Text>
      <View style={styles.soilRow}>
        {["काळी", "मध्यम", "हलकी"].map(s => (
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

      {/* ---------- BUTTON ---------- */}
      <TouchableOpacity
        style={styles.mainBtn}
        onPress={() => setShowResult(true)}
      >
        <Text style={styles.mainBtnText}>🌾 पीक शोधा</Text>
      </TouchableOpacity>

      {/* ---------- RESULT CARD ---------- */}
      {showResult && (
        <View style={styles.card}>
          <Text style={styles.cropName}>🍌 केळी (Banana)</Text>
          <Text>⭐⭐⭐⭐☆ (उत्पन्न जास्त)</Text>
          <Text>✔ ठिबक सिंचनासाठी योग्य</Text>
          <Text>✔ चांगला बाजार भाव</Text>
          <Text>✔ माती: मध्यम</Text>
          <Text style={styles.income}>
            अपेक्षित उत्पन्न: ₹2.5 – 3 लाख / एकर
          </Text>

          <TouchableOpacity style={styles.detailsBtn}>
            <Text style={{ color: "#2E7D32" }}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F4FFF4" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 25,
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
    padding: 16,
    borderRadius: 12,
    marginTop: 25,
  },
  mainBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 25,
    elevation: 4,
  },
  cropName: { fontSize: 20, fontWeight: "bold" },
  income: { marginTop: 10, fontWeight: "600" },
  detailsBtn: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
});
