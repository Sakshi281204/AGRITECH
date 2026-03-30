import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌾 AGRITECH</Text>
      <Text style={styles.subtitle}>AI आधारित शेती सहाय्यक</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/crop")}>
        <Text style={styles.buttonText}>🌾 पीक सूचना</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/disease")}>
        <Text style={styles.buttonText}>🍃 रोग ओळख</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/weather")}>
        <Text style={styles.buttonText}>🌦 हवामान माहिती</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/history")}>
        <Text style={styles.buttonText}>📂 इतिहास</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/profile")}>
        <Text style={styles.buttonText}>👤 प्रोफाइल</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FFF5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  subtitle: {
    marginBottom: 30,
    color: "#555",
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    marginVertical: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
