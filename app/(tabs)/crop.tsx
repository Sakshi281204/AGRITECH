// import React, { useEffect, useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function CropScreen() {
//   const [village, setVillage] = useState("");
//   const [soil, setSoil] = useState("");
//   const [season, setSeason] = useState("");

//   const [villages, setVillages] = useState<any[]>([]);
//   const [soils, setSoils] = useState<any[]>([]);
//   const [seasons, setSeasons] = useState<any[]>([]);

//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const BASE_URL =
//     "https://crop-recommendation-system-1-gi84.onrender.com";

//   useEffect(() => {
//     fetch(`${BASE_URL}/options`)
//       .then((res) => res.json())
//       .then((data) => {
//         setVillages(data.villages || []);
//         setSoils(data.soil_types || []);
//         setSeasons(data.seasons || []);
//       });
//   }, []);

//   const fetchCrops = async () => {
//     if (!village || !soil || !season) {
//       setResult({ error: "कृपया सर्व पर्याय निवडा" });
//       return;
//     }

//     try {
//       setLoading(true);
//       setResult(null);

//       const response = await fetch(`${BASE_URL}/predict`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           village,
//           soil_type: soil,
//           season,
//         }),
//       });

//       const data = await response.json();
//       setResult(data);
//     } catch (error) {
//       setResult({ error: "सर्व्हरशी संपर्क होत नाही ❌" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView style={styles.container}>

//         {/* HEADER */}
//         <View style={styles.headerBox}>
//           <Text style={styles.headerTitle}>🌱 Smart Crop Advisor</Text>
//           <Text style={styles.headerSub}>
//             तुमच्या शेतासाठी योग्य पीक निवडा
//           </Text>
//         </View>

//         {/* CARD */}
//         <View style={styles.card}>

//           {/* VILLAGE */}
//           <Text style={styles.label}>🏡 गाव निवडा</Text>
//           <View style={styles.chipContainer}>
//             {villages.map((v, i) => (
//               <TouchableOpacity
//                 key={i}
//                 style={[
//                   styles.chip,
//                   village === v.value && styles.activeChip,
//                 ]}
//                 onPress={() => setVillage(v.value)}
//               >
//                 <Text>{v.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* SOIL */}
//           <Text style={styles.label}>🌍 माती</Text>
//           <View style={styles.chipContainer}>
//             {soils.map((s, i) => (
//               <TouchableOpacity
//                 key={i}
//                 style={[
//                   styles.chip,
//                   soil === s.value && styles.activeChip,
//                 ]}
//                 onPress={() => setSoil(s.value)}
//               >
//                 <Text>{s.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* SEASON */}
//           <Text style={styles.label}>🌦 हंगाम</Text>
//           <View style={styles.chipContainer}>
//             {seasons.map((s, i) => (
//               <TouchableOpacity
//                 key={i}
//                 style={[
//                   styles.chip,
//                   season === s.value && styles.activeChip,
//                 ]}
//                 onPress={() => setSeason(s.value)}
//               >
//                 <Text>{s.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* BUTTON */}
//           <TouchableOpacity style={styles.btn} onPress={fetchCrops}>
//             <Text style={styles.btnText}>🌾 शिफारस मिळवा</Text>
//           </TouchableOpacity>
//         </View>

//         {/* LOADING */}
//         {loading && <ActivityIndicator size="large" color="#2E7D32" />}

//         {/* RESULT */}
//         {result && (
//           <View style={styles.resultCard}>
//             {result.error ? (
//               <Text style={{ color: "red" }}>❌ {result.error}</Text>
//             ) : (
//               <>
//                 <Text style={styles.resultTitle}>
//                   🌾 {result.recommended_crop}
//                 </Text>

//                 <Text>🌡 {result.debug_info?.temperature}°C</Text>
//                 <Text>💧 {result.debug_info?.humidity}%</Text>
//                 <Text>🌧 {result.debug_info?.rainfall}</Text>

//                 <Text style={{ marginTop: 10 }}>
//                   ⚙️ {result.api_status}
//                 </Text>
//               </>
//             )}
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4FFF4",
//   },

//   headerBox: {
//     backgroundColor: "#2E7D32",
//     padding: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },

//   headerTitle: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//   },

//   headerSub: {
//     color: "#E8F5E9",
//     marginTop: 5,
//   },

//   card: {
//     backgroundColor: "#fff",
//     margin: 15,
//     padding: 16,
//     borderRadius: 15,
//     elevation: 4,
//   },

//   label: {
//     marginTop: 10,
//     fontWeight: "600",
//   },

//   chipContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 8,
//   },

//   chip: {
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 20,
//     marginRight: 8,
//     marginTop: 6,
//     borderColor: "#ccc",
//   },

//   activeChip: {
//     backgroundColor: "#C8E6C9",
//     borderColor: "#2E7D32",
//   },

//   btn: {
//     backgroundColor: "#2E7D32",
//     padding: 15,
//     borderRadius: 12,
//     marginTop: 20,
//   },

//   btnText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },

//   resultCard: {
//     backgroundColor: "#fff",
//     margin: 15,
//     padding: 16,
//     borderRadius: 15,
//     elevation: 4,
//   },

