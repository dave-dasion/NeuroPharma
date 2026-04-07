import React, { useState } from "react";
import {  ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import {  ListItem } from "components";
import { NavStatelessComponent } from "interfaces";

import styles from "./OtherDiseases.styles";
import navigationOptions from "./OtherDiseases.navigationOptions";

// Depression: https://diseaseguide.org/neurology/depression/depression.html

// Dementia: https://diseaseguide.org/neurology/dementia/dementia.html

// Alzheimer's: https://diseaseguide.org/neurology/alzheimers/alzheimers.html

// Parkinson's: https://diseaseguide.org/neurology/parkinsons/parkinsons.html

// Migraine: https://diseaseguide.org/neurology/migraines/migraines.html

// Autism: https://diseaseguide.org/neurology/autism/autism.html

// Cancer: https://diseaseguide.org/neurology/cancer/cancer/cancer.html

// Cerebral: https://diseaseguide.org/neurology/cerebral/cerebral.html

// MTBI: https://diseaseguide.org/neurology/mtbi/mtbi.html

// Seizures: https://diseaseguide.org/neurology/seizures/seizures.html

const OtherDiseases: NavStatelessComponent = () => {
  const rowItems = [
    {
      title: "Depression",
      onPress: () => WebBrowser.openBrowserAsync("https://diseaseguide.org/neurology/depression/depression.html"),
    },
    {
      title: "Dementia  ",
      onPress: () => WebBrowser.openBrowserAsync("https://diseaseguide.org/neurology/dementia/dementia.html"),
    },
    {
      title: "Alzheimer’s",
      onPress: () => WebBrowser.openBrowserAsync("https://diseaseguide.org/neurology/alzheimers/alzheimers.html"),
    },
    {
      title: "Parkinson’s",
      onPress: () => WebBrowser.openBrowserAsync("https://diseaseguide.org/neurology/parkinsons/parkinsons.html"),
    },
    {
      title: 'Migraine',
      onPress: () => WebBrowser.openBrowserAsync("https://diseaseguide.org/neurology/migraines/migraines.html"),
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
