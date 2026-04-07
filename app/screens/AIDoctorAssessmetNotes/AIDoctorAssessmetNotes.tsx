import { View, Text, TouchableOpacity, Image, ScrollView, Animated, Dimensions, Platform } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import * as WebBrowser from "expo-web-browser";

import { emilyUrl } from "constant/urls";
import AxiosHelper from "utils/AxiosHelper";
import StorageHelper from "utils/StorageHelper";
import { Colors } from "style";

import navigationOptions from "./AIDoctorAssessmetNotes.navigationOptions";
import { styles } from "./AIDoctorAssessmetNotes.styles";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

const AIDoctorAssessmetNotes = () => {
  const data = [
    {
      id: 1,
      title: "STEP 1: Mini-Mental State Examination (MMSE)",
      description: "This is the description for item 1.",
      icon: "🧠",
      color: "#E3F2FD",
      accentColor: "#2196F3"
    },
    {
      id: 2,
      title: "STEP 2: Montreal Cognitive Assessment (MoCA)",
      description: "This is the description for item 2.",
      icon: "📋",
      color: "#F3E5F5",
      accentColor: "#9C27B0"
    },
    {
      id: 3,
      title: "STEP 3: Clinical Dementia Rating (CDR) Scale",
      description: "This is the description for item 3.",
      icon: "⭐",
      color: "#FFF3E0",
      accentColor: "#FF9800"
    },
    {
      id: 4,
      title: "STEP 4: Functional Activities Questionnaire (FAQ)",
      description: "This is the description for item 4.",
      icon: "📝",
      color: "#E8F5E9",
      accentColor: "#4CAF50"
    },
    {
      id: 5,
      title: "STEP 5: Neuropsychiatric Inventory (NPI)",
      description: "This is the description for item 5.",
      icon: "💭",
      color: "#FCE4EC",
      accentColor: "#E91E63"
    },
    {
      id: 6,
      title: "STEP 6: Geriatric Depression Scale (GDS)",
      description: "This is the description for item 5.",
      icon: "😊",
      color: "#E0F2F1",
      accentColor: "#009688"
    },
  ];

  const [summaryData, setSummaryData] = useState([]);
  const [summaryData1, setSummaryData1] = useState("No Summary");
  const [summaryData2, setSummaryData2] = useState("No Summary");
  const [summaryData3, setSummaryData3] = useState("No Summary");
  const [summaryData4, setSummaryData4] = useState("No Summary");
  const [summaryData5, setSummaryData5] = useState("No Summary");
  const [summaryData6, setSummaryData6] = useState("No Summary");

  // Animation values - create new refs each time component mounts
  const fadeAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const slideAnims = useRef([
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
  ]).current;

  const scaleAnims = useRef([
    new Animated.Value(0.8),
    new Animated.Value(0.8),
    new Animated.Value(0.8),
    new Animated.Value(0.8),
    new Animated.Value(0.8),
    new Animated.Value(0.8),
  ]).current;

  const apiCallStep1 = async () => {
    const emailId = await StorageHelper.getItem("emailId");
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page1&email=${emailId}`)
      .then(async (response) => {
        setSummaryData1(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep2 = async () => {
    const emailId = await StorageHelper.getItem("emailId");
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page2&email=${emailId}`)
      .then(async (response) => {
        setSummaryData2(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep3 = async () => {
    const emailId = await StorageHelper.getItem("emailId");
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page3&email=${emailId}`)
      .then(async (response) => {
        setSummaryData3(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };
  
  const apiCallStep4 = async () => {
    const emailId = await StorageHelper.getItem("emailId");
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page4&email=${emailId}`)
      .then(async (response) => {
        setSummaryData4(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep5 = async () => {
    const emailId = await StorageHelper.getItem("emailId");
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page5&email=${emailId}`)
      .then(async (response) => {
        setSummaryData5(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep6 = async () => {
    const emailId = await StorageHelper.getItem("emailId");
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page6&email=${emailId}`)
      .then(async (response) => {
        setSummaryData6(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  // Animation function - runs every time component mounts
  const startAnimations = () => {
    fadeAnims.forEach(anim => anim.setValue(0));
    slideAnims.forEach(anim => anim.setValue(50));
    scaleAnims.forEach(anim => anim.setValue(0.8));

    const animations = fadeAnims.map((fadeAnim, index) => {
      return Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[index], {
          toValue: 0,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnims[index], {
          toValue: 1,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.stagger(100, animations).start();
  };

  useEffect(() => {
    setSummaryData(data);
    apiCallStep1();
    apiCallStep2();
    apiCallStep3();
    apiCallStep4();
    apiCallStep5();
    apiCallStep6();
    startAnimations();
  }, []);

  const getSummaryByIndex = (index) => {
    switch (index) {
      case 0: return summaryData1;
      case 1: return summaryData2;
      case 2: return summaryData3;
      case 3: return summaryData4;
      case 4: return summaryData5;
      case 5: return summaryData6;
      default: return "No Summary";
    }
  };

  const renderMobileCard = (item, index) => {
    return (
      <Animated.View
        key={item.id}
        style={[
          enhancedStyles.mobileCard,
          {
            backgroundColor: item.color,
            opacity: fadeAnims[index],
            transform: [
              { translateY: slideAnims[index] },
              { scale: scaleAnims[index] }
            ],
          },
        ]}
      >
        <View style={enhancedStyles.cardHeader}>
          <View style={[enhancedStyles.iconContainer, { backgroundColor: item.accentColor }]}>
            <Text style={enhancedStyles.icon}>{item.icon}</Text>
          </View>
          <View style={enhancedStyles.stepBadge}>
            <Text style={[enhancedStyles.stepText, { color: item.accentColor }]}>
              Step {item.id}
            </Text>
          </View>
        </View>
        
        <Text style={[enhancedStyles.cardTitle, { color: item.accentColor }]}>
          {item.title.replace(`STEP ${item.id}: `, "")}
        </Text>
        
        <View style={enhancedStyles.divider} />
        
        <Text style={enhancedStyles.cardDescription}>
          {getSummaryByIndex(index)}
        </Text>
      </Animated.View>
    );
  };

  const renderTabletCard = (item, index) => {
    return (
      <Animated.View
        key={item.id}
        style={[
          enhancedStyles.tabletCard,
          {
            opacity: fadeAnims[index],
            transform: [
              { translateY: slideAnims[index] },
              { scale: scaleAnims[index] }
            ],
          },
        ]}
      >
        <View style={[enhancedStyles.tabletCardLeft, { backgroundColor: item.color }]}>
          <View style={[enhancedStyles.tabletIconContainer, { backgroundColor: item.accentColor }]}>
            <Text style={enhancedStyles.tabletIcon}>{item.icon}</Text>
          </View>
          <View style={enhancedStyles.tabletStepInfo}>
            <Text style={enhancedStyles.tabletStepNumber}>STEP</Text>
            <Text style={[enhancedStyles.tabletStepDigit, { color: item.accentColor }]}>
              {item.id}
            </Text>
          </View>
        </View>
        
        <View style={enhancedStyles.tabletCardRight}>
          <View style={enhancedStyles.tabletCardHeader}>
            <Text style={[enhancedStyles.tabletCardTitle, { color: item.accentColor }]}>
              {item.title.replace(`STEP ${item.id}: `, "")}
            </Text>
            <View style={[enhancedStyles.statusDot, { backgroundColor: item.accentColor }]} />
          </View>
          
          <Text style={enhancedStyles.tabletCardDescription}>
            {getSummaryByIndex(index)}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <ScrollView 
        style={enhancedStyles.container}
        contentContainerStyle={enhancedStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isTablet ? (
          <View style={enhancedStyles.tabletGrid}>
            {data.map((item, index) => renderTabletCard(item, index))}
          </View>
        ) : (
          data.map((item, index) => renderMobileCard(item, index))
        )}
      </ScrollView>
    </View>
  );
};

const enhancedStyles = {
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: isTablet ? 24 : 16,
    paddingBottom: isTablet ? 40 : 24,
  },
  
  // Mobile Styles (Remains default)
  mobileCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  icon: {
    fontSize: 28,
  },
  stepBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  stepText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 22,
  },
  divider: {
    height: 2,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginBottom: 12,
    borderRadius: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: "#37474F",
    lineHeight: 20,
  },
  
  // Tablet Styles - ENLARGED
  tabletGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tabletCard: {
    width: "48.5%",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginBottom: 20,
    minHeight: 220, 
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  tabletCardLeft: {
    width: 160, // Increased width
    padding: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabletIconContainer: {
    width: 96, // Increased from 72
    height: 96, // Increased from 72
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  tabletIcon: {
    fontSize: 48, // Increased from 36
  },
  tabletStepInfo: {
    alignItems: "center",
  },
  tabletStepNumber: {
    fontSize: 14, // Increased from 11
    fontWeight: "600",
    color: "#666",
    letterSpacing: 1.5,
  },
  tabletStepDigit: {
    fontSize: 44, // Increased from 32
    fontWeight: "800",
    marginTop: 4,
  },
  tabletCardRight: {
    flex: 1,
    padding: 28, // More padding for larger text
    justifyContent: "center",
  },
  tabletCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tabletCardTitle: {
    fontSize: 24, // Increased from 17
    fontWeight: "700",
    flex: 1,
    lineHeight: 32,
    paddingRight: 8,
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 10,
  },
  tabletCardDescription: {
    fontSize: 18, // Increased from 14
    color: "#546E7A",
    lineHeight: 28, // Better spacing for tablet
  },
};

AIDoctorAssessmetNotes.navigationOptions = navigationOptions();
export default AIDoctorAssessmetNotes;