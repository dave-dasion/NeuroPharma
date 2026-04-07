import React, { useState } from "react";
import {  ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import {  ListItem } from "components";
import { NavStatelessComponent } from "interfaces";

import styles from "./ElderlyCareOptions.styles";
import navigationOptions from "./ElderlyCareOptions.navigationOptions";

// Smart Ambient Subscriber
// Depression Screen
// Dementia Screen
// Elderly Care

const OtherDiseases: NavStatelessComponent = () => {
  const rowItems = [
    {
      title: "Smart Ambient Subscriber",
      onPress: () => WebBrowser.openBrowserAsync("https://data-to-decision.com/"),
    },
    {
      title: "Depression Screen",
      onPress: () => WebBrowser.openBrowserAsync("https://data-to-decision.com/"),
    },
    {
      title: "Dementia Screen",
      onPress: () => WebBrowser.openBrowserAsync("https://data-to-decision.com/"),
    },
    {
      title: "NeuroGuard",
      onPress: () => WebBrowser.openBrowserAsync("https://data-to-decision.com/"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {rowItems.map((item, index) => {
          return (
            <ListItem
              key={index}
              showBottomLine={true}
              onPress={() => item.onPress()}
              title={item.title}
            />
          );
      })}
    </ScrollView>
  );
};

OtherDiseases.navigationOptions = navigationOptions;

export default OtherDiseases;
