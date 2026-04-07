import React, { useEffect, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View, Animated, useWindowDimensions } from "react-native";

import { Colors } from "style";
import { NavStatelessComponent } from "interfaces";

import styles from "./PerformanceScore.styles";
import navigationOptions from "./PerformanceScore.navigationOptions";

const PerformanceScore: NavStatelessComponent = () => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  
  // Animation logic: Array of animated values for each card
  const animatedValues = useRef(
    [0, 1, 2, 3].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Reset and Start animations whenever the component mounts
    animatedValues.forEach((val) => val.setValue(0));
    const animations = animatedValues.map((val, index) =>
      Animated.spring(val, {
        toValue: 1,
        tension: 20,
        friction: 7,
        delay: index * 150, // Stagger effect
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

  const rowItems = [
    { title: "Health Monitoring", topics: [{ title: "Tracks data from wearables...", link: "" }, { title: "Provides real-time updates...", link: "" }] },
    { title: "Care Prediction", topics: [{ title: "Predicts potential health concerns...", link: "" }, { title: "Recommends preventive steps...", link: "" }] },
    { title: "Condition Management", topics: [{ title: "Helps identify early signs...", link: "" }, { title: "Suggests personalized adjustments...", link: "" }] },
    { title: "Adaptive Care Support", topics: [{ title: "Continuously monitors changes...", link: "" }] },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.gridContainer, isTablet && { paddingHorizontal: 20 }]}>
        {rowItems.map((item, index) => {
          // Animation Styles
          const animatedStyle = {
            opacity: animatedValues[index],
            transform: [
              { translateY: animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) },
              { scale: animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }
            ],
          };

          return (
            <Animated.View 
              key={index} 
              style={[
                styles.card, 
                isTablet ? { 
                  width: "48%", 
                  padding: 30, // Larger padding for tablet
                  minHeight: 220,
                  marginBottom: 25 
                } : { width: "100%" }, 
                animatedStyle
              ]}
            >
              <Text style={[
                styles.headingStyle, 
                isTablet && { fontSize: 28, marginBottom: 15 } // Larger Heading for tablet
              ]}>
                {item.title}
              </Text>
              
              <View style={[
                styles.divider, 
                isTablet && { marginVertical: 15, height: 2 } 
              ]} />
              
              {item.topics.map((topic, tIndex) => (
                <TouchableOpacity 
                  key={tIndex} 
                  style={[
                    styles.topicWrapper, 
                    isTablet && { marginVertical: 8 }
                  ]}
                >
                  <Text style={[
                    styles.bullet, 
                    isTablet && { fontSize: 24, marginRight: 12 }
                  ]}>
                    •
                  </Text>
                  <Text style={[
                    styles.descriptionTextStyle, 
                    isTablet && { fontSize: 20, lineHeight: 28 } // Larger Text for tablet
                  ]}>
                    {topic.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          );
        })}
      </View>
    </ScrollView>
  );
};

PerformanceScore.navigationOptions = navigationOptions;
export default PerformanceScore;