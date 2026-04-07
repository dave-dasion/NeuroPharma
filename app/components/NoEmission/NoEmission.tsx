import React, { useCallback, useRef, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Animated, Dimensions, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import * as DocumentPicker from "expo-document-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Added

import { t } from "utils";
import { navigate } from "navigation";
import { Colors } from "style";

import Text from "../Text";
import StickersImage from "../StickersImage";
import Button from "../Button";
import styles from "./NoEmission.styles";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

const NoEmission: React.FC = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const bottomSheetModalRef = useRef<any>(null);
  const [isAdmin, setIsAdmin] = useState<string | null>(null); // State for role

  // Animation values preserved
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // Fetch role on mount
  useEffect(() => {
    const getRole = async () => {
      const role = await AsyncStorage.getItem("isAdmin");
      setIsAdmin(role);
    };
    getRole();
  }, []);

  // Start animations preserved
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      scaleAnim.setValue(0.8);
      buttonAnims.forEach(anim => anim.setValue(0));

      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      ]).start();

      Animated.stagger(
        150,
        buttonAnims.map(anim =>
          Animated.spring(anim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true })
        )
      ).start();
    });

    return unsubscribe;
  }, [navigation]);

  const renderMobileLayout = () => (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }}>
        <StickersImage sticker="earth" />
      </Animated.View>

      <Animated.View style={[styles.textView, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text.H1 style={styles.header}>{isAdmin === "2" ? "Hello there! 👋" : "Welcome 👋"}</Text.H1>
        <Text.Primary style={styles.paragraph}>
          {isAdmin === "2" 
            ? "We're here to help you stay healthy and keep your mind sharp." 
            : "Thanks for using ElderCare to support your health and well-being!"}
        </Text.Primary>
        <Text.Primary style={styles.paragraph}>
          {isAdmin === "2"
            ? "Please choose an option below to get started."
            : "To start a health check or get memory and brain support, choose one of the options below."}
        </Text.Primary>

        {/* Upload Button */}
        <Animated.View style={{ width: "100%", opacity: buttonAnims[0], transform: [{ translateX: buttonAnims[0].interpolate({ inputRange: [0, 1], outputRange: [-50, 0] }) }, { scale: buttonAnims[0].interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }] }}>
          <TouchableOpacity
            style={{ 
              backgroundColor: Colors.AppColor, 
              marginTop: -2, 
              width: "100%", 
              height: 45, 
              marginBottom: 15, 
              alignItems: "center", 
              justifyContent: "center", 
              borderRadius: 1000, 
              shadowColor: "#000", 
              shadowOffset: { width: 0, height: 4 }, 
              shadowOpacity: 0.3, 
              shadowRadius: 4.65, 
              elevation: Platform.OS === "android" ? 0 : 8 // Modified for Android only
            }}
            onPress={() => bottomSheetModalRef.current?.open()}
          >
            <Text.Primary bold center style={{ color: "white" }}>
              {isAdmin === "2" ? "Add My Medical Note" : "Upload My Health Report"}
            </Text.Primary>
          </TouchableOpacity>
        </Animated.View>

        {/* AI Helper Button */}
        <Animated.View style={{ width: "100%", opacity: buttonAnims[1], transform: [{ translateX: buttonAnims[1].interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}>
          <Button.Primary
            fullWidth
            style={[styles.button, { backgroundColor: "#3b5998", bottom: 8, elevation: Platform.OS === "android" ? 0 : 4 }]}
            onPress={() => WebBrowser.openBrowserAsync("http://dev.dasion-guider.com:3000/")}
            text={isAdmin === "2" ? "Chat with My Friendly AI" : "Talk to My AI Helper"}
          />
        </Animated.View>

        {/* Appointment Button */}
        <Animated.View style={{ width: "100%", opacity: buttonAnims[2], transform: [{ translateX: buttonAnims[2].interpolate({ inputRange: [0, 1], outputRange: [-50, 0] }) }] }}>
          <Button.Primary
            fullWidth
            style={[styles.button, { bottom: 3, elevation: Platform.OS === "android" ? 0 : 4 }]}
            onPress={() => WebBrowser.openBrowserAsync("https://calendly.com/dasion_ai/15min")}
            text={isAdmin === "2" ? "Schedule a Visit" : "Book An Appointment"}
          />
        </Animated.View>

        {/* Doctor Button */}
        <Animated.View style={{ width: "100%", opacity: buttonAnims[3], transform: [{ translateX: buttonAnims[3].interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}>
          <Button.Primary
            fullWidth
            style={[styles.button, { backgroundColor: "red", top: 3, elevation: Platform.OS === "android" ? 0 : 4 }]}
            onPress={() => WebBrowser.openBrowserAsync("https://zoomserverload.dasion-training.com/video")}
            text={isAdmin === "2" ? "Call My Doctor" : "Talk to Doctor"}
          />
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );

  const renderTabletLayout = () => (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={{ flexDirection: "row", paddingHorizontal: 40 }}>
        <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 50], outputRange: [-50, 0] }) }, { scale: scaleAnim }], justifyContent: "center", alignItems: "center", paddingRight: 20 }}>
          <StickersImage sticker="earth" />
          <Text.H1 style={[styles.header, { fontSize: 42, marginTop: 30 }]}>
            {isAdmin === "2" ? "Hello there! 👋" : "Welcome 👋"}
          </Text.H1>
          <Text.Primary style={[styles.paragraph, { fontSize: 18, textAlign: "center", marginTop: 20 }]}>
            {isAdmin === "2" ? "We're here to help you stay healthy and keep your mind sharp." : "Thanks for using ElderCare to support your health and well-being!"}
          </Text.Primary>
        </Animated.View>

        <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }], justifyContent: "center", paddingLeft: 20 }}>
          <View style={{ gap: 20 }}>
             {/* Same logic as mobile applied for button text in tablet layout */}
             <TouchableOpacity style={{ backgroundColor: Colors.AppColor, height: 65, borderRadius: 32, alignItems: "center", justifyContent: "center", elevation: Platform.OS === "android" ? 0 : 12 }} onPress={() => bottomSheetModalRef.current?.open()}>
                <Text.Primary bold center style={{ color: "white", fontSize: 18 }}>
                   📄 {isAdmin === "2" ? "Add My Medical Note" : "Upload My Health Report"}
                </Text.Primary>
             </TouchableOpacity>

             <Button.Primary fullWidth style={[styles.button, { backgroundColor: "#3b5998", height: 65, borderRadius: 32, elevation: Platform.OS === "android" ? 0 : 4 }]} onPress={() => WebBrowser.openBrowserAsync("http://dev.dasion-guider.com:3000/")} text={isAdmin === "2" ? "🤖 Chat with My Friendly AI" : "🤖 Talk to My AI Helper"} />
             <Button.Primary fullWidth style={[styles.button, { height: 65, borderRadius: 32, elevation: Platform.OS === "android" ? 0 : 4 }]} onPress={() => WebBrowser.openBrowserAsync("https://calendly.com/dasion_ai/15min")} text={isAdmin === "2" ? "📅 Schedule a Visit" : "📅 Book An Appointment"} />
             <Button.Primary fullWidth style={[styles.button, { backgroundColor: "red", height: 65, borderRadius: 32, elevation: Platform.OS === "android" ? 0 : 4 }]} onPress={() => WebBrowser.openBrowserAsync("https://zoomserverload.dasion-training.com/video")} text={isAdmin === "2" ? "👨‍⚕️ Call My Doctor" : "👨‍⚕️ Talk to Doctor"} />
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isTablet ? renderTabletLayout() : renderMobileLayout()}

      <RBSheet
        ref={bottomSheetModalRef}
        draggable={false}
        customStyles={{ wrapper: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, container: { borderRadius: 20, paddingBottom: 20 } }}
        height={isTablet ? 320 : 280}
      >
        <View>
          <View style={{ height: 60, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <Text.H3 style={{ alignSelf: "center", fontSize: isTablet ? 24 : 18 }}>
              {isAdmin === "2" ? "Add My Health Papers" : "Add My EMR Document"}
            </Text.H3>
          </View>
          <View style={{ height: 25 }} />
          <Button.Primary style={{ width: isTablet ? "70%" : "90%", alignSelf: "center", marginBottom: 15, height: isTablet ? 55 : 45 }} onPress={() => { navigation.navigate("DasionConsent"); bottomSheetModalRef.current?.close(); }} text={isAdmin === "2" ? "📤 Add My File" : "📤 Upload Document"} />
          <Button.Primary style={{ width: isTablet ? "70%" : "90%", alignSelf: "center", marginBottom: 15, height: isTablet ? 55 : 45 }} onPress={() => { navigation.navigate("RequestDocument"); bottomSheetModalRef.current?.close(); }} text={isAdmin === "2" ? "📋 Ask for My Records" : "📋 Request to Document"} />
          <Button.Primary style={{ width: isTablet ? "70%" : "90%", alignSelf: "center", marginBottom: 10, backgroundColor: "red", height: isTablet ? 55 : 45 }} onPress={() => bottomSheetModalRef.current?.close()} text="❌ Cancel" />
        </View>
      </RBSheet>
    </GestureHandlerRootView>
  );
};

export default NoEmission;