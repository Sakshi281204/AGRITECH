import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#e8f5e9", "#ffffff"]}
      style={styles.gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>🌾 AGRITECH</Text>
          <Text style={styles.subtitle}>AI आधारित शेती सहाय्यक</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/crop")}
          >
            <Text style={styles.buttonText}>🌾 पीक सूचना</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/disease")}
          >
            <Text style={styles.buttonText}>🍃 रोग ओळख</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/weather")}
          >
            <Text style={styles.buttonText}>🌦 हवामान माहिती</Text>
          </TouchableOpacity>

          {/* ✅ Added Mandi / Bajarbhav Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/mandi")}
          >
            <Text style={styles.buttonText}>💰 बाजारभाव</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/cropguide")}
          >
            <Text style={styles.buttonText}>📘 पीक मार्गदर्शक</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/history")}
          >
            <Text style={styles.buttonText}>📂 इतिहास</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.buttonText}>👤 प्रोफाइल</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 5,
  },
  subtitle: {
    marginBottom: 30,
    color: "#4E944F",
    fontSize: 14,
  },
  button: {
    width: "85%",
    padding: 16,
    backgroundColor: "#2E7D32",
    borderRadius: 14,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});