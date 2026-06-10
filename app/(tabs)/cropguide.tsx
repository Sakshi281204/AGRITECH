import { Picker } from "@react-native-picker/picker";
import * as Speech from "expo-speech";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function CropGuide() {
  const [selectedCrop, setSelectedCrop] = useState("कांदा");

  const cropData: any = {
    कांदा: {
      lifecycle: [
        "1️⃣ बी पेरणी",
        "2️⃣ रोप वाढ",
        "3️⃣ गाठी तयार होणे",
        "4️⃣ काढणी",
      ],
      irrigation: "दर 7-10 दिवसांनी पाणी द्यावे. ठिबक सिंचन सर्वोत्तम आहे.",
      fertilizer: "युरिया 50 किलो + डीएपी 50 किलो प्रति एकर वापरावे.",
      disease:
        "थ्रिप्स, जांभळा डाग रोग, पांढरी बुरशी यांचा प्रादुर्भाव होऊ शकतो.",
      organic: "कडुनिंब तेल फवारणी व ट्रायकोडर्मा वापरावे.",
      harvesting: "पाने पिवळी पडल्यावर कांदा काढणीस तयार होतो.",
    },

    टोमॅटो: {
      lifecycle: [
        "1️⃣ रोप तयार करणे",
        "2️⃣ फुलोरा",
        "3️⃣ फळ धरणे",
        "4️⃣ काढणी",
      ],
      irrigation: "5-7 दिवसांनी पाणी द्यावे. पाणी साचू देऊ नये.",
      fertilizer: "NPK 19:19:19 व सेंद्रिय खत वापरावे.",
      disease: "अर्ली ब्लाइट, लेट ब्लाइट आणि व्हायरस रोगांचा धोका.",
      organic: "कडुनिंब अर्क व जैविक बुरशीनाशके वापरावीत.",
      harvesting: "फळ पूर्ण लाल झाल्यावर तोडणी करावी.",
    },

    द्राक्षे: {
      lifecycle: [
        "1️⃣ छाटणी",
        "2️⃣ कळी फुटणे",
        "3️⃣ फुलोरा",
        "4️⃣ दाणे वाढ",
      ],
      irrigation: "ठिबक सिंचन प्रणाली सर्वोत्तम आहे.",
      fertilizer: "सेंद्रिय खत व सूक्ष्म अन्नद्रव्ये वापरावीत.",
      disease: "पावडरी मिल्ड्यू व डाउनी मिल्ड्यू रोगांचा धोका.",
      organic: "सल्फर फवारणी व जैविक बुरशीनाशके वापरावीत.",
      harvesting: "दाणे पूर्ण आकार घेतल्यावर काढणी करावी.",
    },
  };

  const data = cropData[selectedCrop];

  const speakGuide = () => {
    Speech.speak(
      `${selectedCrop} पीक माहिती.
      सिंचन: ${data.irrigation}.
      खत व्यवस्थापन: ${data.fertilizer}.
      रोग धोका: ${data.disease}.
      सेंद्रिय उपाय: ${data.organic}.
      काढणी: ${data.harvesting}.`,
      {
        language: "mr-IN",
        pitch: 1,
        rate: 0.9,
      }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🌾 स्मार्ट पीक मार्गदर्शक</Text>
          <Text style={styles.subtitle}>
            आपल्या पिकाची संपूर्ण माहिती एका ठिकाणी
          </Text>
        </View>

        {/* Crop Picker */}
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

        {/* Voice Button */}
        <TouchableOpacity style={styles.voiceButton} onPress={speakGuide}>
          <Text style={styles.voiceText}>🔊 माहिती ऐका</Text>
        </TouchableOpacity>

        {/* Lifecycle */}
        <View style={styles.card}>
          <Text style={styles.heading}>🌱 जीवनचक्र</Text>
          {data.lifecycle.map((stage: string, index: number) => (
            <Text key={index} style={styles.text}>
              {stage}
            </Text>
          ))}
        </View>

        {/* Irrigation */}
        <View style={styles.card}>
          <Text style={styles.heading}>💧 सिंचन</Text>
          <Text style={styles.text}>{data.irrigation}</Text>
        </View>

        {/* Fertilizer */}
        <View style={styles.card}>
          <Text style={styles.heading}>🌿 खत व्यवस्थापन</Text>
          <Text style={styles.text}>{data.fertilizer}</Text>
        </View>

        {/* Disease */}
        <View style={styles.card}>
          <Text style={styles.heading}>🦠 रोग धोका</Text>
          <Text style={styles.text}>{data.disease}</Text>
        </View>

        {/* Organic */}
        <View style={styles.card}>
          <Text style={styles.heading}>🍃 सेंद्रिय उपाय</Text>
          <Text style={styles.text}>{data.organic}</Text>
        </View>

        {/* Harvest */}
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
    backgroundColor: "#F4F8F2",
  },

  header: {
    backgroundColor: "#2E7D32",
    paddingTop: 40,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#E8F5E9",
    marginTop: 8,
    fontSize: 15,
  },

  pickerContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 15,
    elevation: 5,
    marginBottom: 15,
  },

  voiceButton: {
    backgroundColor: "#43A047",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
  },

  voiceText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 16,
    borderRadius: 18,
    elevation: 4,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },

  text: {
    fontSize: 15,
    color: "#444",
    lineHeight: 24,
    marginBottom: 5,
  },
});