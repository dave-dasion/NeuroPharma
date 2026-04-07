import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";

import { Text } from "components";
import { t } from "utils";
import { Layout, Colors, ComponentsStyle } from "style";
import { Image, TouchableOpacity } from "react-native";

const navigationOptions = ({navigation}): StackNavigationOptions => ({
  ...ComponentsStyle.transitionBetweenScreenPresets,
  headerStyle: {
    ...ComponentsStyle.header,
  },
  headerTintColor: Colors.grey100,
  headerBackTitleVisible: false,
  headerTitle: () => (
    <Text.Header style={Layout.androidNavTitle}>{t("ABOUT_SCREEN_TITLE")}</Text.Header>
  ),
  headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VoiceChat')
          }}
          style={{ marginRight: 15 }}
        >
          <Image
            style={{ height: 25, width: 25,tintColor:Colors.AppColorSecondory }}
            source={require('../../../assets/images/LOGO_blue.png')}
          />
        </TouchableOpacity>
      )
});

export default navigationOptions;
