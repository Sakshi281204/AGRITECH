import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as Speech from "expo-speech";

const API_KEY = "93bd036058fb6a1258d6577143e358f5";

// 🔔 Notification handler (FIXED for new Expo types)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type WeatherData = {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
};

export default function WeatherScreen() {
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [place, setPlace] = useState<string>("");

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      // 📍 Location permission
      const { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      // 🔔 Notification permission
      await Notifications.requestPermissionsAsync();

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      // 🗺️ Reverse geocode (Taluka / District)
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (address.length > 0) {
        const a = address[0];
        setPlace(
          `${a.subregion || a.city || "तालुका"}, ${
            a.district || a.city || "जिल्हा"
          }, महाराष्ट्र`
        );
      }

      // 🌦️ Today weather
      const todayRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=mr&appid=${API_KEY}`
      );
      const todayData: WeatherData = await todayRes.json();
      setToday(todayData);

      // 🌾 Smart alert
      sendSmartAlert(todayData);

      // 📅 7-day forecast (using 3-hour API)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=mr&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      setForecast(
        forecastData.list.filter((_: any, i: number) => i % 8 === 0)
      );
    } catch (err) {
      console.log("Weather error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🌾 SMART MARATHI WEATHER ALERT + VOICE
  const sendSmartAlert = async (data: WeatherData) => {
    let message = "आजचे हवामान तपासा";

    const condition = data.weather?.[0]?.main?.toLowerCase() ?? "";
    const humidity = data.main?.humidity ?? 0;
    const wind = data.wind?.speed ?? 0;

    if (condition.includes("rain")) {
      message = "आज पावसाची शक्यता आहे. फवारणी टाळा.";
    } else if (humidity > 80) {
      message = "हवामान दमट आहे. रोगांचा प्रादुर्भाव वाढू शकतो.";
    } else if (wind < 5) {
      message = "आज फवारणी आणि लागवडीसाठी योग्य हवामान आहे.";
    } else {
      message = "आज सामान्य हवामान आहे. शेती कामे करता येतील.";
    }

    // 🔔 Notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🌦️ शेती हवामान सल्ला",
        body: message,
      },
      trigger: null,
    });

    // 🔊 Marathi Voice Alert
    Speech.speak(message, {
      language: "mr-IN",
      rate: 0.9,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2e7d32" />
          <Text>हवामान लोड होत आहे...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!today) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text>हवामान माहिती उपलब्ध नाही</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🌦️ आजचे हवामान</Text>
        <Text style={styles.location}>📍 {place}</Text>

        <View style={styles.card}>
          <Text style={styles.temp}>
            {Math.round(today.main.temp)}°C
          </Text>
          <Text style={styles.desc}>
            {today.weather?.[0]?.description ??
              "हवामान माहिती"}
          </Text>
          <Text>💧 आर्द्रता: {today.main.humidity}%</Text>
          <Text>🌬️ वारा: {today.wind.speed} m/s</Text>
        </View>

        <Text style={styles.subTitle}>📅 पुढील 7 दिवस</Text>

        {forecast.map((f, i) => (
          <View key={i} style={styles.forecast}>
            <Text style={styles.day}>
              {new Date(f.dt * 1000).toLocaleDateString("mr-IN", {
                weekday: "long",
              })}
            </Text>
            <Text>{Math.round(f.main.temp)}°C</Text>
            <Text>
              {f.weather?.[0]?.description ??
                "हवामान माहिती"}
            </Text>
          </View>
        ))}

        <TouchableOpacity style={styles.refresh} onPress={loadWeather}>
          <Text style={styles.refreshText}>🔄 हवामान रिफ्रेश करा</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f1f8e9",
  },
  container: {
    padding: 16,
    paddingTop: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1b5e20",
  },
  location: {
    textAlign: "center",
    marginBottom: 12,
    color: "#388e3c",
  },
  card: {
    backgroundColor: "#e8f5e9",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1b5e20",
  },
  desc: {
    marginVertical: 6,
    textTransform: "capitalize",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2e7d32",
  },
  forecast: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
  },
  day: {
    fontWeight: "bold",
  },
  refresh: {
    marginTop: 20,
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 12,
  },
  refreshText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
