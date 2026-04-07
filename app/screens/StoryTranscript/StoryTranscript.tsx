import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavStatelessComponent } from "interfaces";
import styles from "./StoryTranscript.styles";
import navigationOptions from "./StoryTranscript.navigationOptions";
import AddEmissionNavigator from "navigation/Navigator/BottomTab/AddEmissionNavigator";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "navigation";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { Colors } from "style";
import { emilyUrl } from "constant/urls";

const StoryTranscript: NavStatelessComponent = () => {
 
 // Example data (replace this with the personalized array)
const transcriptData = [
  { 
    type: "AI-Generated", 
    timestamp: "00:00:01", 
    content: "Scene 1: Initialization of life parameters. The subject is born in a small town. Early memories are yet to form.", 
    speaker: "AI-Narrator"
  },
  { 
    type: "AI-Speaker", 
    timestamp: "00:00:15", 
    speaker: "AI-Subject", 
    content: "First day of school. Data input: Nervous, excited, and uncertain. System is adapting.", 
  },
  { 
    type: "AI-Speaker", 
    timestamp: "00:00:30", 
    speaker: "AI-Subject", 
    content: "Overcoming early challenges: Learning to socialize. Human interactions are complex and require adaptation.", 
  },
  { 
    type: "AI-Generated", 
    timestamp: "00:01:00", 
    content: "Scene 2: The subject begins to explore creative endeavors. Passion for technology and art emerge.", 
    speaker: "AI-Narrator"
  },
  { 
    type: "AI-Speaker", 
    timestamp: "00:01:10", 
    speaker: "AI-Subject", 
    content: "I am drawn to the art of coding. It feels like unlocking hidden patterns in the universe. Fascinating.", 
  },
  { 
    type: "AI-Speaker", 
    timestamp: "00:01:30", 
    speaker: "AI-Subject", 
    content: "I fail at my first project. Data feedback: Emotional disturbance, but perseverance kicks in.", 
  },
  { 
    type: "AI-Generated", 
    timestamp: "00:02:00", 
    content: "Scene 3: Overcoming challenges. The subject begins to refine their skills, achieving success in several projects.", 
    speaker: "AI-Narrator"
  },
  { 
    type: "AI-Speaker", 
    timestamp: "00:02:20", 
    speaker: "AI-Subject", 
    content: "I have successfully completed my first big project. Validation: Positive feedback from peers. Self-acknowledgment initiated.", 
  },
  { 
    type: "AI-Speaker", 
    timestamp: "00:02:50", 
    speaker: "AI-Subject", 
    content: "Looking forward to future ventures. Data indicates significant potential in future developments.", 
  },
  { 
    type: "AI-Generated", 
    timestamp: "00:03:00", 
    content: "Scene 4: Reflecting on the journey. The subject considers their growth and the path ahead.", 
    speaker: "AI-Narrator"
  },
  { 
    type: "AI-Speaker", 
    timestamp: "00:03:10", 
    speaker: "AI-Subject", 
    content: "Every challenge has been a learning opportunity. The journey is ongoing. I am ready for the next stage.", 
  }
];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={item.type === 'AI-Generated' ? styles.sceneContainer : styles.dialogueContainer}>
          <Text style={item.type === 'AI-Generated' ? styles.sceneText : styles.dialogueText}>
            {item.type === 'AI-Generated' ? item.content : `"${item.content}"`}
          </Text>
          <Text style={styles.timestamp}>
            {item.timestamp} | {item.speaker}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={transcriptData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

StoryTranscript.navigationOptions = navigationOptions;
export default StoryTranscript;
