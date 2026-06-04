import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "expo-router";

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();

  const [photo, setPhoto] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [farmerId, setFarmerId] = useState("");

  const [taluka, setTaluka] = useState("");
  const [village, setVillage] = useState("");
  const [landArea, setLandArea] = useState("");

  const [loading, setLoading] = useState(false);

  // Load Profile
  const loadProfile = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const docRef = doc(db, "farmers", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setName(data.name || "");
        setMobile(data.mobile || "");
        setFarmerId(data.farmerId || "");
        setTaluka(data.Taluka || data.taluka || "");
        setVillage(data.Village || data.village || "");
        setLandArea(data.land || data.landArea || "");
        setPhoto(data.photo || null);
      }
    } catch (error) {
      console.log("Load Profile Error:", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Pick Image
  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Gallery Permission Required");
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

  // Save Profile
  const handleSave = async () => {
    if (
      !name ||
      !mobile ||
      !farmerId ||
      !taluka ||
      !village ||
      !landArea
    ) {
      Alert.alert("कृपया सर्व माहिती भरा");
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert("मोबाईल नंबर 10 अंकी असावा");
      return;
    }

    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Please Login First");
        return;
      }

      await setDoc(doc(db, "farmers", user.uid), {
        name,
        mobile,
        farmerId,
        Taluka: taluka,
        Village: village,
        land: landArea,
        photo,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("✅ प्रोफाइल यशस्वीरीत्या सेव झाले");
    } catch (error) {
      console.log(error);
      Alert.alert("❌ Firestore Save Failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);

      Alert.alert("✅ Logout Successful");

      router.replace("/login");
    } catch (error) {
      console.log(error);
      Alert.alert("❌ Logout Failed");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={
              photo
                ? { uri: photo }
                : require("../../assets/images/profile_image.png")
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

        <Text style={styles.title}>शेतकरी प्रोफाइल</Text>

        <Text style={styles.label}>पूर्ण नाव</Text>
        <TextInput
          style={styles.input}
          placeholder="तुमचे पूर्ण नाव"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>मोबाईल नंबर</Text>
        <TextInput
          style={styles.input}
          placeholder="9876543210"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
        />

        <Text style={styles.label}>शेतकरी आयडी</Text>
        <TextInput
          style={styles.input}
          placeholder="FARM001"
          value={farmerId}
          onChangeText={setFarmerId}
        />

        <Text style={styles.label}>तालुका</Text>
        <TextInput
          style={styles.input}
          placeholder="उदा. निफाड"
          value={taluka}
          onChangeText={setTaluka}
        />

        <Text style={styles.label}>गाव</Text>
        <TextInput
          style={styles.input}
          placeholder="उदा. पिंपळगाव"
          value={village}
          onChangeText={setVillage}
        />

        <Text style={styles.label}>जमीन (एकर)</Text>
        <TextInput
          style={styles.input}
          placeholder="उदा. 5"
          keyboardType="numeric"
          value={landArea}
          onChangeText={setLandArea}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>
              प्रोफाइल सेव करा
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            🚪 लॉगआउट
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  container: {
    padding: 20,
    paddingBottom: 80,
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
    bottom: 0,
    right: 115,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },

  plusText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },

  label: {
    marginTop: 12,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
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
    fontWeight: "bold",
    fontSize: 16,
  },

  logoutButton: {
    marginTop: 15,
    backgroundColor: "#E53935",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});