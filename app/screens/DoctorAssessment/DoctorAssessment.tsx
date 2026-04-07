import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  useWindowDimensions,
  Platform, // Added Platform
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Added

import { NavStatelessComponent } from "interfaces";
import { Colors } from "style";

import styles from "./DoctorAssessment.styles";
import navigationOptions from "./DoctorAssessment.navigationOptions";

interface AssessmentCardProps {
  item: {
    title: string;
    patientTitle?: string; // Optional patient-friendly title
    navName: string;
    topics: { title: string; patientTitle?: string; link: string }[];
    icon: string;
    gradient: string[];
  };
  index: number;
  onPress: () => void;
  isTablet: boolean;
  shouldAnimate: boolean;
  isAdmin: string | null; // Pass admin status to card
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  item,
  index,
  onPress,
  isTablet,
  shouldAnimate,
  isAdmin,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);

      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          delay: index * 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          delay: index * 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          delay: index * 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [shouldAnimate]);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        marginBottom: isTablet ? 20 : 16,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={[
          styles.cardContainer,
          isTablet && styles.cardContainerTablet,
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: Platform.OS === "android" ? 0 : 5, // Removed shadow for Android only
            padding: isTablet ? 24 : 16,
          },
        ]}
      >
        <View style={[styles.iconContainer, isTablet && styles.iconContainerTablet, isTablet && { width: 64, height: 64, borderRadius: 32 }]}>
          <Ionicons
            name={item.icon as any}
            size={isTablet ? 42 : 28}
            color={Colors.primary || "#6366f1"}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.cardTitle, isTablet && styles.cardTitleTablet, isTablet && { fontSize: 24, marginBottom: 8 }]}>
            {isAdmin === "2" ? (item.patientTitle || item.title) : item.title}
          </Text>
          <View style={{ height: 8 }} />
          {item.topics.map((topic, idx) => (
            <Text
              key={idx}
              style={[styles.cardDescription, isTablet && styles.cardDescriptionTablet, isTablet && { fontSize: 18, lineHeight: 26 }]}
              numberOfLines={isTablet ? 4 : 3}
            >
              {isAdmin === "2" ? (topic.patientTitle || topic.title) : topic.title}
            </Text>
          ))}
        </View>

        <Animated.View style={{ position: "absolute", right: isTablet ? 24 : 16, top: "50%", transform: [{ translateY: isTablet ? -15 : -12 }] }}>
          <Ionicons name="chevron-forward" size={isTablet ? 34 : 22} color={Colors.primary || "#6366f1"} />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const DoctorAssessment: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const headerAnim = useRef(new Animated.Value(0)).current;
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const isTablet = width >= 768;

  const rowItems = [
    {
      title: "AI Health Notes",
      patientTitle: "My Health Updates",
      navName: "AIDoctorAssessmetNotes",
      icon: "analytics-outline",
      gradient: ["#6366f1", "#8b5cf6"],
      topics: [
        {
          title: "Shows memory concerns, progress updates, and helpful care suggestions.",
          patientTitle: "View notes about your memory progress and helpful suggestions for your daily routine.",
          link: "",
        },
      ],
    },
    {
      title: "Memory Assessment",
      patientTitle: "Brain Exercise Check",
      navName: "AssessmentPage",
      icon: "brain-outline",
      gradient: ["#ec4899", "#f43f5e"],
      topics: [
        {
          title: "The Memory Assessment helps check thinking, memory, mood, and daily abilities in simple steps.",
          patientTitle: "A simple check-in to help keep your mind sharp. It uses easy questions and voice responses to see how you are doing.",
          link: "",
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchRole = async () => {
      const role = await AsyncStorage.getItem("isAdmin");
      setIsAdmin(role);
    };
    fetchRole();
  }, []);

  useFocusEffect(
    useCallback(() => {
      headerAnim.setValue(0);
      Animated.timing(headerAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
      setShouldAnimate(false);
      setTimeout(() => setShouldAnimate(true), 50);
      return () => setShouldAnimate(false);
    }, [])
  );

  const handleCardPress = (navName: string) => {
    navigation?.navigate(navName);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, isTablet && styles.scrollContentTablet, isTablet && { paddingHorizontal: 40 }]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={{ opacity: headerAnim, transform: [{ translateY: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }}>
        <View style={[styles.headerContainer, isTablet && styles.headerContainerTablet, isTablet && { marginBottom: 32 }]}>
          <Text style={[styles.headerTitle, isTablet && styles.headerTitleTablet, isTablet && { fontSize: 36, marginBottom: 12 }]}>
            {isAdmin === "2" ? "My Wellness Track" : "Health Assessments"}
          </Text>
          <Text style={[styles.headerSubtitle, isTablet && styles.headerSubtitleTablet, isTablet && { fontSize: 20 }]}>
            {isAdmin === "2" ? "Let's see how your mind and body are doing today" : "Monitor and track cognitive health"}
          </Text>
        </View>
      </Animated.View>

      <View style={[styles.cardsWrapper, isTablet && styles.cardsWrapperTablet]}>
        {rowItems.map((item, index) => (
          <View key={index} style={isTablet ? styles.cardGridItem : styles.cardFullWidth}>
            <AssessmentCard
              item={item}
              index={index}
              onPress={() => handleCardPress(item.navName)}
              isTablet={isTablet}
              shouldAnimate={shouldAnimate}
              isAdmin={isAdmin}
            />
          </View>
        ))}
      </View>
      <View style={{ height: isTablet ? 60 : 20 }} />
    </ScrollView>
  );
};

DoctorAssessment.navigationOptions = navigationOptions;

export default DoctorAssessment;