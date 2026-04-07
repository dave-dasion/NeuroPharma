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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
  withDelay,
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
import Voice from "@react-native-voice/voice";
import Sound from "react-native-sound";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebSocket from "react-native-websocket";
import RNFS from "react-native-fs";
import { Buffer } from "buffer";
import { ScrollView } from "react-native-gesture-handler";
import { yellow100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Application from "expo-application";
import * as Device from "expo-device";

import StorageHelper from "utils/StorageHelper";
import { Colors } from "style";

import navigationOptions from "./VoiceChat.navigationOptions";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

const messages = [
  { id: "1", type: "sent", time: "10:30 AM" },
  { id: "2", type: "received", time: "10:32 AM" },
  { id: "3", type: "sent", time: "10:35 AM" },
  { id: "4", type: "received", time: "10:37 AM" },
  { id: "5", type: "sent", time: "10:40 AM" },
  { id: "6", type: "received", time: "10:42 AM" },
];

const VoiceMessage = ({ type, time }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={[styles.message, type === "sent" ? styles.sent : styles.received]}>
      <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={isTablet ? 32 : 24}
          color={type === "sent" ? "white" : "black"}
        />
      </TouchableOpacity>
      <Image style={styles.musicWave} source={require("../../../assets/images/musicWave.png")} />
      <Text style={[type === "sent" ? styles.time1 : styles.time, isTablet && styles.tabletTimeTextShared]}>{time}</Text>
    </View>
  );
};

// Animated Message Component
const AnimatedMessage = ({ data, index }) => {
  const isAI = data.owner === "ai";

  return (
    <Animated.View
      entering={isAI ? SlideInLeft.delay(index * 100).springify() : SlideInRight.delay(index * 100).springify()}
      style={[
        styles.messageContainer,
        isAI ? styles.aiMessage : styles.userMessage,
        isTablet && styles.tabletMessage
      ]}
    >
      {isTablet && isAI && (
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={54} color={Colors.AppColor} />
        </View>
      )}
      <View style={[styles.messageBubble, isAI ? styles.aiBubble : styles.userBubble, isTablet && styles.tabletBubble]}>
        <Text style={[styles.messageOwner, isTablet && styles.tabletMessageOwner]}>{isAI ? "Dasion" : "Me"}</Text>
        <Text style={[styles.messageText, isAI ? styles.aiText : styles.userText, isTablet && styles.tabletMessageText]}>
          {data.text}
        </Text>
      </View>
      {isTablet && !isAI && (
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={54} color="#666" />
        </View>
      )}
    </Animated.View>
  );
};

// Animated Pulse Rings Component
const PulseRings = ({ isRecording }) => {
  const ring1 = useSharedValue(1);
  const ring2 = useSharedValue(1);
  const ring3 = useSharedValue(1);
  const opacity1 = useSharedValue(0.6);
  const opacity2 = useSharedValue(0.4);
  const opacity3 = useSharedValue(0.2);

  useEffect(() => {
    if (isRecording) {
      ring1.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 1000, easing: Easing.ease }),
          withTiming(1, { duration: 1000, easing: Easing.ease })
        ),
        -1,
        true
      );

      ring2.value = withRepeat(
        withSequence(
          withDelay(200, withTiming(1.5, { duration: 1000, easing: Easing.ease })),
          withTiming(1, { duration: 1000, easing: Easing.ease })
        ),
        -1,
        true
      );

      ring3.value = withRepeat(
        withSequence(
          withDelay(400, withTiming(1.7, { duration: 1000, easing: Easing.ease })),
          withTiming(1, { duration: 1000, easing: Easing.ease })
        ),
        -1,
        true
      );
    } else {
      ring1.value = withTiming(1, { duration: 300 });
      ring2.value = withTiming(1, { duration: 300 });
      ring3.value = withTiming(1, { duration: 300 });
    }
  }, [isRecording]);

  const animatedRing1 = useAnimatedStyle(() => ({
    transform: [{ scale: ring1.value }],
    opacity: isRecording ? opacity1.value : 0,
  }));

  const animatedRing2 = useAnimatedStyle(() => ({
    transform: [{ scale: ring2.value }],
    opacity: isRecording ? opacity2.value : 0,
  }));

  const animatedRing3 = useAnimatedStyle(() => ({
    transform: [{ scale: ring3.value }],
    opacity: isRecording ? opacity3.value : 0,
  }));

  return (
    <>
      <Animated.View style={[styles.pulseRing, isTablet && styles.tabletPulseRing, animatedRing3]} />
      <Animated.View style={[styles.pulseRing, isTablet && styles.tabletPulseRing, animatedRing2]} />
      <Animated.View style={[styles.pulseRing, isTablet && styles.tabletPulseRing, animatedRing1]} />
    </>
  );
};

