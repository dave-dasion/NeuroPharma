import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { Preferences } from "constant";
import { userPreferences } from "ducks";
import { ComponentsStyle } from "style";

import IntroScreen from "../../screens/Intro";
import DrawerNavigator from "./DrawerNavigator";
import HomeScreen from "screens/HomeScreen/HomeScreen";
import LoginScreen from "screens/LoginScreen";
import SignUp from "screens/SignUp/SignUp";
import OtpVerified from "screens/OtpVerified/OtpVerified";
import VoiceChat from "screens/VoiceChat/VoiceChat";
import TeamScreen from "screens/TeamScreen/TeamScreen";
import FamilyTranscript from "screens/FamilyTranscript/FamilyTranscript";
import Recoder from "screens/Recoder/Recoder";
import SoapNotes from "screens/GenerateNotes/GenerateNotes";
import AdminPage from "screens/AdminPage/AdminPage";

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
  ...ComponentsStyle.transitionBetweenScreenPresets,
};

const RootNavigator = (): React.ReactElement => {
  const hasAcceptedTermsOfUseVersion =
    Preferences.currentTermsOfUseVersion ===
    useSelector(userPreferences.selectors.getAcceptedTermsOfUseVersion);

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={screenOptions} />
      <Stack.Screen name="VoiceChat" component={VoiceChat} options={VoiceChat.navigationOptions} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={LoginScreen.navigationOptions} />
      <Stack.Screen name="SignUp" component={SignUp} options={SignUp.navigationOptions} />
      <Stack.Screen name="OtpVerified" component={OtpVerified} options={screenOptions} />
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} options={screenOptions} />
      <Stack.Screen name="BottomTab" component={DrawerNavigator} options={screenOptions} />
      <Stack.Screen name="TeamScreen" component={TeamScreen} options={TeamScreen.navigationOptions} />
      <Stack.Screen name="FamilyTranscript" component={FamilyTranscript} options={FamilyTranscript.navigationOptions} />
      <Stack.Screen name="Recoder" component={Recoder} options={Recoder.navigationOptions} />
      <Stack.Screen
        name="GenerateNotes"
        component={SoapNotes}
        options={SoapNotes.navigationOptions}
      />
                    <Stack.Screen name="AdminPage" component={AdminPage} options={AdminPage.navigationOptions} />

    </Stack.Navigator>
  );
};

export default RootNavigator;
