import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { Colors } from "style";
import navigationOptions from "./CreateStory.navigationOptions";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
import Voice from "@react-native-voice/voice";
import Sound from "react-native-sound";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebSocket from "react-native-websocket";
import RNFS from "react-native-fs";
import { Buffer } from "buffer";
import { ScrollView } from "react-native-gesture-handler";
import AxiosHelper from "utils/AxiosHelper";
import { useNavigation } from "@react-navigation/native";
import StorageHelper from "utils/StorageHelper";
import { LinearGradient } from "expo-linear-gradient";

const CHAT_STORAGE_KEY = "chat_messages"; // Key for storing chat data in AsyncStorage

const CreateStory = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const [recognizedText, setRecognizedText] = useState("");
  const [speakText, setSpeakText] = useState("");
  const [dasionStory, setDasionStory] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcriptData, setTranscriptData] = useState([]); // Store dynamic transcript data
  const timerRef = useRef(null);
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "YOUR_OPENAI_API_KEY";
  const wsRef = useRef(null);
  const API_KEY = "ak_f7d8a62e4b3c9m1n5p6q7r8s9t0";
  const [status, setStatus] = useState("Connecting....");
  const [audioMessages, setAudioMessages] = useState([]); // Store audio responses
  const navigation = useNavigation();

  // Setup voice recognition event handlers
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Called when speech is recognized
  const onSpeechResults = (event) => {
    if (event.value && event.value.length > 0) {
      const newText = event.value[0];
      setSpeakText(newText);
    }
  };

  // Toggle recording on/off.
  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording(false);
    } else {
      await startRecording();
    }
  };

  // Start voice recognition.
  const startRecording = async () => {
    try {
      setRecognizedText("");
      setChatResponse("");
      setIsRecording(true);
      await Voice.start("en-US");
    } catch (e) {
      if (e.message && e.message.includes("already started")) {
        console.log("Voice recognition already started, ignoring error.");
      } else {
        console.error("startRecording error:", e);
      }
    }
  };

  // Send data over server to store the story
  const sendDataOverServer = async () => {
    const userData = {
      text: speakText,
    };

    console.log("speakText",userData);

    const emailId = await StorageHelper.getItem("emailId");

    AxiosHelper.post(`api/eldercare/update_story?email=${emailId}`, userData)
      .then(async (response) => {

        const newTranscript = response?.data?.data?.transcript;
        console.log("newTranscript",response?.data);

        // Create new transcript entry
        const newEntry = {
          type: "AI-Speaker",
          timestamp: new Date().toLocaleTimeString(),
          content: speakText,
          speaker: "AI-Subject",
        };

        // Update the transcript data with the new entry
        const updatedTranscriptData = [...transcriptData, newEntry];

        // Save the updated transcript data to AsyncStorage
        await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedTranscriptData));

        // Update state to trigger re-render
        setTranscriptData(updatedTranscriptData);
        setDasionStory(newTranscript);
        console.log("Data submitted successfully:", newTranscript);
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  // Stop voice recognition
  const stopRecording = async (sendText = false) => {
    try {
      await Voice.stop();
      await Voice.cancel();
      setIsRecording(false);
      sendDataOverServer();
    } catch (e) {
      console.error("stopRecording error:", e);
      setIsRecording(false);
    }
  };

  // Load stored transcript data from AsyncStorage on mount
  useEffect(() => {
    const loadTranscriptData = async () => {
      const storedData = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setTranscriptData(parsedData);
      }
    };
    loadTranscriptData();
  }, []);

  useEffect(() => {
    // Pulse animation for mic button
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500, easing: Easing.ease }),
        withTiming(1, { duration: 500, easing: Easing.ease })
      ),
      -1, // Infinite repeat
      true
    );

    // Fade out animation for text
    opacity.value = withSequence(withTiming(0, { duration: 3000, easing: Easing.ease }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
        {transcriptData.map((data, index) => (
          <Text key={index} style={{ marginTop: 10 }}>
            {data.timestamp} - {data.content}
          </Text>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={{
          marginBottom: 50,
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
        }}
        onPress={() => {
          navigation.navigate("ShowStoryTranscript", { story: dasionStory });
        }}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          colors={["#e52d27", "#c7170b"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{"Create Your Story"}</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <Animated.View style={[styles.micButton, animatedStyle]}>
          <TouchableOpacity onPress={() => toggleRecording()}>
            <Image
              style={{ height: 180, width: 180, tintColor: Colors.AppColor }}
              source={require("../../../assets/images/LOGO_blue.png")}
            />
            <View
              style={{
                position: "absolute",
                backgroundColor: "black",
                borderRadius: 999,
                marginTop: 60,
                alignSelf: "center",
              }}
            >
              <Ionicons name="mic" size={60} color="white" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {/* <Text
        style={{
          position: "absolute",
          bottom: 100,
          marginLeft: 20,
          marginRight: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 25,
        }}
      >
        {isRecording ? "Speak" : ""}
      </Text> */}
    </View>
  );
};

CreateStory.navigationOptions = navigationOptions();
export default CreateStory;

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "column",
  },
  bottomBar: {
    marginTop: "auto",
    marginBottom: 50,
    alignItems: "center",
  },
  micButton: {
    width: 200,
    height: 200,
    borderRadius: 99999,
    backgroundColor: "#1A1A2E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
});
