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
   headerTintColor: Colors.grey100,
   headerBackTitleVisible: false,
  headerTitle: () => <Text.H1 style={Layout.androidNavTitle}>{'Talk To AI'}</Text.H1>,
});

export default navigationOptions;