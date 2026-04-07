import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { t } from "utils";
import { Colors, ComponentsStyle } from "style";
import { TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const navigationOptions = ({ navigation }): StackNavigationOptions => {
  // Dynamic title (can be passed through route params)
  const title = 'Doctor SOAP Notes';

  return {
   ...ComponentsStyle.transitionBetweenScreenPresets,
       headerStyle: {
         ...ComponentsStyle.header,
       },
       headerBackTitleVisible: false,
       headerTintColor: Colors.grey100,
    headerTitle: () => (
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
      }}>
        {title}
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