//   resultTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#2E7D32",
//     marginBottom: 10,
//   },
// });



import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";

export default function CropScreen() {
  const [village, setVillage] = useState("");
  const [soil, setSoil] = useState("");
  const [season, setSeason] = useState("");

  const [villages, setVillages] = useState<any[]>([]);
  const [soils, setSoils] = useState<any[]>([]);
  const [seasons, setSeasons] = useState<any[]>([]);

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 🔥 YOUR BACKEND
  const BASE_URL =
    "https://crop-recommendation-system-1-gi84.onrender.com";

  // 🔥 ADD YOUR WEATHER API KEY HERE
  const WEATHER_API_KEY = "3412595d224a709bef0b624c5acc7f2d";

  // ---------------- FETCH OPTIONS ----------------
  useEffect(() => {
    fetch(`${BASE_URL}/options`)
      .then((res) => res.json())
      .then((data) => {
        setVillages(data.villages || []);
        setSoils(data.soil_types || []);
        setSeasons(data.seasons || []);
      });
  }, []);

  // ---------------- WEATHER FETCH ----------------
  const getWeather = async (villageName: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${villageName},IN&appid=${WEATHER_API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      return {
        temp: data.main.temp,
        humidity: data.main.humidity,
        rain: data.rain?.["1h"] || 0,
      };
    } catch (e) {
      return null;
    }
  };

  // ---------------- MARATHI TRANSLATION ----------------
  const cropMarathiMap: any = {
    rice: "तांदूळ",
    wheat: "गहू",
    cotton: "कापूस",
    sugarcane: "ऊस",
    maize: "मका",
    pomegranate: "डाळिंब",
    tomato: "टोमॅटो",
    onion: "कांदा",
  };

  // ---------------- FETCH RESULT ----------------
  const fetchCrops = async () => {
    if (!village || !soil || !season) {
      setResult({ error: "कृपया सर्व पर्याय निवडा" });
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch(`${BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          village,
          soil_type: soil,
          season,
        }),
      });

      const data = await response.json();

      // 🔥 WEATHER CALL
      const weather = await getWeather(village);

      const marathiCrop =
        cropMarathiMap[data.recommended_crop?.toLowerCase()] ||
        data.recommended_crop;

      const finalResult = {
        crop: marathiCrop,
        weather,
        raw: data,
      };

      setResult(finalResult);

      // 🔊 SPEECH OUTPUT
      let speechText = `तुमच्या शेतासाठी योग्य पीक आहे ${marathiCrop}.`;

      if (weather) {
        speechText += ` तापमान ${weather.temp} अंश आहे, आर्द्रता ${weather.humidity} टक्के आहे.`;
      }

      Speech.speak(speechText, { language: "mr-IN" });

    } catch (error) {
      setResult({ error: "सर्व्हरशी संपर्क होत नाही ❌" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>🌱 Smart Crop Advisor</Text>
          <Text style={styles.headerSub}>
            हवामानानुसार योग्य पीक निवडा
          </Text>
        </View>

        <View style={styles.card}>

          {/* VILLAGE */}
          <Text style={styles.label}>🏡 गाव</Text>
          <View style={styles.chipContainer}>
            {villages.map((v, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.chip,
                  village === v.value && styles.activeChip,
                ]}
                onPress={() => setVillage(v.value)}
              >
                <Text>{v.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SOIL */}
          <Text style={styles.label}>🌍 माती</Text>
          <View style={styles.chipContainer}>
            {soils.map((s, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.chip,
                  soil === s.value && styles.activeChip,
                ]}
                onPress={() => setSoil(s.value)}
              >
                <Text>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SEASON */}
          <Text style={styles.label}>🌦 हंगाम</Text>
          <View style={styles.chipContainer}>
            {seasons.map((s, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.chip,
                  season === s.value && styles.activeChip,
                ]}
                onPress={() => setSeason(s.value)}
              >
                <Text>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.btn} onPress={fetchCrops}>
            <Text style={styles.btnText}>🌾 शिफारस मिळवा</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#2E7D32" />}

        {/* RESULT */}
        {result && (
          <View style={styles.resultCard}>
            {result.error ? (
              <Text style={{ color: "red" }}>❌ {result.error}</Text>
            ) : (
              <>
                <Text style={styles.resultTitle}>
                  🌾 {result.crop}
                </Text>

                {result.weather && (
                  <>
                    <Text>🌡 तापमान: {result.weather.temp}°C</Text>
                    <Text>💧 आर्द्रता: {result.weather.humidity}%</Text>
                    <Text>🌧 पाऊस: {result.weather.rain}</Text>
                  </>
                )}
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4FFF4" },

  headerBox: {
    backgroundColor: "#2E7D32",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerSub: {
    color: "#E8F5E9",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 16,
    borderRadius: 15,
    elevation: 4,
  },

  label: { marginTop: 10, fontWeight: "600" },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },

  chip: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 8,
    marginTop: 6,
    borderColor: "#ccc",
  },

  activeChip: {
    backgroundColor: "#C8E6C9",
    borderColor: "#2E7D32",
  },

  btn: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  resultCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 16,
    borderRadius: 15,
    elevation: 4,
  },

  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
});