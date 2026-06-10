import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Speech from "expo-speech";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { collection, addDoc ,serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

const cropNames: any = {
  grape: "द्राक्ष",
  tomato: "टोमॅटो",
  onion: "कांदा",
};

export default function DiseaseScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🙏 नमस्कार! पानाचा फोटो काढा किंवा गॅलरीमधून निवडा.",
      sender: "bot",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");

  const flatListRef = useRef<FlatList>(null);

  const BACKEND_URL =
    "https://smart-agritech-assistance-2.onrender.com";

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: "bot",
      },
    ]);

    Speech.speak(text, {
      language: "mr-IN",
      rate: 0.9,
      pitch: 1,
    });
  };

  const openCamera = async () => {
    if (!selectedCrop) {
      Alert.alert("⚠️ कृपया पिक निवडा");
      return;
    }

    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("कॅमेरा परवानगी आवश्यक आहे");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setImage(uri);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "📷 फोटो पाठवला",
          sender: "user",
        },
      ]);

      sendToBackend(uri);
    }
  };

  const openGallery = async () => {
    if (!selectedCrop) {
      Alert.alert("⚠️ कृपया पिक निवडा");
      return;
    }

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("गॅलरी परवानगी आवश्यक आहे");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setImage(uri);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "🖼 फोटो निवडला",
          sender: "user",
        },
      ]);

      sendToBackend(uri);
    }
  };

  const sendToBackend = async (uri: string) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "file",
        {
          uri,
          name: "leaf.jpg",
          type: "image/jpeg",
        } as any
      );

      formData.append("plant_type", selectedCrop);

      console.log("Sending request...");
      console.log("Crop:", selectedCrop);

      const response = await fetch(
        `${BACKEND_URL}/predict/`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("Status:", response.status);

      const data = await response.json();

      console.log("Response:", data);

      if (!data.success) {
        throw new Error("Prediction Failed");
      }

const plant =
  cropNames[data["वनस्पती"]] ||
  data["वनस्पती"];

const disease =
  data["रोग"] ||
  "रोग ओळखला नाही";

const remedy =
  data["उपाय"] ||
  "उपाय उपलब्ध नाही";

const confidence =
  data["confidence"] || 0;

//       addBotMessage(resultText);

        const resultText = `
🌱 पीक: ${plant}

🦠 आढळलेला रोग:
${disease}

💊 उपाय:
${remedy}

📊 विश्वास:
${confidence}%`;

try {
const uid = auth.currentUser?.uid;
  if (!uid) {
  console.log("User not logged in");
  return;
}

await addDoc(
  collection(
    db,
    "users",
    uid,
    "diseaseHistory"
  ),
  {
    type: "disease",

    crop: plant,
    disease: disease,
    remedy: remedy,

    confidence: confidence,

    userId: uid,
    userEmail: auth.currentUser?.email || "",

    createdAt: serverTimestamp(),
  }
);

  console.log("✅ Disease history saved");
} catch (err) {
  console.log("❌ Disease history save failed:", err);
}

addBotMessage(resultText);
    } catch (error) {
      console.log("API ERROR:", error);

      addBotMessage(
        "❌ ओळख अयशस्वी. कृपया पुन्हा प्रयत्न करा."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>
          🌾 कृषी रोग ओळख
        </Text>

        <View style={styles.card}>
          <Picker
            selectedValue={selectedCrop}
            onValueChange={(value) =>
              setSelectedCrop(value)
            }
          >
            <Picker.Item
              label="पिक निवडा"
              value=""
            />

            <Picker.Item
              label="कांदा"
              value="onion"
            />

            <Picker.Item
              label="टोमॅटो"
              value="tomato"
            />

            <Picker.Item
              label="द्राक्ष"
              value="grape"
            />
          </Picker>
        </View>

        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        )}

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.sender === "bot"
                  ? styles.botMsg
                  : styles.userMsg,
              ]}
            >
              <Text style={styles.messageText}>
                {item.text}
              </Text>
            </View>
          )}
        />

        {loading && (
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />
        )}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={openCamera}
          >
            <Text style={styles.buttonText}>
              📷 कॅमेरा
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={openGallery}
          >
            <Text style={styles.buttonText}>
              🖼 गॅलरी
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4FFF4",
  },

  container: {
    flex: 1,
    padding: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2E7D32",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
  },

  message: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 5,
    maxWidth: "85%",
  },

  botMsg: {
    backgroundColor: "#E8F5E9",
    alignSelf: "flex-start",
  },

  userMsg: {
    backgroundColor: "#C8E6C9",
    alignSelf: "flex-end",
  },

  messageText: {
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    marginTop: 10,
  },

  button: {
    flex: 1,
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
