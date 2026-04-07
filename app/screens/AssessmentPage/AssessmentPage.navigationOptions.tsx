// import React from "react";
// import { StackNavigationOptions } from "@react-navigation/stack";
// import { Text } from "components";
// import { t } from "utils";
// import { Colors, ComponentsStyle } from "style";
// import { TouchableOpacity ,Image} from "react-native";
// import { useNavigation } from "@react-navigation/native";



// const navigationOptions = ({navigation}): StackNavigationOptions => ({
//   headerShown: true, 
//   headerStyle: {
//     ...ComponentsStyle.header, 
//   },
//   headerBackTitle: null,
//   headerLeft: () => (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.goBack()
//       }}
//       style={{ marginLeft: 15 }}
//     >
//       <Image style={{ height: 25, width: 25, }} source={require('../../../assets/images/back.png')} />
//     </TouchableOpacity>
//   ),
//   title:'Injury Assessment'
// }); 

// export default navigationOptions;

import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";

import { Text } from "components";
import { t } from "utils";
import { Layout, ComponentsStyle, Colors } from "style";
import { Image, TouchableOpacity } from "react-native";

const navigationOptions = ({navigation}): StackNavigationOptions => ({
  ...ComponentsStyle.transitionBetweenScreenPresets,
    headerStyle: {
      ...ComponentsStyle.header,
    },
    headerBackTitleVisible: false,
    headerTintColor: Colors.grey100,
  // headerBackTitle: null,
  headerTitle: () => <Text.Header style={Layout.androidNavTitle}>{'Memory Assessment'}</Text.Header>,
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