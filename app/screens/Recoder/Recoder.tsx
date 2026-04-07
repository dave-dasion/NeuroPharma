import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
  Dimensions,
  Platform
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";
import Sound from "react-native-sound";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";

import { NavStatelessComponent } from "interfaces";
import "react-native-get-random-values";
import AxiosHelper from "utils/AxiosHelper";
import { Colors } from "style";

import navigationOptions from "./Recoder.navigationOptions";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

const Recoder: NavStatelessComponent = () => {
  const data = [
    { label: "SOAP Notes", value: "soap" },
    { label: "Discharge Notes", value: "discharge" },
  ];

  const languageOptions = [
    { label: "English (US)", value: "en-US" },
    { label: "Spanish (Spain)", value: "es-ES" },
    { label: "French (France)", value: "fr-FR" },
    { label: "German (Germany)", value: "de-DE" },
    { label: "Hindi (India)", value: "hi-IN" },
  ];
  
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("soap");
  const [showButton, setShowButton] = useState(true);
  const timerRef = useRef(null);
  const [speakText, setSpeakText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const wsRef = useRef(null);
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const [sourceLang, setSourceLang] = useState("en-US");
  const [targetLang, setTargetLang] = useState("es-ES");
  const sourceSheetRef = useRef();
  const targetSheetRef = useRef();
  const API_URL = "https://8c8ihoc6o5.execute-api.us-west-2.amazonaws.com/api/generate";
  const API_KEY = "xBoq2s0jzAWnVrXEsgheaMjKRjiLuht5cZ9UfrV1";

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const cardSlideAnim1 = useRef(new Animated.Value(100)).current;
  const cardSlideAnim2 = useRef(new Animated.Value(100)).current;
  const cardSlideAnim3 = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    // Run animations every time screen is visited
    startAnimations();
    
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [sourceLang, targetLang]);

  const startAnimations = () => {
    // Reset all animations
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.8);
    pulseAnim.setValue(1);
    rotateAnim.setValue(0);
    cardSlideAnim1.setValue(100);
    cardSlideAnim2.setValue(100);
    cardSlideAnim3.setValue(100);

    // Staggered entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered card animations
    Animated.stagger(150, [
      Animated.spring(cardSlideAnim1, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(cardSlideAnim2, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(cardSlideAnim3, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isRecording) {
      // Pulse animation when recording
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Rotation animation when recording
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
    }
  }, [isRecording]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const onSpeechResults = event => {
    if (event.value && event.value.length > 0) {
      const newText = event.value[0];
      setSpeakText(newText);
      translateText(newText, sourceLang, targetLang);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    setSeconds(0);
    setIsRunning(true);
    try {
      setIsRecording(true);
      await Voice.start(sourceLang);
    } catch (e) {
      if (e.message?.includes("already started")) {
        console.log("Voice already started");
      } else {
        console.error("startRecording error:", e);
      }
    }
  };

  const stopRecording = async () => {
    setIsRunning(false);
    try {
      await Voice.stop();
      await Voice.cancel();
      setIsRecording(false);
    } catch (e) {
      console.error("stopRecording error:", e);
      setIsRecording(false);
    }
  };

  const extractBestTranslation = (res, targetLang) => {
    const normalizedTarget = normalizeLang(targetLang);
    const validMatch = res.data.matches?.find(
      m => m.target?.toLowerCase().startsWith(normalizedTarget)
    );
    return (
      validMatch?.translation ||
      res.data.responseData?.translatedText ||
      ""
    );
  };

  const normalizeLang = (lang) => {
    return lang?.split("-")[0];
  };

  const translateText = async (text, sourceLang, targetLang) => {
    console.log(text,"text::::")
    try {
      if (!text) return;
      const source = normalizeLang(sourceLang);
      const target = normalizeLang(targetLang);
      if (source === target) {
        setTranslatedText(text);
        return;
      }
      const res = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: text,
            langpair: `${source}|${target}`,
            mt: 1,
          },
        }
      );
      const translated = extractBestTranslation(res, targetLang);
      setTranslatedText(translated);
    } catch (error) {
      console.log(
        "Translation error:",
        error?.response?.data || error.message
      );
      setTranslatedText("");
    }
  };

  const shopNotesApi = async () => {
    setLoading(true);
    const userData = {
      dialogue: speakText
    };
    try {
      const response = await axios.post(
        API_URL,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          maxBodyLength: Infinity,
        }
      );
      if (response) {
        console.log(response,"response:::")
        navigation.navigate("GenerateNotes", { data: response?.data?.soap_notes })
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const DischargeApi = async () => {
    setLoading(true);
    const userData = {
      dialogue: speakText
    }
    try {
      const response = await AxiosHelper.post("generate_discharge_notes", userData);
      if (response) {
        navigation.navigate("GenerateNotes", { data: response?.data?.discharge_notes })
      }
      console.log("Response:", response.data.discharge_notes);
    } catch (err) {
      console.log("Error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={isTablet ? styles.tabletContainer : styles.mobileContainer}
      showsVerticalScrollIndicator={false}
    >
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.AppColor} />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {/* Microphone Button with Animation */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        }}
      >
        <View style={styles.microphoneSection}>
          <TouchableOpacity
            style={[
              styles.mikeCircle,
              isTablet && styles.mikeCircleTablet,
              { backgroundColor: isRecording ? Colors.AppColor : "#f8f9fb" },
            ]}
            onPress={toggleRecording}
            activeOpacity={0.8}
          >
            {isRecording && (
              <Animated.View
                style={[
                  styles.pulseRing,
                  isTablet && styles.pulseRingTablet,
                  {
                    transform: [{ scale: pulseAnim }],
                    opacity: pulseAnim.interpolate({
                      inputRange: [1, 1.15],
                      outputRange: [0.5, 0],
                    }),
                  },
                ]}
              />
            )}
            <Animated.Image
              style={[
                styles.mikeIcon,
                isTablet && styles.mikeIconTablet,
                { 
                  tintColor: isRecording ? Colors.white : Colors.black,
                  transform: [{ rotate: spin }]
                },
              ]}
              source={require("../../../assets/images/mike.png")}
            />
          </TouchableOpacity>
          <Text style={[styles.recordingStatus, isTablet && styles.recordingStatusTablet]}>
            {isRecording ? "🔴 Recording..." : "Tap to Start Recording"}
          </Text>
        </View>
      </Animated.View>

      {/* Doctor Notes Selection Card */}
      <Animated.View
        style={[
          styles.card,
          isTablet && styles.cardTablet,
          {
            opacity: fadeAnim,
            transform: [{ translateX: cardSlideAnim1 }],
          },
        ]}
      >
        <Text style={[styles.cardTitle, isTablet && styles.cardTitleTablet]}>
          📋 Select Note Type
        </Text>
        <Dropdown
          style={[styles.dropdown, isTablet && styles.dropdownTablet]}
          containerStyle={styles.dropdownContainer}
          data={data}
          labelField="label"
          valueField="value"
          value={value}
          onChange={item => setValue(item.value)}
          renderItem={item => (
            <View style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <Text style={[styles.itemText, isTablet && styles.itemTextTablet]}>
                  {item.label}
                </Text>
                {value === item.value && (
                  <Ionicons name="checkmark-circle" size={isTablet ? 24 : 20} color={Colors.AppColor} />
                )}
              </View>
              <View style={styles.separator} />
            </View>
          )}
          selectedTextStyle={[styles.selectedTextStyle, isTablet && styles.selectedTextStyleTablet]}
          placeholderStyle={styles.placeholderStyle}
        />
      </Animated.View>

      {/* Language Options Toggle */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateX: cardSlideAnim2 }],
        }}
      >
        <TouchableOpacity
          style={[styles.toggleButton, isTablet && styles.toggleButtonTablet]}
          onPress={() => setShowButton(!showButton)}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={showButton ? "chevron-up-circle" : "chevron-down-circle"} 
            size={isTablet ? 24 : 20} 
            color={Colors.AppColor} 
          />
          <Text style={[styles.toggleText, isTablet && styles.toggleTextTablet]}>
            {showButton ? "Hide Language Options" : "Show Language Options"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Language Selection Card */}
      {showButton && (
        <Animated.View
          style={[
            styles.card,
            isTablet && styles.cardTablet,
            {
              opacity: fadeAnim,
              transform: [{ translateX: cardSlideAnim2 }],
            },
          ]}
        >
          <View style={[styles.languageRow, isTablet && styles.languageRowTablet]}>
            <View style={styles.languageColumn}>
              <Text style={[styles.labelText, isTablet && styles.labelTextTablet]}>
                🗣️ Source Language
              </Text>
              <TouchableOpacity
                onPress={() => sourceSheetRef.current.open()}
                style={[styles.languageSelector, isTablet && styles.languageSelectorTablet]}
              >
                <Text style={[styles.languageText, isTablet && styles.languageTextTablet]}>
                  {languageOptions.find(item => item.value === sourceLang)?.label}
                </Text>
                <Ionicons name="chevron-down" size={isTablet ? 22 : 18} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.languageColumn}>
              <Text style={[styles.labelText, isTablet && styles.labelTextTablet]}>
                🌐 Translate To
              </Text>
              <TouchableOpacity
                onPress={() => targetSheetRef.current.open()}
                style={[styles.languageSelector, isTablet && styles.languageSelectorTablet]}
              >
                <Text style={[styles.languageText, isTablet && styles.languageTextTablet]}>
                  {languageOptions.find(item => item.value === targetLang)?.label}
                </Text>
                <Ionicons name="chevron-down" size={isTablet ? 22 : 18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Transcript Box */}
          <View style={styles.transcriptHeader}>
            <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
              📝 Full Transcript
            </Text>
            {speakText && (
              <TouchableOpacity
                style={[styles.clearButton, isTablet && styles.clearButtonTablet]}
                onPress={() => {
                  setSpeakText("");
                  setTranslatedText("");
                }}
              >
                <Ionicons name="trash-outline" size={isTablet ? 18 : 16} color="#666" />
                <Text style={[styles.clearText, isTablet && styles.clearTextTablet]}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.transcriptBox, isTablet && styles.transcriptBoxTablet]}>
            <ScrollView>
              <Text style={[styles.transcriptText, isTablet && styles.transcriptTextTablet]}>
                {speakText || "Your speech will appear here..."}
              </Text>
            </ScrollView>
          </View>
        </Animated.View>
      )}

      {/* Translated Text Card */}
      <Animated.View
        style={[
          styles.card,
          isTablet && styles.cardTablet,
          {
            opacity: fadeAnim,
            transform: [{ translateX: cardSlideAnim3 }],
          },
        ]}
      >
        <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
          🔄 Translated Text
        </Text>
        <View style={[styles.transcriptBox, styles.translatedBox, isTablet && styles.transcriptBoxTablet]}>
          <ScrollView>
            <Text style={[styles.transcriptText, isTablet && styles.transcriptTextTablet]}>
              {translatedText || "Translation will appear here..."}
            </Text>
          </ScrollView>
        </View>
      </Animated.View>

      {/* Generate Button */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <TouchableOpacity
          style={[
            styles.generateButton,
            isTablet && styles.generateButtonTablet,
            { backgroundColor: speakText ? Colors.AppColor : "#d0d0d0" }
          ]}
          disabled={!speakText}
          onPress={() => value === "soap" ? shopNotesApi() : DischargeApi()}
          activeOpacity={0.8}
        >
          <Ionicons name="document-text" size={isTablet ? 24 : 20} color={Colors.white} />
          <Text style={[styles.generateText, isTablet && styles.generateTextTablet]}>
            Generate Notes
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Source Language Bottom Sheet */}
      <RBSheet
        ref={sourceSheetRef}
        height={isTablet ? 400 : 350}
        openDuration={250}
        customStyles={{
          container: { 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
        }}
      >
        <View style={styles.sheetHeader}>
          <Text style={[styles.sheetTitle, isTablet && styles.sheetTitleTablet]}>
            Select Source Language
          </Text>
        </View>
        <ScrollView>
          {languageOptions.map(item => (
            <TouchableOpacity
              key={item.value}
              onPress={async () => {
                if (item.value !== sourceLang) {
                  await stopRecording();
                  setSourceLang(item.value);
                }
                sourceSheetRef.current.close();
              }}
              style={[styles.sheetItem, isTablet && styles.sheetItemTablet]}
            >
              <View style={styles.itemRow}>
                <Text style={[styles.itemText, isTablet && styles.itemTextTablet]}>
                  {item.label}
                </Text>
                {item.value === sourceLang && (
                  <Ionicons name="checkmark-circle" size={isTablet ? 28 : 24} color="#4CAF50" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

      {/* Target Language Bottom Sheet */}
      <RBSheet
        ref={targetSheetRef}
        height={isTablet ? 400 : 350}
        openDuration={250}
        customStyles={{
          container: { 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
        }}
      >
        <View style={styles.sheetHeader}>
          <Text style={[styles.sheetTitle, isTablet && styles.sheetTitleTablet]}>
            Select Target Language
          </Text>
        </View>
        <ScrollView>
          {languageOptions.map(item => (
            <TouchableOpacity
              key={item.value}
              onPress={async () => {
                if (item.value !== targetLang) {
                  await stopRecording();
                  setTargetLang(item.value);
                }
                targetSheetRef.current.close();
                setSpeakText("");
                setTranslatedText("");
              }}
              style={[styles.sheetItem, isTablet && styles.sheetItemTablet]}
            >
              <View style={styles.itemRow}>
                <Text style={[styles.itemText, isTablet && styles.itemTextTablet]}>
                  {item.label}
                </Text>
                {item.value === targetLang && (
                  <Ionicons name="checkmark-circle" size={isTablet ? 28 : 24} color="#4CAF50" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>
    </ScrollView>
  );
};

Recoder.navigationOptions = navigationOptions();

export default Recoder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  mobileContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  tabletContainer: {
    padding: 40,
    paddingBottom: 60,
    alignItems: "center",
  },
  microphoneSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  mikeCircle: {
    height: 160,
    width: 160,
    borderRadius: 80,
    shadowColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 8, // Modified
    position: "relative",
  },
  mikeCircleTablet: {
    height: 250,
    width: 250,
    borderRadius: 125,
  },
  pulseRing: {
    position: "absolute",
    height: 160,
    width: 160,
    borderRadius: 80,
    backgroundColor: Colors.AppColor,
  },
  pulseRingTablet: {
    height: 250,
    width: 250,
    borderRadius: 125,
  },
  mikeIcon: {
    height: 110,
    width: 110,
    resizeMode: "contain",
  },
  mikeIconTablet: {
    height: 160,
    width: 160,
  },
  recordingStatus: {
    fontSize: 14,
    marginTop: 15,
    fontWeight: "600",
    color: "#333",
  },
  recordingStatusTablet: {
    fontSize: 22,
    marginTop: 25,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 4, // Modified
  },
  cardTablet: {
    width: "100%",
    maxWidth: 800,
    padding: 40,
    borderRadius: 24,
    marginBottom: 35,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  cardTitleTablet: {
    fontSize: 24,
    marginBottom: 25,
  },
  dropdown: {
    height: 50,
    borderColor: "#e0e0e0",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
  },
  dropdownTablet: {
    height: 70,
    borderRadius: 16,
    paddingHorizontal: 25,
  },
  dropdownContainer: {
    borderRadius: 12,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 5, // Modified
  },
  itemContainer: {
    paddingHorizontal: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  itemText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  itemTextTablet: {
    fontSize: 20,
    paddingVertical: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "700",
  },
  selectedTextStyleTablet: {
    fontSize: 20,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#aaa",
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 0 : 3, // Modified
  },
  toggleButtonTablet: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 35,
    marginBottom: 35,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  toggleTextTablet: {
    fontSize: 18,
    marginLeft: 12,
  },
  languageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 15,
  },
  languageRowTablet: {
    marginBottom: 35,
    gap: 30,
  },
  languageColumn: {
    flex: 1,
  },
  labelText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  labelTextTablet: {
    fontSize: 18,
    marginBottom: 15,
  },
  languageSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  languageSelectorTablet: {
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 20,
  },
  languageText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  languageTextTablet: {
    fontSize: 18,
  },
  transcriptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  sectionTitleTablet: {
    fontSize: 22,
    marginBottom: 20,
  },
  transcriptBox: {
    minHeight: 100,
    maxHeight: 150,
    backgroundColor: "#fafafa",
    borderColor: "#e0e0e0",
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
  },
  transcriptBoxTablet: {
    minHeight: 180,
    maxHeight: 280,
    borderRadius: 18,
    padding: 25,
  },
  translatedBox: {
    backgroundColor: "#f0f9ff",
    borderColor: "#b3d9ff",
  },
  transcriptText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
  transcriptTextTablet: {
    fontSize: 20,
    lineHeight: 32,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  clearButtonTablet: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  clearText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  clearTextTablet: {
    fontSize: 16,
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 0 : 4, // Modified
    gap: 8,
  },
  generateButtonTablet: {
    width: "100%",
    maxWidth: 500,
    paddingVertical: 25,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginTop: 20,
    gap: 12,
  },
  generateText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
  generateTextTablet: {
    fontSize: 22,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  sheetHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  sheetTitleTablet: {
    fontSize: 24,
    paddingVertical: 10,
  },
  sheetItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 1,
  },
  sheetItemTablet: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
});