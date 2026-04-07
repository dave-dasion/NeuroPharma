
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { ListItem } from "components";
import { NavStatelessComponent } from "interfaces";
import styles from "./RecoveryScreen.styles";
import { Colors } from "style";
import navigationOptions from "./RecoveryScreen.navigationOptions";

const RecoveryScreen: NavStatelessComponent = () => {
  const rowItems = [
    {
      title: "Player Recovery Tracker",
      topics: [
        {
          title:
            "Displays injury details, estimated return time, and suggested replacements for injured players.",
          link: "",
        }
      ],
    },
    {
      title: "Team Dynamics Prediction",
      topics: [
        {
          title: "Analyzes how substitutions impact team performance and predicts game outcomes.",
          link: "",
        }
      ],
    },
    {
      title: "Replacement Strategy",
      topics: [
        {
          title:
            "Recommends optimal player replacements to enhance game performance.",
          link: "",
        }
      ],
    },
    {
      title: "Performance Impact Insights",
      topics: [
        {
          title:
            "Highlights the effects of injuries and replacements on overall team effectiveness.",
          link: "",
        },
      ],

    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={{ height: 10 }} />
      {rowItems.map((item, index) => {
        return (
          <View style={styles.container}>
            <View style={{ height: 5 }} />
            <TouchableOpacity onPress={()=>{
                  WebBrowser.openBrowserAsync("https://pdfobject.com/pdf/sample.pdf")
                }}>
            <Text style={styles.headingStyle}>{item.title}</Text>
            <View style={{ height: 10 }} />
            {item.topics.map((item1, index) => {
              return(
                <>
               
                  <Text style={styles.descriptionTextStyle}>{item1.title}</Text>
                
                <View style={{ height: 8 }} />
              </>
              )
              
            })}
            </TouchableOpacity>
            <View style={{ height: 8 }} />
            <View style={{ height: 2,backgroundColor:Colors.grey }} />
          </View>
        );
      })}
    </ScrollView>
  );
};

RecoveryScreen.navigationOptions = navigationOptions;

export default RecoveryScreen;
