import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import { Text } from "components";
import { t } from "utils";
import { Colors, ComponentsStyle } from "style";

import styles from "./RemainderScreen.styles";

const navigationOptions = (openBottomSheet:() => void): StackNavigationOptions => ({
  ...ComponentsStyle.transitionBetweenScreenPresets,
  headerStyle: {
    ...ComponentsStyle.header,
  },
  headerBackTitleVisible: false,
  headerTintColor: Colors.grey100,
  headerTitle: () => <Text.Header>{"Reminder"}</Text.Header>,
  headerRight: () => (
    <TouchableOpacity
      onPress={() => {
        openBottomSheet()
      }}
      style={{ marginRight: 15 }}
    >
     <Text.Header style={styles.RightTextStyle}>+</Text.Header>
    </TouchableOpacity>
  )
});

export default navigationOptions;