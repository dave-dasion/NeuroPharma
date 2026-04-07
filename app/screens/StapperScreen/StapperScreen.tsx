import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";

import Stap1 from "screens/Step1/Step1";
import Stap2 from "screens/Step2/Step2";
import Step3 from "screens/Step3/Step3";
import Step4 from "screens/Step4/Step4";
import Step5 from "screens/Step5/Step5";
import Step6 from "screens/Step6/Step6";
import Step7 from "screens/Step7/Step7";
import { Colors } from "style";

import navigationOptions from "./StapperScreen.navigationOptions";

const labels = [
  "Red Flags",
  "Observation Signs",
  "Memory Assessments",
  "Examinition",
  "Summary",
  "Voice",
  "step7",
  "step8",
];

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "green",
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: "green",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "green",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "green",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "green",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#ffffff",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "green",
  labelColor: "#999999",
  currentStepLabelColor: "green",
};

const Stepper = (props) => {
  const { height, width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const [currentStep, setCurrentStep] = useState(props.route.params.steps - 1);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonScaleLeft = useRef(new Animated.Value(1)).current;
  const buttonScaleRight = useRef(new Animated.Value(1)).current;

  // Trigger animations on mount and step change
  useEffect(() => {
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.9);

    // Run animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
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
    ]).start();
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < labels.length - 1) {
      // Button press animation
      Animated.sequence([
        Animated.timing(buttonScaleRight, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScaleRight, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      // Button press animation
      Animated.sequence([
        Animated.timing(buttonScaleLeft, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScaleLeft, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentStep(currentStep - 1);
    }
  };

  const Step8 = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 18,
            color: Colors.AppColorSecondory,
            fontWeight: "bold",
            marginTop: "5%",
          }}
        >
          {"STEP 8: Voice characteristic Analytic"}
        </Text>

        <WebView
          style={{ width: "100%", height: height * 0.6 }}
          originWhitelist={["*"]}
          source={{ uri: "https://pdfobject.com/pdf/sample.pdf" }}
        />
      </View>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Stap1 />;
      case 1:
        return <Stap2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      case 4:
        return <Step5 />;
      case 5:
        return <Step6 />;
      case 6:
        return <Step7 />;
      case 7:
        return <Step8 />;
      default:
        return null;
    }
  };

  // Mobile Layout
  const MobileLayout = () => (
    <View style={styles.container}>
      {/* Animated Header Card */}
      <Animated.View
        style={[
          styles.headerCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={["#4CAF50", "#45a049"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientHeader}
        >
          <Text style={styles.stepCounter}>
            Step {currentStep + 1} of {labels.length}
          </Text>
          <Text style={styles.stepLabel}>{labels[currentStep]}</Text>
        </LinearGradient>
      </Animated.View>

      {/* Step Indicator */}
      <Animated.View style={{ opacity: fadeAnim, marginVertical: 20 }}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentStep}
          stepCount={labels.length}
        />
      </Animated.View>

      {/* Content Area */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {renderStepContent()}
        </ScrollView>
      </Animated.View>

      {/* Navigation Buttons */}
      <Animated.View
        style={[
          styles.buttonContainer,
          { opacity: fadeAnim },
        ]}
      >
        <Animated.View style={{ transform: [{ scale: buttonScaleLeft }] }}>
          <TouchableOpacity
            onPress={handleBack}
            disabled={currentStep === 0}
            style={[
              styles.button,
              styles.backButton,
              currentStep === 0 && styles.disabledButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                currentStep === 0 && styles.disabledButtonText,
              ]}
            >
              ← Back
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScaleRight }] }}>
          <TouchableOpacity
            onPress={handleNext}
            disabled={currentStep === labels.length - 1}
            style={[
              styles.button,
              styles.nextButton,
              currentStep === labels.length - 1 && styles.disabledButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                styles.nextButtonText,
                currentStep === labels.length - 1 && styles.disabledButtonText,
              ]}
            >
              Next →
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );

  // Tablet Layout
  const TabletLayout = () => (
    <View style={styles.tabletContainer}>
      {/* Left Sidebar */}
      <Animated.View
        style={[
          styles.tabletSidebar,
          {
            opacity: fadeAnim,
            transform: [{ translateX: Animated.multiply(slideAnim, -1) }],
          },
        ]}
      >
        <LinearGradient
          colors={["#4CAF50", "#45a049"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.sidebarGradient}
        >
          <Text style={styles.tabletStepCounter}>
            Step {currentStep + 1}/{labels.length}
          </Text>

          <View style={styles.verticalStepIndicator}>
            {labels.map((label, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.stepItem,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateX: Animated.multiply(
                          slideAnim,
                          new Animated.Value(index * 0.1 - 1)
                        ),
                      },
                    ],
                  },
                ]}
              >
                <View
                  style={[
                    styles.stepCircle,
                    index === currentStep && styles.activeStepCircle,
                    index < currentStep && styles.completedStepCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepNumber,
                      (index === currentStep || index < currentStep) &&
                        styles.activeStepNumber,
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepLabelText,
                    index === currentStep && styles.activeStepLabel,
                  ]}
                >
                  {label}
                </Text>
                {index < labels.length - 1 && (
                  <View
                    style={[
                      styles.stepConnector,
                      index < currentStep && styles.completedConnector,
                    ]}
                  />
                )}
              </Animated.View>
            ))}
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Right Content Area */}
      <View style={styles.tabletContentArea}>
        {/* Header */}
        <Animated.View
          style={[
            styles.tabletHeader,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.tabletHeaderTitle}>{labels[currentStep]}</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${((currentStep + 1) / labels.length) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(((currentStep + 1) / labels.length) * 100)}% Complete
            </Text>
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={[
            styles.tabletContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.tabletScrollView}
          >
            {renderStepContent()}
          </ScrollView>
        </Animated.View>

        {/* Navigation */}
        <Animated.View
          style={[
            styles.tabletButtonContainer,
            { opacity: fadeAnim },
          ]}
        >
          <Animated.View style={{ transform: [{ scale: buttonScaleLeft }] }}>
            <TouchableOpacity
              onPress={handleBack}
              disabled={currentStep === 0}
              style={[
                styles.tabletButton,
                styles.backButton,
                currentStep === 0 && styles.disabledButton,
              ]}
            >
              <Text
                style={[
                  styles.tabletButtonText,
                  currentStep === 0 && styles.disabledButtonText,
                ]}
              >
                ← Previous Step
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: buttonScaleRight }] }}>
            <TouchableOpacity
              onPress={handleNext}
              disabled={currentStep === labels.length - 1}
              style={[
                styles.tabletButton,
                styles.nextButton,
                currentStep === labels.length - 1 && styles.disabledButton,
              ]}
            >
              <Text
                style={[
                  styles.tabletButtonText,
                  styles.tabletNextButtonText,
                  currentStep === labels.length - 1 && styles.disabledButtonText,
                ]}
              >
                Next Step →
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );

  return isTablet ? <TabletLayout /> : <MobileLayout />;
};

