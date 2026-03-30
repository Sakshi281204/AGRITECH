// DiseaseScreen.tsx
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Speech from "expo-speech";
import { SafeAreaView } from "react-native-safe-area-context";
import Voice from "@react-native-voice/voice";
import { Picker } from "@react-native-picker/picker";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

export default function DiseaseScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "नमस्कार 🙏 पानाचा फोटो घ्या.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Crop Picker state
  const [selectedCrop, setSelectedCrop] = useState("");

  const BACKEND_URL =
    "https://devoted-spontaneity-production.up.railway.app/predict/"; // ✅ trailing slash

  // ---------------- VOICE ----------------
  useEffect(() => {
    Voice.onSpeechResults = (e: any) => {
      if (e.value && e.value.length > 0) {
        const text = e.value[0];
        setInput(text);
        sendMessage(text);
        setIsListening(false);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start("mr-IN");
    } catch (e) {
      console.log(e);
    }
  };

  const stopListening = async () => {
    await Voice.stop();
    setIsListening(false);
  };

  // ---------------- CAMERA ----------------
  const pickImage = async () => {
    if (!selectedCrop) {
      Alert.alert("कृपया पिक निवडा!");
      return;
    }

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("कॅमेऱ्याची परवानगी द्या");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (result.canceled) return;

    const uri = result.assets[0].uri;
    setImage(uri);
    uploadImage(uri);
  };

  // ---------------- UPLOAD FUNCTION ----------------
  const uploadImage = async (uri: string) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", {
        uri,
        name: "leaf.jpg",
        type: "image/jpeg",
      } as any);

      formData.append("crop", selectedCrop); // ✅ send selected crop

      const response = await fetch(BACKEND_URL, { method: "POST", body: formData });

      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();

      const prediction = data.prediction || "रोग सापडला नाही";
      const recommendation = data.recommendation || "";

      const marathiText = `🌿 ओळखलेला रोग: ${prediction}\n${recommendation}`;

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: marathiText, sender: "bot" },
      ]);

      Speech.speak(marathiText, { language: "mr-IN" });
    } catch (error) {
      console.log("UPLOAD ERROR:", error);

      const errorMsg = "सर्व्हरशी संपर्क होत नाही.";
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: errorMsg, sender: "bot" },
      ]);
      Speech.speak(errorMsg, { language: "mr-IN" });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CHAT ----------------
  const sendMessage = (textParam?: string) => {
    const textToSend = textParam || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
  };

  // ---------------- UI ----------------
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>🌾 AGRITECH</Text>

        {/* Crop Picker */}
        <View style={{ marginBottom: 10, borderWidth: 1, borderColor: "#4CAF50", borderRadius: 8 }}>
          <Picker
            selectedValue={selectedCrop}
            onValueChange={(itemValue) => setSelectedCrop(itemValue)}
          >
            <Picker.Item label="पिक निवडा" value="" />
            <Picker.Item label="कांदा" value="onion" />
            <Picker.Item label="टोमॅटो" value="tomato" />
            <Picker.Item label="द्राक्ष" value="grapes" />
          </Picker>
        </View>

        {/* Selected Image */}
        {image && <Image source={{ uri: image }} style={styles.image} />}

        {loading && <ActivityIndicator size="large" color="#2E7D32" />}

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[styles.message, item.sender === "user" ? styles.userMsg : styles.botMsg]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.bottomBox}>
          <TextInput
            placeholder="प्रश्न लिहा..."
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />

          <View style={styles.row}>
            <TouchableOpacity style={styles.btn} onPress={pickImage}>
              <Text style={styles.btnText}>📷 फोटो</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={isListening ? stopListening : startListening}
            >
              <Text style={styles.btnText}>
                {isListening ? "🛑 थांबा" : "🎙 माइक"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5FFF5" },
  container: { flex: 1, padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", color: "#2E7D32", marginBottom: 10 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  message: { padding: 10, borderRadius: 10, marginVertical: 4, maxWidth: "80%" },
  userMsg: { alignSelf: "flex-end", backgroundColor: "#C8E6C9" },
  botMsg: { alignSelf: "flex-start", backgroundColor: "#E8F5E9" },
  messageText: { fontSize: 16 },
  bottomBox: { marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#4CAF50", borderRadius: 8, padding: 10, backgroundColor: "#fff", marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  btn: { flex: 1, backgroundColor: "#2E7D32", padding: 12, borderRadius: 8, marginHorizontal: 5 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});