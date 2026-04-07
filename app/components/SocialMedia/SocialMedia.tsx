import React from "react";
import { View, TouchableOpacity ,Image} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import { Colors } from "style";

import styles from "./SocialMedia.styles";

const socialMedia = [
  {
    iconName: require('../../../assets/images/Data-visulization-icon.png'),
    url: "https://data-to-decision.com/",
  },
  {
    iconName: require('../../../assets/images/chatbot.png'),
    url: "https://data-to-decision.com/",
  },
  {
    iconName: require('../../../assets/images/upload-to-cloud.png'),
    url: "https://data-to-decision.com/",
  },
];

const SocialMedia: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.box}>
      {socialMedia.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => Linking.openURL(item.url)}>
          {/* <FontAwesome5 name={item.iconName} size={32} color={Colors.grey70} /> */}
          <Image style={{
            width:30,
            height:30,
          }} source={item.iconName} />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default SocialMedia;
