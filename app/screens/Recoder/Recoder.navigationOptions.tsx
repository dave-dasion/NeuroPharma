import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";

import { Text } from "components";
import { t } from "utils";
import { Layout, ComponentsStyle, Colors } from "style";

const navigationOptions = (): StackNavigationOptions => ({
  ...ComponentsStyle.transitionBetweenScreenPresets,
    headerStyle: {
      ...ComponentsStyle.header,
    },
    headerBackTitleVisible: false,
    headerTintColor: Colors.grey100,
  // headerBackTitle: null,
  headerTitle: () => <Text.Header style={Layout.androidNavTitle}>{'Recorder'}</Text.Header>,
});

export default navigationOptions; 