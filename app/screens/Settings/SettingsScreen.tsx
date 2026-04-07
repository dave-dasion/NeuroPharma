import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ExpoConstants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardForm } from "@stripe/stripe-react-native";
import { Ionicons } from "@expo/vector-icons";

import { ImagesAssets } from "constant";
import { Button, Text, SocialMedia } from "components";
import { t, platform } from "utils";
import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";

import quotes from "../../../assets/quotes/quotes.json";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;
const quoteIndex = Math.floor(Math.random() * quotes.length);

const SettingsScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const bottomSheetModalRef = useRef<any>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  /* =========================
     ANIMATION VALUES
  ========================= */

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  // Scale only on iOS (Android stays 1)
  const scaleAnim = useRef(
    new Animated.Value(Platform.OS === "android" ? 1 : 0.8)
  ).current;

  const [itemAnimations] = useState(
    Array.from({ length: 20 }, () => ({
      opacity: new Animated.Value(0),
      translateX: new Animated.Value(isTablet ? -100 : -50),
      scale: new Animated.Value(
        Platform.OS === "android" ? 1 : 0.9
      ),
    }))
  );

  /* =========================
     SCREEN FOCUS ANIMATION
  ========================= */

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      slideAnim.setValue(-50);
      scaleAnim.setValue(Platform.OS === "android" ? 1 : 0.8);

      itemAnimations.forEach((anim) => {
        anim.opacity.setValue(0);
        anim.translateX.setValue(isTablet ? -100 : -50);
        anim.scale.setValue(Platform.OS === "android" ? 1 : 0.9);
      });

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        ...(Platform.OS === "ios"
          ? [
            Animated.spring(scaleAnim, {
              toValue: 1,
              friction: 8,
              useNativeDriver: true,
            }),
          ]
          : []),
      ]).start();

      const staggered = itemAnimations.map((anim) =>
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(anim.translateX, {
            toValue: 0,
            friction: 8,
            useNativeDriver: true,
          }),
          ...(Platform.OS === "ios"
            ? [
              Animated.spring(anim.scale, {
                toValue: 1,
                friction: 8,
                useNativeDriver: true,
              }),
            ]
            : []),
        ])
      );

      Animated.stagger(isTablet ? 40 : 60, staggered).start();
    }, [])
  );

  /* =========================
     LOGOUT
  ========================= */

  const openAlert = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Ok",
        onPress: async () => {
          navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
          await AsyncStorage.removeItem("REFRESH_TOKEN");
        },
      },
    ]);
  };

  const rowItems = [
    { title: "Billing", onPress: () => navigation.push("Billing"), icon: "card-outline" },
    { title: t("SETTINGS_SCREEN_REMAINDER"), onPress: navigator.openRemainder, icon: "notifications-outline" },
    { title: "About This App", onPress: navigator.openAbout, icon: "information-circle-outline" },
    {
      isSwitchItem: true,
      title: "Unlock Premium Features",
      value: isEnabled,
      onChange: () => (isEnabled ? setIsEnabled(false) : bottomSheetModalRef.current?.open()),
      icon: "star-outline"
    },
    { title: t("SETTINGS_SCREEN_SUPPORT_US"), onPress: navigator.openSupportUs, icon: "heart-outline" },
    { title: "Data to Decision", onPress: () => WebBrowser.openBrowserAsync("https://data-to-decision.com/"), icon: "globe-outline" },
    { title: "About DASION", onPress: () => WebBrowser.openBrowserAsync("https://data-to-decision.com/about.html"), icon: "map-outline" },
    { title: "Terms of use", onPress: () => navigation.push("TermsOfUseScreen"), icon: "document-text-outline" },
    { title: "Logout", onPress: openAlert, isLogout: true, icon: "log-out-outline" },
  ];

  const { version, ios, android } = ExpoConstants.expoConfig;
  const buildNumber = platform.isIOS ? ios.buildNumber : android.versionCode;

  const renderSettingRow = (item: any, index: number) => {
    const anim = itemAnimations[index];
    const isLast = index === rowItems.length - 1;

    return (
      <Animated.View
        key={index}
        style={[
          isTablet ? tabletStyles.gridItem : mobileStyles.itemContainer,
          {
            opacity: anim.opacity,
            transform: [
              { translateX: anim.translateX },
              { scale: anim.scale },
            ],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={item.isSwitchItem ? null : item.onPress}
          style={[
            isTablet ? tabletStyles.card : mobileStyles.rowWrapper,
            !isTablet && !isLast && {
              borderBottomWidth: 1,
              borderBottomColor: "#EEE",
            },
          ]}
        >
          <View style={sharedStyles.rowContent}>
            <View style={sharedStyles.leftPart}>
              <Ionicons
                name={item.icon}
                size={isTablet ? 36 : 24}
                color={item.isLogout ? "#FF3B30" : "#333"}
                style={{ marginRight: isTablet ? 15 : 12 }}
              />
              <Text.Primary
                numberOfLines={1}
                style={[
                  sharedStyles.rowText,
                  isTablet && tabletStyles.rowText,
                  item.isLogout && { color: "#FF3B30" },
                ]}
              >
                {item.title}
              </Text.Primary>
            </View>

            {item.isSwitchItem ? (
              <Switch
                value={item.value}
                onValueChange={item.onChange}
                trackColor={{ false: "#D1D1D6", true: "#34C759" }}
              />
            ) : (
              <Ionicons name="chevron-forward" size={isTablet ? 28 : 20} color="#C7C7CC" />
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={sharedStyles.container} showsVerticalScrollIndicator={false}>
      <Animated.View
        style={[
          isTablet ? tabletStyles.header : mobileStyles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <Image
          style={isTablet ? tabletStyles.logo : mobileStyles.logo}
          resizeMode="contain"
          source={ImagesAssets.logos.nmf}
        />
      </Animated.View>

      <View style={isTablet ? tabletStyles.gridContainer : mobileStyles.listContainer}>
        {rowItems.map((item, index) => renderSettingRow(item, index))}
      </View>
    </ScrollView>
  );
};

/* =========================
   STYLES
========================= */

const sharedStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  rowContent: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  leftPart: { flexDirection: "row", alignItems: "center", flex: 1 },
  rowText: { fontSize: 18, color: "#1C1C1E" },
});

const mobileStyles = StyleSheet.create({
  header: { alignItems: "center", paddingVertical: 30 },
  logo: { width: 100, height: 100 },
  listContainer: { paddingHorizontal: 20 },
  itemContainer: {},
  rowWrapper: { paddingVertical: 18 },
});

const tabletStyles = StyleSheet.create({
  header: { alignItems: "center", paddingVertical: 80 },
  logo: { width: 200, height: 100 },
  gridContainer: { paddingHorizontal: 50 },
  gridItem: { flex: 1 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 25,
    minHeight: 100,
    justifyContent: "center",
    elevation: 0, // Android flat
  },
  rowText: { fontSize: 24, fontWeight: "500" },
});

export default SettingsScreen;
