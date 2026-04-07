import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import React, { useEffect, useRef } from "react";
import * as WebBrowser from "expo-web-browser";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { emilyUrl } from "constant/urls";
import { Colors } from "style";
import { NavStatelessComponent } from "interfaces";

import navigationOptions from "./ImageDetails.navigationOptions";

const ImageDetails: NavStatelessComponent = () => {
  const { width, height } = Dimensions.get("window");
  const route = useRoute();
  const { data } = route?.params;
  
  // Determine if tablet
  const isTablet = width >= 768;
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const imageRotate = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Reset animations when component mounts
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.8);
    imageRotate.setValue(0);
    pulseAnim.setValue(1);

    // Start animations
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
      Animated.timing(imageRotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for image
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotation = imageRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const renderContent = () => {
    if (isTablet) {
      // Tablet Layout - Two Column Design
      return (
        <View style={styles.tabletContainer}>
          {/* Left Column */}
          <Animated.View 
            style={[
              styles.tabletLeftColumn,
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
              }
            ]}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.gradientHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.headerTablet}>{data.header}</Text>
              <Text style={styles.subHeaderTablet}>{data.subHeaderText}</Text>
            </LinearGradient>

            <TouchableOpacity
              onPress={() => {
                console.log("data", data);
                WebBrowser.openBrowserAsync(data.emilyURL);
              }}
              style={styles.imageWrapper}
            >
              <View style={styles.imageBorder}>
                <Image
                  style={styles.imageTablet}
                  source={require("../../../assets/images/Emily.png")}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Right Column */}
          <Animated.View 
            style={[
              styles.tabletRightColumn,
              {
                opacity: fadeAnim,
                transform: [{ translateX: Animated.multiply(slideAnim, -1) }],
              }
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* How It Works Section */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeaderContainer}>
                  <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>⚙️</Text>
                  </View>
                  <Text style={styles.sectionTitle}>How It Works</Text>
                </View>
                {data?.points?.map((item, index) => (
                  <Animated.View 
                    key={index}
                    style={[
                      styles.pointCard,
                      {
                        opacity: fadeAnim,
                        transform: [
                          { 
                            translateY: Animated.multiply(
                              slideAnim, 
                              new Animated.Value(1 + index * 0.2)
                            ) 
                          }
                        ]
                      }
                    ]}
                  >
                    <View style={styles.numberBadge}>
                      <Text style={styles.numberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.pointTextTablet}>{item.text}</Text>
                  </Animated.View>
                ))}
              </View>

              {/* Voice Agent Role Section */}
              <View style={[styles.sectionCard, { marginTop: 20 }]}>
                <View style={styles.sectionHeaderContainer}>
                  <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>🎤</Text>
                  </View>
                  <Text style={styles.sectionTitle}>Voice Agent Role</Text>
                </View>
                {data?.agent?.map((item, index) => (
                  <Animated.View 
                    key={index}
                    style={[
                      styles.pointCard,
                      {
                        opacity: fadeAnim,
                        transform: [
                          { 
                            translateY: Animated.multiply(
                              slideAnim, 
                              new Animated.Value(1 + index * 0.2)
                            ) 
                          }
                        ]
                      }
                    ]}
                  >
                    <View style={styles.numberBadge}>
                      <Text style={styles.numberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.pointTextTablet}>{item.text}</Text>
                  </Animated.View>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      );
    } else {
      // Mobile Layout - Single Column Design
      return (
        <>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            }}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.gradientHeaderMobile}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.header}>{data.header}</Text>
              <Text style={styles.subHeader}>{data.subHeaderText}</Text>
            </LinearGradient>
          </Animated.View>

          <TouchableOpacity
            onPress={() => {
              console.log("data", data);
              WebBrowser.openBrowserAsync(data.emilyURL);
            }}
          >
            <View style={styles.imageBorderMobile}>
              <Image
                style={{ height: height / 5, width: width / 2, resizeMode: "contain", alignSelf: "center" }}
                source={require("../../../assets/images/Emily.png")}
              />
            </View>
          </TouchableOpacity>

          <Animated.View
            style={{
              marginTop: "8%",
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* How It Works Section */}
            <View style={styles.sectionCardMobile}>
              <View style={styles.sectionHeaderContainer}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>⚙️</Text>
                </View>
                <Text style={styles.thirdHead}>How It Works</Text>
              </View>
              <View style={styles.marginView} />
              {data?.points?.map((item, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.detailsContainer,
                    {
                      opacity: fadeAnim,
                      transform: [
                        { 
                          translateX: Animated.multiply(
                            slideAnim, 
                            new Animated.Value(1 + index * 0.1)
                          ) 
                        }
                      ]
                    }
                  ]}
                >
                  <View style={styles.pointRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletPoint}>
                      {index + 1}. {item.text}
                    </Text>
                  </View>
                </Animated.View>
              ))}
            </View>

            {/* Voice Agent Role Section */}
            <View style={[styles.sectionCardMobile, { marginTop: 20 }]}>
              <View style={styles.sectionHeaderContainer}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>🎤</Text>
                </View>
                <Text style={styles.thirdHead}>Voice Agent Role</Text>
              </View>
              <View style={styles.marginView} />
              {data?.agent?.map((item, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.detailsContainer,
                    {
                      opacity: fadeAnim,
                      transform: [
                        { 
                          translateX: Animated.multiply(
                            slideAnim, 
                            new Animated.Value(1 + index * 0.1)
                          ) 
                        }
                      ]
                    }
                  ]}
                >
                  <View style={styles.pointRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletPoint}>
                      {index + 1}. {item.text}
                    </Text>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        </>
      );
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={isTablet ? { paddingBottom: 30 } : { paddingBottom: 50 }}
    >
      {renderContent()}
    </ScrollView>
  );
};

ImageDetails.navigationOptions = navigationOptions;

export default ImageDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  // Mobile Styles
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 10,
    alignSelf: "center",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.white,
    alignSelf: "center",
    textAlign: "center",
    opacity: 0.9,
  },
  gradientHeaderMobile: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageContainerMobile: {
    alignItems: "center",
    marginTop: 10,
  },
  imageBorderMobile: {
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionCardMobile: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsContainer: {
    flex: 1,
    marginBottom: 15,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#667eea",
    marginTop: 6,
    marginRight: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#4a5568",
    flex: 1,
    lineHeight: 22,
  },
  thirdHead: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: "700",
  },
  marginView: {
    marginTop: 15,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f4ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  
  // Tablet Styles
  tabletContainer: {
    flexDirection: "row",
    gap: 20,
    flex: 1,
  },
  tabletLeftColumn: {
    flex: 1,
    maxWidth: "45%",
  },
  tabletRightColumn: {
    flex: 1,
    maxWidth: "52%",
  },
  gradientHeader: {
    padding: 30,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  headerTablet: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 15,
    textAlign: "center",
  },
  subHeaderTablet: {
    fontSize: 18,
    color: Colors.white,
    textAlign: "center",
    opacity: 0.95,
  },
  imageContainerTablet: {
    alignItems: "center",
    marginTop: 20,
  },
  imageWrapper: {
    alignSelf: "center",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  imageBorder: {
    padding: 30,
    backgroundColor: Colors.white,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#e2e8f0",
  },
  imageTablet: {
    height: 300,
    width: 300,
    resizeMode: "contain",
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: "700",
  },
  pointCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#667eea",
  },
  numberBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#667eea",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    flexShrink: 0,
  },
  numberText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  pointTextTablet: {
    fontSize: 15,
    color: "#4a5568",
    flex: 1,
    lineHeight: 24,
  },
});