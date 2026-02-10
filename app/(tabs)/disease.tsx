import * as ImagePicker from "expo-image-picker";
import * as Speech from "expo-speech";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

export default function DiseaseScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "नमस्कार 🙏 पानाचा फोटो घ्या किंवा प्रश्न विचारा.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  // 📷 Image upload
  const pickImage = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("कॅमेऱ्याची परवानगी द्या");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);

      const aiReply =
        "🌿 रोग: करपा\n💦 उपाय: मॅन्कोझेब 2.5 ग्रॅम प्रति लिटर फवारणी करा";

      const botMessage: Message = {
        id: Date.now().toString(),
        text: aiReply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);

      Speech.speak(
        "तुमच्या पिकाला करपा रोग झाला आहे. मॅन्कोझेब फवारणी करा.",
        { language: "mr-IN" }
      );
    }
  };

  // 💬 Send text
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let reply =
        "कृपया पिकाचा फोटो अपलोड करा.";

      if (input.includes("करपा")) {
        reply =
          "करपा रोगासाठी मॅन्कोझेब फवारणी उपयुक्त आहे.";
      }

      const botMsg: Message = {
        id: Date.now().toString() + "b",
        text: reply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);

      Speech.speak(reply, { language: "mr-IN" });
    }, 800);
  };

  // 🎙 Mic (instruction only)
  const handleMic = () => {
    Speech.speak(
      "माइक वापरण्यासाठी कृपया प्रश्न लिहा किंवा फोटो घ्या.",
      { language: "mr-IN" }
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* 🔰 Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🌾 AGRITECH</Text>
          <Text style={styles.instruction}>
            पिकाच्या पानाचा फोटो घ्या किंवा प्रश्न लिहा
          </Text>
        </View>

        {/* 🖼 Image */}
        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}

        {/* 💬 Chat */}
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.sender === "user"
                  ? styles.userMsg
                  : styles.botMsg,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.chat}
        />

        {/* ⬇️ Input area */}
        <View style={styles.bottomBox}>
          <TextInput
            placeholder="प्रश्न लिहा..."
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cameraBtn}
              onPress={pickImage}
            >
              <Text style={styles.btnText}>📷 फोटो</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.micBtn}
              onPress={handleMic}
            >
              <Text style={styles.btnText}>🎙 माइक</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendBtn}
              onPress={sendMessage}
            >
              <Text style={styles.btnText}>➡️</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5FFF5",
  },
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2E7D32",
  },
  instruction: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 8,
  },
  chat: {
    flex: 1,
    marginVertical: 6,
  },
  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#C8E6C9",
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F5E9",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  bottomBox: {
    borderTopWidth: 1,
    borderColor: "#C8E6C9",
    paddingTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cameraBtn: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginRight: 4,
  },
  micBtn: {
    flex: 1,
    backgroundColor: "#429346",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  sendBtn: {
    flex: 0.6,
    backgroundColor: "#2E7D32",
    padding: 12,
    borderRadius: 8,
    marginLeft: 4,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