let soundInstance = null;

const VoiceChat = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const buttonRotation = useSharedValue(0);

  const [recognizedText, setRecognizedText] = useState("");
  const [speakText, setSpeakText] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const timerRef = useRef(null);
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "YOUR_OPENAI_API_KEY";
  const CHAT_STORAGE_KEY = "chat_messages";
  const wsRef = useRef(null);
  const API_KEY = "ak_f7d8a62e4b3c9m1n5p6q7r8s9t0";
  const [status, setStatus] = useState("Connecting....");
  const [WS_URL, setWS_URL] = useState("");
  const [audioMessages, setAudioMessages] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [soundInstanceState, setSoundInstanceState] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    setWebSocketURL();
    Voice.onSpeechResults = onSpeechResults;

    // Initialize animations
    initializeAnimations();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Re-trigger animations when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      initializeAnimations();
      return () => {
        // Cleanup animations on blur
      };
    }, [])
  );

  const initializeAnimations = () => {
    // Gentle breathing animation for mic button when idle
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Subtle rotation animation
    buttonRotation.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  };

  const setWebSocketURL = async () => {
    const emailId = await StorageHelper.getItem("emailId");
    console.log("📧 emailId:", emailId);

    if (!emailId) {
      console.log("❌ Email ID missing");
      return;
    }

    let uniqueId;

    if (Platform.OS === "android") {
      uniqueId = await Application.getAndroidId();
    } else {
      uniqueId = await Application.getIosIdForVendorAsync();
    }

    console.log("📱 uniqueId:", uniqueId);

    if (!uniqueId) {
      console.log("❌ Device ID missing");
      return;
    }

    const url = `wss://nodeapi.dasion-training.com/web-connection-text?apiKey=${API_KEY}&email=${encodeURIComponent(
      emailId
    )}&deviceId=${uniqueId}`;

    console.log("🔗 WS URL:", url);
    setWS_URL(url);
  };

  const onSpeechResults = (event) => {
    if (event.value && event.value.length > 0) {
      const newText = event.value[0];
      setSpeakText(newText);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      console.log("if condition");
      await stopRecording(false);
    } else {
      console.log("else condition");
      await startRecording();
    }
  };

  const startRecording = async () => {
    setSeconds(0);
    stopAudio();
    setIsRunning(!isRunning);

    // Trigger recording animation
    scale.value = withSpring(1.2, { damping: 5 });

    try {
      console.log("startRecording", recognizedText);
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

  const stopRecording = async (sendText = false) => {
    setIsRunning(!isRunning);

    // Reset animation
    scale.value = withSpring(1, { damping: 8 });

    try {
      console.log("stopRecording", recognizedText, speakText);
      await Voice.stop();
      await Voice.cancel();
      setIsRecording(false);

      wsRef.current.send(
        JSON.stringify({
          type: "text",
          text: speakText,
        })
      );

      setAudioMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: speakText, owner: "me" },
      ]);
      setIsWaiting(true);
    } catch (e) {
      console.error("stopRecording error:", e);
      setIsRecording(false);
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      stopAudio();
    });

    return () => {
      console.log("I am here in return");
      unsubscribe();
      stopAudio();
    };
  }, [navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${buttonRotation.value}deg` }
      ],
    };
  });

  const stopAudio = () => {
    console.log("soundInstance", soundInstance);
    if (soundInstance) {
      soundInstance.stop(() => {
        console.log("Audio stopped.");
      });
      soundInstance.release();
      soundInstance = null;
    }
  };

  const playAudio = async (base64AudioString) => {
    try {
      if (!base64AudioString) {
        console.error("No audio data received.");
        return;
      }

      const filePath = `${RNFS.DocumentDirectoryPath}/temp_audio.wav`;
      await RNFS.writeFile(filePath, base64AudioString, "base64");

      if (Platform.OS === "ios") {
        Sound.setCategory("Playback");
      }

      return new Promise((resolve, reject) => {
        soundInstance = new Sound(filePath, "", async (error) => {
          if (error) {
            console.error("Failed to load sound", error);
            setIsLoading(false);
            reject(error);
            return;
          }
          console.log("Sound loaded, now playing audio");
          setIsLoading(false);
          soundInstance.play(async (success) => {
            if (!success) {
              console.error("Sound playback failed");
            }
            soundInstance.release();
            soundInstance = null;
          });
        });
        setSoundInstanceState(soundInstance);
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const onMessageHandler = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("📩 WS Message:", data);

      if (data.type === "connected") {
        console.log("Server confirmed connection");
      }

      if (data.type === "audio") {
        setAudioMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), text: data.label, owner: "ai" },
        ]);

        playAudio(data.audiobase64);
        setIsWaiting(false);
      }
    } catch (err) {
      console.error("❌ WS Parse Error", err);
    }
  };

  return (
    <View style={[styles.container, isTablet && styles.tabletContainer]}>
      <Animated.View
        entering={FadeInDown.duration(600).springify()}
        style={styles.headerContainer}
      >
        <Text style={[styles.headerText, isTablet && styles.tabletHeaderText]}>
          Chat with your NeuroPharma virtual assistant for expert neurological insights, medication guidance, and real-time support. Simply ask, and receive personalized care and assistance anytime!        </Text>
      </Animated.View>

      <View style={[styles.chatContainer, isTablet && styles.tabletChatContainer]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {audioMessages.length === 0 ? null : (
            audioMessages.map((data, index) => (
              <AnimatedMessage key={data.id} data={data} index={index} />
            ))
          )}
        </ScrollView>
      </View>

      {(audioMessages.length === 0 && isRecording === false) && (
        <Animated.Text
          entering={FadeIn.delay(300).duration(800)}
          style={[styles.instructionText, isTablet && styles.tabletInstructionText]}
        >
          Tap the button below to start your conversation
        </Animated.Text>
      )}

      {isRecording && (
        <Animated.View entering={FadeInUp.springify()} style={styles.recordingContainer}>
          <Text style={[styles.recordingText, isTablet && styles.tabletText]}>
            Listening...
          </Text>
          <Text style={[styles.timerText, isTablet && styles.tabletTimerText]}>
            {formatTime(seconds)}
          </Text>
        </Animated.View>
      )}

      {isWaiting && (
        <Animated.View entering={FadeInUp.springify()} style={styles.waitingContainer}>
          <Text style={[styles.waitingText, isTablet && styles.tabletText]}>
            Emily is thinking... Just a moment!
          </Text>
        </Animated.View>
      )}

      <View style={[styles.bottomBar, isTablet && styles.tabletBottomBar]}>
        <PulseRings isRecording={isRecording} />
        <Animated.View style={[styles.micButton, isTablet && styles.tabletMicButton, animatedStyle]}>
          <TouchableOpacity
            onPress={toggleRecording}
            disabled={isWaiting}
            activeOpacity={0.8}
          >
            <Image
              style={[
                styles.logoImage,
                isTablet && styles.tabletLogoImage,
                { tintColor: isWaiting ? "#ccc" : Colors.AppColor }
              ]}
              source={require("../../../assets/images/LOGO_blue.png")}
            />
            <View style={[styles.micIconContainer, isTablet && styles.tabletMicIconContainer]}>
              <Ionicons
                name={isRecording ? "mic-off" : "mic"}
                size={isTablet ? 90 : 60}
                color={isWaiting ? "#999" : "white"}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {WS_URL !== "" && (
        <WebSocket
          url={WS_URL}
          onOpen={() => {
            console.log("✅ WebSocket Connected");
            setStatus("Connected");
          }}
          onMessage={onMessageHandler}
          onClose={(e) => {
            console.log("❌ WebSocket Closed", e.code, e.reason);
            setStatus("Disconnected");
          }}
          onError={(e) => {
            console.log("🚨 WebSocket Error", e.message);
            setStatus("Error");
          }}
          ref={(ws) => (wsRef.current = ws)}
          reconnect
        />
      )}
    </View>
  );
};

VoiceChat.navigationOptions = navigationOptions();
export default VoiceChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  tabletContainer: {
    padding: 32,
    paddingHorizontal: 80,
  },
  headerContainer: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 17,
    textAlign: "center",
    color: "#555",
    lineHeight: 22,
  },
  tabletHeaderText: {
    fontSize: 26,
    lineHeight: 32,
    maxWidth: 900,
    alignSelf: "center",
  },
  chatContainer: {
    flex: 1,
    marginBottom: 20,
  },
  tabletChatContainer: {
    maxWidth: 1000,
    alignSelf: "center",
    width: "100%",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "flex-end",
  },
  tabletMessage: {
    marginVertical: 18,
  },
  aiMessage: {
    alignSelf: "flex-start",
    paddingRight: 60,
  },
  userMessage: {
    alignSelf: "flex-end",
    paddingLeft: 60,
    flexDirection: "row-reverse",
  },
  avatarContainer: {
    marginHorizontal: 8,
  },
  messageBubble: {
    padding: 16,
    borderRadius: 20,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabletBubble: {
    padding: 24,
    borderRadius: 28,
    maxWidth: "80%",
  },
  aiBubble: {
    backgroundColor: "#E3F2FD",
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Colors.AppColor,
    borderBottomRightRadius: 4,
  },
  messageOwner: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    opacity: 0.7,
  },
  tabletMessageOwner: {
    fontSize: 16,
    marginBottom: 6,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  tabletMessageText: {
    fontSize: 20,
    lineHeight: 28,
  },
  aiText: {
    color: "#333",
  },
  userText: {
    color: "#FFF",
  },
  instructionText: {
    marginBottom: 30,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  tabletInstructionText: {
    fontSize: 22,
    marginBottom: 60,
  },
  recordingContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  recordingText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.AppColor,
    fontVariant: ["tabular-nums"],
  },
  tabletTimerText: {
    fontSize: 84,
  },
  waitingContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  waitingText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  tabletText: {
    fontSize: 24,
  },
  bottomBar: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  tabletBottomBar: {
    marginBottom: 60,
  },
  pulseRing: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.AppColor,
    backgroundColor: "transparent",
  },
  tabletPulseRing: {
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  micButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#1A1A2E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.AppColor,
    shadowColor: Colors.AppColor,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
  },
  tabletMicButton: {
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 5,
  },
  logoImage: {
    height: 180,
    width: 180,
  },
  tabletLogoImage: {
    height: 280,
    width: 280,
  },
  micIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 999,
    marginTop: 56,
    alignSelf: "center",
    padding: 4,
  },
  tabletMicIconContainer: {
    marginTop: 88,
    padding: 10,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: Colors.AppColor,
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  time: {
    marginLeft: 10,
    fontSize: 12,
    color: "gray",
  },
  time1: {
    marginLeft: 10,
    fontSize: 13,
    color: Colors.white,
  },
  tabletTimeTextShared: {
    fontSize: 16,
  },
  musicWave: {
    height: 30,
    width: "60%",
  },
});