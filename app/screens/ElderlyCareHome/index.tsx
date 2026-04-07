import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./style";

const ElderlyCareHome = () => {
  return (
    <View style={styles.container}>
      {/* Top Welcome Card */}
      <LinearGradient
        colors={["#f68d43", "#f0ab5d", "#eda882"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.welcomeCard}
      >
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Hi, Weiqing</Text>
          <Text style={styles.subText}>How are you doing?</Text>
        </View>
        <Icon name="flower-outline" size={50} color="#f4c8a8" style={styles.settingsIcon} />
      </LinearGradient>
      <View style={{ height: 40 }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Chat to AI Agent Card */}
        <LinearGradient
          colors={["#f68d43", "#f68d43"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Chat to our AI agent</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Icon name="checkbox-sharp" size={20} color="#fdf7f0" style={styles.checkIcon} />
              <Text style={styles.featureText}>Unlimited Chats</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="checkbox-sharp" size={20} color="#fdf7f0" style={styles.checkIcon} />
              <Text style={styles.featureText}>Fast Response</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={{ height: 30 }} />
        {/* MRI Image Uploader Card */}
        <View style={styles.cardLight}>
          <Text style={styles.cardTitle2}>MRI Image Uploader</Text>
          <View style={{ height: 15 }} />
          <View style={styles.featureItem}>
            <Icon name="checkbox-sharp" size={20} color="gray" style={styles.checkIcon} />
            <Text style={styles.featureText2}>Auto-Analysis</Text>
          </View>
        </View>
        <View style={{ height: 30 }} />
        {/* Tutorial Card */}
        <View style={styles.cardLight}>
          <View style={styles.profileViewStyle}>
            <View>
              <Text style={styles.cardTitle2}>Tutorial</Text>
              <View style={{ height: 20 }} />
              <Text style={styles.featureText2}>Watch how to use our feature.</Text>
            </View>
            <Image
              source={require("../../../assets/images/girlProfile.jpg")}
              style={styles.tutorialImage}
            />
          </View>
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      {/* <View style={styles.bottomNav}>
        <Icon name="home" size={25} color="#ff8c00" />
        <Icon name="document-text-outline" size={25} color="#b0b0b0" />
        <Icon name="bar-chart-outline" size={25} color="#b0b0b0" />
        <Icon name="person-outline" size={25} color="#b0b0b0" />
      </View> */}
    </View>
  );
};

export default ElderlyCareHome;
