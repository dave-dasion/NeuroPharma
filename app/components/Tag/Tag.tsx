import React from "react";
import { Button, Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "style";

import Text from "../Text";
import styles from "./Tag.styles";

interface Props {
  icon?: string;
  text: string;
  onPress: () => void;
  iscustomImge:any
}

const Tag: React.FC<Props> = ({ text, onPress, icon ,iscustomImge}) => {
  let iconItem = null;
  if (icon) {
    iconItem = (
      <Ionicons
      suppressHighlighting={true}
      name={icon as keyof typeof Ionicons.glyphMap}
      size={32}
      style={styles.mainIcon}
      color={Colors.AppColor}
      />
    );
  } else {
    iconItem = (
      <Image
        style={{ height: 40, width: 35, resizeMode: 'contain' ,tintColor:Colors.AppColor,marginRight: 15,}}
        source={iscustomImge}  
      />
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {iconItem}
      <View style={styles.textContainer}>
        <Text.Primary style={styles.text}>{text}</Text.Primary>
      </View>
      <Ionicons suppressHighlighting={true} name={"chevron-forward"} size={20} color={Colors.AppColor} />
    </TouchableOpacity>
  );
};

export default Tag;
