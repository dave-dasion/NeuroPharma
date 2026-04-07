import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavStatelessComponent } from "interfaces";
import { Colors, Font } from "style";
import { navigate } from "navigation";

import styles from "./AssessmentPage.styles";
import navigationOptions from "./AssessmentPage.navigationOptions";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

interface AssessmentItemProps {
  title: string;
  onPress: () => void;
  index: number;
  delay: number;
}

const AssessmentItem: React.FC<AssessmentItemProps> = ({ title, onPress, index, delay }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      scaleAnim.setValue(0.9);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          delay: delay,
          useNativeDriver: true,
        }),
      ]).start();
    }, [delay])
  );

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.innerSteps,
          isTablet && {
            paddingVertical: 35, // Slightly larger for patient accessibility
            paddingHorizontal: 25,
            marginHorizontal: 12,
            borderRadius: 16,
            backgroundColor: index % 2 === 0 ? "#f8fffe" : "#ffffff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: Platform.OS === "android" ? 0 : 4, // Modified to remove shadow on Android only
          },
        ]}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {isTablet && (
            <View
              style={{
                width: 55,
                height: 55,
                borderRadius: 27.5,
                backgroundColor: Colors.primary || "#4CAF50",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
                {index + 1}
              </Text>
            </View>
          )}
          <Text
            style={[
              styles.titleText,
              isTablet && { fontSize: 22, flex: 1, fontFamily: Font.FontWeight.SemiBold },
            ]}
          >
            {title}
          </Text>
        </View>
        <Ionicons
          suppressHighlighting={true}
          name={"chevron-forward-outline"}
          size={isTablet ? 32 : 14}
          color={Colors.black50}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.black50,
          marginHorizontal: 15,
          opacity: 0.3,
          marginVertical: isTablet ? 12 : 0,
        }}
      />
    </Animated.View>
  );
};

