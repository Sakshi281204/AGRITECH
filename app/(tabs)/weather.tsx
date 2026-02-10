import { StyleSheet, Text, View } from "react-native";

export default function WeatherScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🌦️ हवामान माहिती</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f8e9",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b5e20",
  },
});