const styles = StyleSheet.create({
  // Mobile Styles
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  headerCard: {
    borderRadius: 15,
    overflow: "hidden",
    elevation: Platform.OS === "android" ? 0 : 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradientHeader: {
    padding: 20,
    alignItems: "center",
  },
  stepCounter: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.9,
  },
  stepLabel: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    elevation: Platform.OS === "android" ? 0 : 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
    elevation: Platform.OS === "android" ? 0 : 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  nextButton: {
    backgroundColor: "#4CAF50",
  },
  disabledButton: {
    backgroundColor: "#e0e0e0",
    borderColor: "#e0e0e0",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
  nextButtonText: {
    color: "#fff",
  },
  disabledButtonText: {
    color: "#9e9e9e",
  },

  // Tablet Styles
  tabletContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
  },
  tabletSidebar: {
    width: 280,
    elevation: Platform.OS === "android" ? 0 : 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sidebarGradient: {
    flex: 1,
    padding: 30,
  },
  tabletStepCounter: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  verticalStepIndicator: {
    flex: 1,
  },
  stepItem: {
    marginBottom: 10,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  activeStepCircle: {
    backgroundColor: "#FFD700",
    elevation: Platform.OS === "android" ? 0 : 3,
  },
  completedStepCircle: {
    backgroundColor: "#fff",
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  activeStepNumber: {
    color: "#2E7D32",
  },
  stepLabelText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.7,
    marginLeft: 5,
  },
  activeStepLabel: {
    opacity: 1,
    fontWeight: "bold",
    fontSize: 15,
  },
  stepConnector: {
    width: 2,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginLeft: 19,
    marginTop: 5,
  },
  completedConnector: {
    backgroundColor: "#fff",
  },
  tabletContentArea: {
    flex: 1,
    padding: 30,
  },
  tabletHeader: {
    marginBottom: 20,
  },
  tabletHeaderTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 15,
  },
  progressBarContainer: {
    marginTop: 10,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  tabletContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: Platform.OS === "android" ? 0 : 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabletScrollView: {
    flex: 1,
  },
  tabletButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    gap: 20,
  },
  tabletButton: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
    minWidth: 180,
    alignItems: "center",
    elevation: Platform.OS === "android" ? 0 : 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabletButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
  },
  tabletNextButtonText: {
    color: "#fff",
  },
});

Stepper.navigationOptions = navigationOptions;
export default Stepper;