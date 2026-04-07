// import React from "react";
// import { StackNavigationOptions } from "@react-navigation/stack";

// import { Text } from "components";
// import { t } from "utils";
// import { Layout, ComponentsStyle, Colors } from "style";
// import { Image, TouchableOpacity } from "react-native";

// const navigationOptions = ({navigation}): StackNavigationOptions => ({
//   headerStyle: {
//     ...ComponentsStyle.header,
//   },
//   headerBackTitle: null,
//   headerTitle: () => <Text.H1 style={Layout.androidNavTitle}>{'AI Voice Companion'}</Text.H1>,
//   headerRight: () => (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.navigate('VoiceChat')
//       }}
//       style={{ marginRight: 15 }}
//     >
//       <Image
//         style={{ height: 25, width: 25,tintColor:Colors.AppColor }}
//         source={require('../../../assets/images/LOGO_blue.png')}
//       />
//     </TouchableOpacity>
//   )
   
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
  const title = 'AI Voice Companion';

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

