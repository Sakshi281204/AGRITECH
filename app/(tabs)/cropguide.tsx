import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CropGuide() {
  const [selectedCrop, setSelectedCrop] = useState("कांदा");

  const cropData: any = {
    कांदा: {
      lifecycle: [
        "1️⃣ बी पेरणी",
        "2️⃣ रोप वाढ",
        "3️⃣ गाठी तयार होणे",
        "4️⃣ काढणी"
      ],
      irrigation: "दर 7-10 दिवसांनी पाणी द्यावे. ठिबक सिंचन उत्तम.",
      fertilizer: "युरिया + डीएपी संतुलित प्रमाणात वापरावे.",
      disease: "थ्रिप्स, पांढरी बुरशी धोका.",
      harvesting: "पाने पिवळी झाल्यावर काढणी करावी."
    },
    टोमॅटो: {
      lifecycle: [
        "1️⃣ रोप तयार करणे",
        "2️⃣ फुलोरा",
        "3️⃣ फळ धरणे",
        "4️⃣ काढणी"
      ],
      irrigation: "5-7 दिवसांनी पाणी. पाणी साचू देऊ नये.",
      fertilizer: "NPK + सेंद्रिय खत वापरावे.",
      disease: "अर्ली ब्लाइट, लेट ब्लाइट धोका.",
      harvesting: "फळ लाल झाल्यावर तोडणी."
    },
    "द्राक्षे": {
      lifecycle: [
        "1️⃣ छाटणी",
        "2️⃣ कळी फुटणे",
        "3️⃣ फुलोरा",
        "4️⃣ दाणे वाढ"
      ],
      irrigation: "ठिबक सिंचन प्रणाली उत्तम.",
      fertilizer: "सेंद्रिय खत + सूक्ष्म अन्नद्रव्ये.",
      disease: "पावडरी मिल्ड्यू, डाउनी मिल्ड्यू.",
      harvesting: "दाणे पूर्ण आकार घेतल्यावर काढणी."
    }
  };

  const data = cropData[selectedCrop];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* 🔥 Bigger Header */}
        <Text style={styles.title}>📘 पीक मार्गदर्शक</Text>
        <Text style={styles.subtitle}>
          आपले पीक निवडा आणि संपूर्ण माहिती पहा
        </Text>

        {/* 🌾 Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCrop}
            onValueChange={(itemValue) => setSelectedCrop(itemValue)}
          >
            <Picker.Item label="🧅 कांदा" value="कांदा" />
            <Picker.Item label="🍅 टोमॅटो" value="टोमॅटो" />
            <Picker.Item label="🍇 द्राक्षे" value="द्राक्षे" />
          </Picker>
        </View>

        {/* 🌱 Life Cycle */}
        <View style={styles.card}>
          <Text style={styles.heading}>🌱 जीवनचक्र</Text>
          {data.lifecycle.map((stage: string, index: number) => (
            <Text key={index} style={styles.text}>{stage}</Text>
          ))}
        </View>

        {/* 💧 Irrigation */}
        <View style={styles.card}>
          <Text style={styles.heading}>💧 सिंचन</Text>
          <Text style={styles.text}>{data.irrigation}</Text>
        </View>

        {/* 🌿 Fertilizer */}
        <View style={styles.card}>
          <Text style={styles.heading}>🌿 खत व्यवस्थापन</Text>
          <Text style={styles.text}>{data.fertilizer}</Text>
        </View>

        {/* 🦠 Disease */}
        <View style={styles.card}>
          <Text style={styles.heading}>🦠 रोग धोका</Text>
          <Text style={styles.text}>{data.disease}</Text>
        </View>

        {/* 🌾 Harvesting */}
        <View style={styles.card}>
          <Text style={styles.heading}>🌾 काढणी</Text>
          <Text style={styles.text}>{data.harvesting}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f8e9",
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 25,        // 🔥 Increased
    fontWeight: "bold",
    marginTop: 40,
    color: "#1b5e20",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    color: "#4e944f",
  },
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginBottom: 15,
    elevation: 4,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 4,
  },
  heading: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2e7d32",
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
  },
});
