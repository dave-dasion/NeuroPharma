
// import React from "react";
// import { StackNavigationOptions } from "@react-navigation/stack";

// import { Text } from "components";
// import { t } from "utils";
// import { ComponentsStyle } from "style";

// const navigationOptions = (): StackNavigationOptions => ({
//   headerStyle: {
//     ...ComponentsStyle.header,
//   },
//   headerBackTitleVisible: false,
//   headerTitle: () => <Text.H1>{t("ACT_SCREEN_TITLE")}</Text.H1>,
// });

// export default navigationOptions;


import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { t } from "utils";
import { Colors, ComponentsStyle } from "style";
import { TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const navigationOptions = ({ navigation }): StackNavigationOptions => {
  // Dynamic title (can be passed through route params)
  const title = 'Doctor Assessment';

  return {
    headerShown: true,
    headerStyle: {
      ...ComponentsStyle.header,
    },
    headerBackTitle: null,
    headerTitle: () => (
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
      }}>
        {t("ACT_SCREEN_TITLE")}
      </Text>
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

  };
};

export default navigationOptions;


