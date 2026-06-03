import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

export default function UpdateMandi() {
  const [crop, setCrop] = useState("");
  const [price, setPrice] = useState("");

  const handleUpdate = async () => {
    try {
      await axios.post("http://YOUR_LOCAL_IP:8000/update_mandi", {
        crop,
        price,
      });

      Alert.alert("Success", "Mandi rate updated successfully!");
      setCrop("");
      setPrice("");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update mandi rate");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Mandi Rates</Text>

      <TextInput
        placeholder="Crop (Tomato / Onion / Grapes)"
        style={styles.input}
        value={crop}
        onChangeText={setCrop}
      />

      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#1565c0",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});