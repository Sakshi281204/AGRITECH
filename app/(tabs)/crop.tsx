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

/* ---------- TALUKA DATA (Only Nashik District) ---------- */
const talukaData = {
  Dindori: ["Vani", "Palkhed", "Janori", "Ozar", "Khedgaon"],
  Niphad: ["Pimpalgaon", "Saykheda", "Lasalgaon", "Chandori", "Kasbe Sukene"],
  Sinnar: ["Dubere", "Pangri", "Gonde", "Deshvandi", "Khambale"],
  Yeola: ["Andarsul", "Nagarsul", "Mukhed", "Patoda", "Kotamgaon"],
  Kalwan: ["Abhona", "Dalwat", "Oture", "Bharam", "Deola"],
  Baglan: ["Satana Rural", "Taharabad", "Mulher", "Nitane", "Ajmir"],
  Malegaon: ["Chandanpuri", "Dabhadi", "Pimpalner", "Vadner", "Karanjali"],
  Chandwad: ["Vadner Bhairav", "Harsul", "Pathare", "Dugaon", "Raipur"],
  Surgana: ["Borgaon", "Umbarpada", "Pimpalsond", "Karanjali", "Rohile"],
  Trimbakeshwar: ["Anjaneri", "Khambale", "Brahmagiri", "Pegalgav", "Talwade"],
  Deola: ["Ravalgaon", "Umarane", "Khuntewadi", "Wadali", "Pimpalkhute"],
  Igatpuri: ["Ghoti Rural", "Take Harsha", "Waki", "Ashwin Nagar", "Mundhegaon"],
  Peint: ["Shevge", "Peth", "Gondegaon", "Shirwade", "Karanjali"],
  Nashik: ["Makhmalabad", "Gangapur", "Belgaon", "Vilholi", "Jakhori"],
  Nandgaon: ["Hiswal", "Astagaon", "Khadakmalegaon", "Kothure", "Sakore"],
};

type Season = "Kharip" | "Rabbi" | "Year";

/* ---------- SCREEN ---------- */
export default function CropScreen() {
  const [taluka, setTaluka] = useState("Dindori");
  const [village, setVillage] = useState("");
  const [season, setSeason] = useState<Season>("Kharip");
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [areaAcre, setAreaAcre] = useState<number>(1);
  const [water, setWater] = useState("पाऊस");
  const [soil, setSoil] = useState("मध्यम");
  const [showResult, setShowResult] = useState(false);

  const talukas = Object.keys(talukaData);
  const villages =
    talukaData[taluka as keyof typeof talukaData] || [];

  return (
    <ScrollView style={styles.container}>
      {/* ---------- HEADER ---------- */}
      <Text style={styles.header}>
        🌱 आपल्या शेतासाठी योग्य पीक शोधा
      </Text>

      {/* ---------- TALUKA ---------- */}
      <Text style={styles.label}>
        📍 नाशिक जिल्ह्यामधील तालुके
      </Text>
      <Picker
        selectedValue={taluka}
        onValueChange={(value) => {
          setTaluka(value);
          setVillage("");
        }}
      >
        {talukas.map((t) => (
          <Picker.Item key={t} label={t} value={t} />
        ))}
      </Picker>

      {/* ---------- VILLAGE ---------- */}
      <Text style={styles.label}>🏡 गाव</Text>
      <Picker selectedValue={village} onValueChange={setVillage}>
        <Picker.Item label="गाव निवडा" value="" />
        {villages.map((v) => (
          <Picker.Item key={v} label={v} value={v} />
        ))}
      </Picker>

      {/* ---------- SEASON ---------- */}
      <Text style={styles.label}>🌦 हंगाम</Text>
      <Picker selectedValue={season} onValueChange={setSeason}>
        <Picker.Item label="खरीप" value="Kharip" />
        <Picker.Item label="रब्बी" value="Rabbi" />
        <Picker.Item label="पूर्ण वर्ष" value="Year" />
      </Picker>

      {/* ---------- AREA ---------- */}
      <Text style={styles.label}>
        शेती क्षेत्र: {areaAcre} एकर
      </Text>
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
      {["पाऊस", "विहीर", "कालवा", "ठिबक"].map((w) => (
        <TouchableOpacity key={w} onPress={() => setWater(w)}>
          <Text style={water === w ? styles.selected : styles.option}>
            {water === w ? "🔘" : "⚪"} {w}
          </Text>
        </TouchableOpacity>
      ))}

      {/* ---------- SOIL ---------- */}
      <Text style={styles.label}>🌍 मातीचा प्रकार</Text>
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

      {/* ---------- BUTTON ---------- */}
      <TouchableOpacity
        style={styles.mainBtn}
        onPress={() => {
          setSelectedSeason(season);
          setShowResult(true);
        }}
      >
        <Text style={styles.mainBtnText}>
          🌾 पीक शोधा
        </Text>
      </TouchableOpacity>

      {/* ---------- RESULT ---------- */}
      {showResult && selectedSeason && (
        <View style={styles.card}>
          {selectedSeason === "Kharip" && (
            <>
              <Text style={styles.cropName}>🧅 कांदा (Onion)</Text>
              <Text>⭐⭐⭐⭐☆</Text>
              <Text>✔ मध्यम माती योग्य</Text>
              <Text>✔ पाऊस + ठिबक सिंचन योग्य</Text>
              <Text>✔ रोग: पांढरी बुरशी, थ्रिप्स</Text>
              <Text style={styles.income}>
                अपेक्षित उत्पन्न: ₹1.5 – 2 लाख / एकर
              </Text>
            </>
          )}

          {selectedSeason === "Rabbi" && (
            <>
              <Text style={styles.cropName}>🍅 टोमॅटो (Tomato)</Text>
              <Text>⭐⭐⭐⭐☆</Text>
              <Text>✔ ठिबक सिंचन उत्तम</Text>
              <Text>✔ रोग: लीफ कर्ल, ब्लाइट</Text>
              <Text>✔ नियमित फवारणी आवश्यक</Text>
              <Text style={styles.income}>
                अपेक्षित उत्पन्न: ₹2 – 3 लाख / एकर
              </Text>
            </>
          )}

          {selectedSeason === "Year" && (
            <>
              <Text style={styles.cropName}>🍇 द्राक्षे (Grapes)</Text>
              <Text>⭐⭐⭐⭐⭐</Text>
              <Text>✔ काळी माती सर्वोत्तम</Text>
              <Text>✔ ठिबक सिंचन आवश्यक</Text>
              <Text>✔ रोग: डाऊनी मिल्ड्यू</Text>
              <Text style={styles.income}>
                अपेक्षित उत्पन्न: ₹4 – 6 लाख / एकर
              </Text>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4FFF4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 25,
    color: "#2E7D32",
  },
  label: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "600",
  },
  option: {
    fontSize: 18,
    marginVertical: 4,
  },
  selected: {
    fontSize: 18,
    marginVertical: 4,
    color: "#2E7D32",
  },
  soilRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  soilBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
  soilSelected: {
    backgroundColor: "#C8E6C9",
  },
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
  cropName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  income: {
    marginTop: 10,
    fontWeight: "600",
  },
});