const AssessmentPage: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const [isAdmin, setIsAdmin] = useState<string | null>(null);

  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    const getRole = async () => {
      const role = await AsyncStorage.getItem("isAdmin");
      setIsAdmin(role);
    };
    getRole();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      headerFadeAnim.setValue(0);
      headerSlideAnim.setValue(-30);

      Animated.parallel([
        Animated.timing(headerFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(headerSlideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, [])
  );

  const assessmentSteps = [
    {
      step: 1,
      title: "STEP 1: Mini-Mental State Examination (MMSE)",
      action: () => navigator.openAssessmentSteps({ steps: 1 }),
    },
    {
      step: 2,
      title: "STEP 2: Montreal Cognitive Assessment (MoCA)",
      action: () => navigator.openAssessmentSteps({ steps: 2 }),
    },
    {
      step: 3,
      title: "STEP 3: Clinical Dementia Rating (CDR) Scale",
      action: () => navigator.openAssessmentSteps({ steps: 3 }),
    },
    {
      step: 4,
      title: "STEP 4: Functional Activities Questionnaire (FAQ)",
      action: () => navigator.openAssessmentSteps({ steps: 4 }),
    },
    {
      step: 5,
      title: "STEP 5: Neuropsychiatric Inventory (NPI)",
      action: () => navigator.openAssessmentSteps({ steps: 5 }),
    },
    {
      step: 6,
      title: "STEP 6: Geriatric Depression Scale (GDS)",
      action: () => navigator.openAssessmentSteps({ steps: 6 }),
    },
    {
      step: 7,
      title: "STEP 7: SUMMARY",
      action: () => navigator.openAssessmentSteps({ steps: 7 }),
    },
    {
      step: 8,
      title: "STEP 8: Voice characteristic Analytic",
      action: () => navigator.openAssessmentSteps({ steps: 8 }),
    },
  ];

  const assessmentAI = [
    {
      number: 1,
      title: "STEP 1: Mini-Mental State Examination (MMSE)",
      action: () =>
        navigator.openAssessmentSingle({
          number: 1,
          title: "STEP 1: Mini-Mental State Examination (MMSE)",
        }),
    },
    {
      number: 2,
      title: "STEP 2: Montreal Cognitive Assessment (MoCA)",
      action: () =>
        navigator.openAssessmentSingle({
          number: 2,
          title: "STEP 2: Montreal Cognitive Assessment (MoCA)",
        }),
    },
    {
      number: 3,
      title: "STEP 3: Clinical Dementia Rating (CDR) Scales",
      action: () =>
        navigator.openAssessmentSingle({
          number: 3,
          title: "STEP 3: Clinical Dementia Rating (CDR) Scales",
        }),
    },
    {
      number: 4,
      title: "STEP 4: Functional Activities Questionnaire (FAQ)",
      action: () =>
        navigator.openAssessmentSingle({
          number: 4,
          title: "STEP 4: Functional Activities Questionnaire (FAQ)",
        }),
    },
    {
      number: 5,
      title: "STEP 5: Neuropsychiatric Inventory (NPI)",
      action: () =>
        navigator.openAssessmentSingle({
          number: 5,
          title: "STEP 5: Neuropsychiatric Inventory (NPI)",
        }),
    },
    {
      number: 6,
      title: "STEP 6: Geriatric Depression Scale (GDS)",
      action: () =>
        navigator.openAssessmentSingle({
          number: 6,
          title: "STEP 6: Geriatric Depression Scale (GDS)",
        }),
    },
    {
      number: 7,
      title: "STEP 7: SUMMARY",
      action: () => navigation?.navigate("AIDoctorAssessmetNotes"),
    },
    {
      number: 8,
      title: "STEP 8: Voice characteristic Analytic",
      action: () => {},
    },
  ];

  const doctorAssessment = [
    {
      title: "1: AI Med Assessment",
      action: () => {},
    },
    {
      title: "2: Doctor's SOAP Notes",
      action: () => navigator.openDoctorSoapNotes(),
    },
  ];

  const renderSection = (
    title: string,
    items: any[],
    startDelay: number,
    type: "steps" | "ai" | "doctor"
  ) => {
    return (
      <View style={[styles.heading, isTablet && { paddingHorizontal: 20, marginBottom: 30 }]}>
        <Animated.View
          style={{
            opacity: headerFadeAnim,
            transform: [{ translateY: headerSlideAnim }],
          }}
        >
          <View
            style={
              isTablet && {
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }
            }
          >
            <Text
              style={{
                fontSize: isTablet ? 42 : 25,
                marginTop: 30,
                fontFamily: Font.FontWeight.Bold,
                color: "#2c3e50",
              }}
            >
              {title}
            </Text>
            {isTablet && (
              <View
                style={{
                  marginLeft: 20,
                  marginTop: 30,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: Colors.primary || "#4CAF50",
                  borderRadius: 25,
                }}
              >
                <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
                  {items.length} Tasks
                </Text>
              </View>
            )}
          </View>
        </Animated.View>

        {isTablet ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
            {items.map((item, index) => (
              <View key={index} style={{ width: isAdmin === "2" ? "100%" : "50%", paddingVertical: 10 }}>
                <AssessmentItem
                  title={item.title}
                  onPress={item.action}
                  index={index}
                  delay={startDelay + index * 100}
                />
              </View>
            ))}
          </View>
        ) : (
          items.map((item, index) => (
            <AssessmentItem
              key={index}
              title={item.title}
              onPress={item.action}
              index={index}
              delay={startDelay + index * 80}
            />
          ))
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={isTablet && { paddingBottom: 60, paddingHorizontal: 20 }}
      >
        {/* If Patient (isAdmin == 2), show a simplified journey */}
        {isAdmin === "2" ? (
          <>
            {renderSection("My Cognitive Journey", assessmentAI, 200, "ai")}
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: Colors.black50, fontSize: isTablet ? 18 : 14, textAlign: "center" }}>
                Complete these steps to help your doctor monitor your health.
              </Text>
            </View>
          </>
        ) : (
          <>
            {renderSection("Assessment Steps", assessmentSteps, 200, "steps")}
            {renderSection("Assessment AI", assessmentAI, 1000, "ai")}
            {renderSection("Assessment of Doctor's", doctorAssessment, 1800, "doctor")}
          </>
        )}
      </ScrollView>
    </View>
  );
};

AssessmentPage.navigationOptions = navigationOptions;

export default AssessmentPage;