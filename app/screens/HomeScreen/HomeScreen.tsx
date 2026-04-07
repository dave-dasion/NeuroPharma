import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
  useWindowDimensions,
  Dimensions,
  Platform,
  Linking,
  Animated,
  Easing
} from "react-native";
import { Checkbox } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { t } from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { TabBarIcon } from "components";
import { navigate } from "navigation";
import { Colors, Font } from "style";
import { ImagesAssets } from "constant";
import { NavStatelessComponent } from "interfaces";

import navigationOptions from "./HomeScreen.navigationOptions";

const { width, height } = Dimensions.get("window");

const HomeScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const isTablet = dimensions.width >= 768;

  const [sound, setSound] = useState(null);
  const [recording, setRecording] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const microphoneScale = useRef(new Animated.Value(1)).current;
  const microphoneRotate = useRef(new Animated.Value(0)).current;
  const logoFade = useRef(new Animated.Value(0)).current;
  const buttonsSlide = useRef(new Animated.Value(100)).current;
  const tabsSlide = useRef(new Animated.Value(100)).current;

  // Reset and start animations whenever screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Reset all animations
      fadeAnim.setValue(0);
      slideAnim.setValue(-100);
      scaleAnim.setValue(0.3);
      microphoneScale.setValue(0.3);
      microphoneRotate.setValue(0);
      logoFade.setValue(0);
      buttonsSlide.setValue(100);
      tabsSlide.setValue(100);

      // Start animations
      startAnimations();

      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  const startAnimations = () => {
    // Parallel animations for smooth entrance
    Animated.parallel([
      // Header fade and slide
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      // Microphone scale with bounce
      Animated.spring(microphoneScale, {
        toValue: 1,
        tension: 40,
        friction: 5,
        delay: 300,
        useNativeDriver: true,
      }),
      // Microphone rotation
      Animated.timing(microphoneRotate, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      // Logo fade
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
      // Buttons slide
      Animated.spring(buttonsSlide, {
        toValue: 0,
        tension: 50,
        friction: 8,
        delay: 700,
        useNativeDriver: true,
      }),
      // Tabs slide
      Animated.spring(tabsSlide, {
        toValue: 0,
        tension: 50,
        friction: 8,
        delay: 900,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous breathing animation for microphone
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("REFRESH_TOKEN");
        const value = await AsyncStorage.getItem("isAdmin");
        setIsAdmin(JSON.parse(value));
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  const handlePress = (tab) => {
    console.log(`${tab} pressed`);
    (navigation as any).navigate(tab);
  };

  const openHomeScreen = () => {
    if (isAdmin == "3") {
      (navigation as any).reset({
        index: 0,
        routes: [{ name: "AdminPage" }],
      });
    } else {
      (navigation as any).reset({
        index: 0,
        routes: [{ name: "BottomTab" }],
      });
    }
  };

  const playSound = async () => {
    // Sound implementation
  };

  const micRotate = microphoneRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Responsive styles
  const responsiveStyles = getResponsiveStyles(isTablet);

  return (
    <>
      <View style={[styles.mainContainer, { height: dimensions.height }]}>
        <StatusBar style="dark" />

        {/* Background Image with fade */}
        <Animated.Image
          style={[
            responsiveStyles.splashImg,
            { opacity: fadeAnim }
          ]}
          source={require("../../../assets/images/NeuroPharma.png")}
        />

        {/* Header with slide animation */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={25} color="#000" />
          </TouchableOpacity> */}
          <Text style={responsiveStyles.headerTitle}>
            AI for Drug Discovery & Clinical Intelligence
          </Text>
        </Animated.View>



        {/* Microphone with multiple animations */}
        <View
          style={[
            responsiveStyles.PlayRowView,
          ]}
        >
          <TouchableOpacity
            style={responsiveStyles.circleView}
            activeOpacity={0.9}
            onPress={() => {
              token == null
                ? (navigation as any).navigate("LoginScreen")
                : (navigation as any).navigate("Recoder");
            }}
          >
            <Ionicons
              name={isRecording ? "mic" : "mic-outline"}
              size={isTablet ? 70 : 40}
              color="#000"
            />
          </TouchableOpacity>
          {sound && (
            <TouchableOpacity onPress={playSound} style={styles.playBtn}>
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={40}
                color={Colors.AppColor}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Logo with fade */}
        <Animated.Image
          style={[
            responsiveStyles.nmfImage,
            { opacity: logoFade }
          ]}
          source={require("../../../assets/images/logos/nmf.png")}
        />

        {/* Action Buttons with slide animation */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: isTablet ? "15%" : "10%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: isTablet ? 100 : 20,
            transform: [{ translateY: buttonsSlide }]
          }}
        >
          <TouchableOpacity
            style={responsiveStyles.actionButton}
            onPress={() => {
              Linking.openURL(`tel:${911}`);
            }}
          >
            <Text style={responsiveStyles.actionButtonText}>{"Call 911"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={responsiveStyles.actionButton}
            onPress={() => {
              (navigation as any).navigate("VoiceChat");
            }}
          >
            <Text style={responsiveStyles.actionButtonText}>{"Talk to me!"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={responsiveStyles.actionButton}
            onPress={() => (navigation as any).navigate("TeamScreen")}
          >
            <Text style={responsiveStyles.actionButtonText}>{"Health Reports"}</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Start Button with slide animation */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: isTablet ? "5%" : "3%",
            width: "100%",
            paddingHorizontal: isTablet ? 100 : 40,
            transform: [{ translateY: tabsSlide }]
          }}
        >
          <TouchableOpacity
            style={styles.mainStartButton}
            onPress={() => token ? openHomeScreen() : (navigation as any).navigate("LoginScreen")}
          >
            <LinearGradient
              colors={['#79cbf7', '#2196f3']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.startButtonText}>
                {token ? "ENTER NEUROPHARMA LAB" : "GET STARTED"}
              </Text>
              <Ionicons name="arrow-forward" size={24} color="white" style={{ marginLeft: 10 }} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

const getResponsiveStyles = (isTablet) => {
  return StyleSheet.create({
    headerTitle: {
      fontSize: isTablet ? 24 : 17,
      fontWeight: "700",
      color: Colors.black,
      textAlign: "center",
      bottom: 10,
      paddingHorizontal: isTablet ? 40 : 20,
    },
    brainText: {
      fontSize: isTablet ? 50 : 35,
      color: Colors.black,
      fontFamily: Font.FontWeight.Bold,
    },
    splashImg: {
      height: isTablet ? "70%" : "80%",
      width: isTablet ? "60%" : "95%",
      resizeMode: "contain",
      alignSelf: "center",
      position: "absolute",
      bottom: isTablet ? 150 : 190,
    },
    nmfImage: {
      height: isTablet ? 120 : 80,
      width: isTablet ? 350 : 250,
      resizeMode: "cover",
      tintColor: Colors.black,
      alignSelf: "center",
      position: "absolute",
      bottom: isTablet ? 250 : 180,
      // shadowColor: Colors.black,
      // shadowOffset: { width: 10, height: 10 },
      // shadowOpacity: 1,
      // shadowRadius: 20,
      elevation: 8,
    },
    PlayRowView: {
      flexDirection: "row",
      alignSelf: "center",
      position: "absolute",
      top: isTablet ? "50%" : "63%",
      right: isTablet ? "15%" : "40%",
    },
    circleView: {
      height: isTablet ? 180 : 80,
      width: isTablet ? 180 : 80,
      borderRadius: isTablet ? 90 : 65,
      // shadowColor: Colors.black,
      // shadowOffset: { width: 10, height: 10 },
      // shadowOpacity: 1,
      // shadowRadius: 20,
      backgroundColor: Colors.AppColor,
      justifyContent: "center",
      alignItems: "center",
      // elevation: 10,
    },
    microphoneIcon: {
      height: isTablet ? 140 : 60,
      width: isTablet ? 140 : 60,
      resizeMode: "contain",
      tintColor: Colors.black,
    },
    actionButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.AppColor,
      borderRadius: 15,
      paddingVertical: isTablet ? 18 : 12,
      paddingHorizontal: isTablet ? 30 : 10,
      minWidth: isTablet ? 150 : 100,
      shadowColor: Colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    actionButtonText: {
      fontSize: isTablet ? 20 : 17,
      fontWeight: "700",
      color: Colors.black,
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingTop: isTablet ? "1.5%" : "3%",
      height: isTablet ? 120 : 90,
      backgroundColor: "#fff",
      elevation: 5,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: isTablet ? 15 : 5,
    },
    icon: {
      width: isTablet ? 45 : 30,
      height: isTablet ? 45 : 30,
      resizeMode: "contain",
    },
    label: {
      fontSize: isTablet ? 14 : 10,
      color: "#000",
      marginTop: isTablet ? 8 : 3,
      textAlign: "center",
    },
  });
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backIcon: {
    height: 25,
    width: 25,
    tintColor: Colors.white,
  },
  firstView: {
    height: 55,
    width: "100%",
    backgroundColor: Colors.AppColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "ios" ? 11 : 40,
  },
  playIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: Colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: "transparent",
    marginTop: Platform.OS == "ios" ? 50 : 10,
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  playBtn: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainStartButton: {
    width: "100%",
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
});

HomeScreen.navigationOptions = navigationOptions();

export default HomeScreen;