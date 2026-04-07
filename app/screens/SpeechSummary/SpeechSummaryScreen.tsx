import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";

import { NavStatelessComponent } from "interfaces";

import navigationOptions from "./SpeechSummary.navigationOptions";
// Note: Kept original imports but removed unused Animated/useRef

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const SpeechSummaryScreen: NavStatelessComponent = () => {
  const [sound, setSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();

  // Animations removed: useEffect and startAnimations deleted.

  const playSound = async () => {
    // Keep your existing logic
  };

  // Mobile Layout
  const renderMobileLayout = () => (
    <View style={newStyles.container}>
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={newStyles.gradient}
      >
        {/* Static decorative circles */}
        <View style={[newStyles.decorCircle, { top: "5%", right: "10%" }]} />
        <View style={[newStyles.decorCircle, { bottom: "25%", left: "5%", width: 100, height: 100 }]} />
        <View style={[newStyles.decorCircle, { top: "40%", right: "5%", width: 80, height: 80 }]} />

        {/* Header - No fade or slide */}
        <View style={[newStyles.headerCard, { opacity: 1 }]}>
          <View style={newStyles.headerContent}>
            <View style={newStyles.headerIconContainer}>
              <Text style={newStyles.headerIcon}>🎧</Text>
            </View>
            <View>
              <Text style={newStyles.headerTitle}>Always Here to Listen</Text>
              <Text style={newStyles.headerSubtitle}>Voice Assistant</Text>
            </View>
          </View>
        </View>

        {/* Logo Section - Static Scale */}
        <View style={[newStyles.logoSection, { opacity: 1 }]}>
          <View style={newStyles.logoCard}>
            <Image
              style={newStyles.logoImage}
              source={require("../../../assets/images/LOGO_blue.png")}
            />
          </View>
          <Image
            style={newStyles.bannerImage}
            source={require("../../../assets/images/Logo_banner.png")}
          />
        </View>

        {/* Main Microphone - No Pulse */}
        <View style={[newStyles.micSection, { opacity: 1 }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => WebBrowser.openBrowserAsync("https://dasion-guider.com/soapnotes")}
          >
            <LinearGradient
              colors={["#e94560", "#ff6b6b", "#ee5a6f"]}
              style={newStyles.micButton}
            >
              <View style={newStyles.micInner}>
                <Image
                  style={newStyles.micIcon}
                  source={
                    isRecording
                      ? require("../../../assets/images/microphone.png")
                      : require("../../../assets/images/mike.png")
                  }
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {sound && (
            <TouchableOpacity style={newStyles.playButton} onPress={playSound}>
              <LinearGradient colors={["#4facfe", "#00f2fe"]} style={newStyles.playGradient}>
                <Image
                  style={newStyles.playIcon}
                  source={
                    isPlaying
                      ? require("../../../assets/images/pause.png")
                      : require("../../../assets/images/play.png")
                  }
                />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        {/* Text Section */}
        {/* {isTablet &&
        } */}
        <View style={[newStyles.textSection, { opacity: 1 }]}>
          {/* <Text style={newStyles.mainText}>Family</Text> */}
          {/* <Text style={newStyles.subText}>Meetings & Chats</Text> */}
        </View>

        {/* Music Wave - Static */}
        {/* <View style={{ alignItems: "center", opacity: 1 }}>
          <Image
            style={newStyles.musicWave}
            source={require("../../../assets/images/musicWave.png")}
          />
        </View> */}

        {/* Bottom Action Cards */}
        <View style={[newStyles.actionContainer, { opacity: 1 }]}>
          <TouchableOpacity
            style={newStyles.actionCard}
            onPress={() => WebBrowser.openBrowserAsync("https://zoomserverload.dasion-training.com/video")}
          >
            <LinearGradient colors={["#667eea", "#764ba2"]} style={newStyles.actionGradient}>
              <Image
                style={newStyles.actionIcon}
                source={require("../../../assets/images/zoomIcon.png")}
              />
              <Text style={newStyles.actionText}>Video Call</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={newStyles.actionCard}
            onPress={() => navigation.navigate("CategorySelection")}
          >
            <LinearGradient colors={["#f093fb", "#f5576c"]} style={newStyles.actionGradient}>
              <Text style={newStyles.actionIcon}>📋</Text>
              <Text style={newStyles.actionText}>Related Conditions</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  // Tablet Layout
  const renderTabletLayout = () => (
    <View style={newStyles.container}>
      <LinearGradient colors={["#1a1a2e", "#16213e", "#0f3460"]} style={newStyles.gradient}>
        <View style={[newStyles.decorCircle, { top: "10%", left: "8%", width: 200, height: 200 }]} />
        <View style={[newStyles.decorCircle, { bottom: "15%", right: "10%", width: 180, height: 180 }]} />

        <View style={[newStyles.headerCardTablet, { opacity: 1 }]}>
          <View style={newStyles.headerContentTablet}>
            <View style={newStyles.headerIconContainerTablet}>
              <Text style={newStyles.headerIconTablet}>🎧</Text>
            </View>
            <View>
              <Text style={newStyles.headerTitleTablet}>Always Here to Listen</Text>
              <Text style={newStyles.headerSubtitleTablet}>Voice Assistant</Text>
            </View>
          </View>
        </View>

        <View style={newStyles.tabletContent}>
          <View style={[newStyles.leftPanel, { opacity: 1 }]}>
            <View style={newStyles.logoCardTablet}>
              <Image
                style={newStyles.logoImageTablet}
                source={require("../../../assets/images/LOGO_blue.png")}
              />
            </View>
            <Image
              style={newStyles.bannerImageTablet}
              source={require("../../../assets/images/Logo_banner.png")}
            />
            <View style={newStyles.textSectionTablet}>
              <Text style={newStyles.mainTextTablet}>Family</Text>
              <Text style={newStyles.subTextTablet}>Meetings & Chats</Text>
            </View>
          </View>

          <View style={[newStyles.rightPanel, { opacity: 1 }]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => WebBrowser.openBrowserAsync("https://dasion-guider.com/soapnotes")}
            >
              <LinearGradient colors={["#e94560", "#ff6b6b", "#ee5a6f"]} style={newStyles.micButtonTablet}>
                <View style={newStyles.micInnerTablet}>
                  <Image
                    style={newStyles.micIconTablet}
                    source={
                      isRecording
                        ? require("../../../assets/images/microphone.png")
                        : require("../../../assets/images/mike.png")
                    }
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <View style={newStyles.tabletActions}>
              <TouchableOpacity
                style={newStyles.actionCardTablet}
                onPress={() => WebBrowser.openBrowserAsync("https://zoomserverload.dasion-training.com/video")}
              >
                <LinearGradient colors={["#667eea", "#764ba2"]} style={newStyles.actionGradientTablet}>
                  <Image
                    style={newStyles.actionIconTablet}
                    source={require("../../../assets/images/zoomIcon.png")}
                  />
                  <Text style={newStyles.actionTextTablet}>Video Call</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={newStyles.actionCardTablet}
                onPress={() => navigation.navigate("CategorySelection")}
              >
                <LinearGradient colors={["#f093fb", "#f5576c"]} style={newStyles.actionGradientTablet}>
                  <Text style={newStyles.actionIconTablet}>📋</Text>
                  <Text style={newStyles.actionTextTablet}>Related Conditions</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return isTablet ? renderTabletLayout() : renderMobileLayout();
};

// ... Styles remain the same as your original provided code ...

const newStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  
  // Decorative circles
  decorCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.2)",
  },

  // Mobile Header
  headerCard: {
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 3,
  },

  // Logo Section
  logoSection: {
    alignItems: "center",
    marginTop: 30,
  },
  logoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 40,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  bannerImage: {
    width: 80,
    height: 50,
    marginTop: 20,
    tintColor: "#ffffff",
    resizeMode: "contain", },

  // Microphone Section
  micSection: {
    alignItems: "center",
    marginTop: 40,
  },
  micButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    padding: 4,
    shadowColor: "#e94560",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
  },
  micInner: {
    flex: 1,
    borderRadius: 61,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  micIcon: {
    width: 60,
    height: 60,
    tintColor: "#e94560",
  },
  playButton: {
    marginTop: 25,
    borderRadius: 25,
    shadowColor: "#4facfe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  playGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  playIcon: {
    width: 30,
    height: 30,
    tintColor: "#ffffff",
  },

  // Text Section
  textSection: {
    alignItems: "center",
    marginTop: 35,
  },
  mainText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subText: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 8,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  // Music Wave
  musicWave: {
    width: 140,
    height: 55,
    marginTop: 25,
    tintColor: "rgba(255, 255, 255, 0.5)",
  },

  // Action Buttons
  actionContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: "auto",
    marginBottom: 30,
    gap: 15,
  },
  actionCard: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionGradient: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    width: 35,
    height: 35,
    tintColor: "#ffffff",
    marginBottom: 8,
  },
  actionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  // Tablet Styles
  headerCardTablet: {
    marginTop: 60,
    marginHorizontal: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  headerContentTablet: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconContainerTablet: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  headerIconTablet: {
    fontSize: 36,
  },
  headerTitleTablet: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSubtitleTablet: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },

  tabletContent: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 40,
  },

  leftPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 30,
  },
  logoCardTablet: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 60,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
  },
  logoImageTablet: {
    width: 100,
    height: 100,
  },
  bannerImageTablet: {
    width: 200,
    height: 80,
    marginTop: 35,
    tintColor: "#ffffff",
    resizeMode: "contain",
  },
  textSectionTablet: {
    alignItems: "center",
    marginTop: 45,
  },
  mainTextTablet: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subTextTablet: {
    fontSize: 40,
    color: "#ffffff",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  musicWaveTablet: {
    width: 200,
    height: 80,
    marginTop: 35,
    tintColor: "rgba(255, 255, 255, 0.5)",
  },

  rightPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
  },
  micButtonTablet: {
    width: 200,
    height: 200,
    borderRadius: 100,
    padding: 5,
    shadowColor: "#e94560",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 20,
  },
  micInnerTablet: {
    flex: 1,
    borderRadius: 95,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  micIconTablet: {
    width: 100,
    height: 100,
    tintColor: "#e94560",
  },

  tabletActions: {
    flexDirection: "row",
    marginTop: 50,
    gap: 20,
  },
  actionCardTablet: {
    minWidth: 200,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  actionGradientTablet: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIconTablet: {
    width: 45,
    height: 45,
    tintColor: "#ffffff",
    marginBottom: 10,
  },
  actionTextTablet: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

SpeechSummaryScreen.navigationOptions = navigationOptions;
export default SpeechSummaryScreen;