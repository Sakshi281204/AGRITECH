import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [farmerId, setFarmerId] = useState("");

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Gallery permission is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name || !mobile || !farmerId) {
      Alert.alert("सर्व माहिती भरा");
      return;
    }

    Alert.alert("प्रोफाइल यशस्वीरीत्या सेव झाले ✅");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={
              photo
                ? { uri: photo }
                : require("../../assets/images/profile_image.png") // ✅ FIXED PATH
            }
            style={styles.profileImage}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={pickImage}
          >
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>प्रोफाइल पूर्ण करा</Text>

        <Text style={styles.label}>पूर्ण नाव</Text>
        <TextInput
          style={styles.input}
          placeholder="तुमचे नाव लिहा"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>मोबाईल नंबर</Text>
        <TextInput
          style={styles.input}
          placeholder="मोबाईल नंबर लिहा"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
        />

        <Text style={styles.label}>शेतकरी आयडी</Text>
        <TextInput
          style={styles.input}
          placeholder="शेतकरी आयडी लिहा"
          value={farmerId}
          onChangeText={setFarmerId}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>सेव करा</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#4CAF50",
  },

  addButton: {
    position: "absolute",
    bottom: 5,
    right: 115,
    backgroundColor: "#4CAF50",
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  plusText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
    color: "#555",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  saveButton: {
    marginTop: 25,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
