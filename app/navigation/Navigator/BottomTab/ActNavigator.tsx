import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ActTabNavigator from "./ActTabNavigator";
import ActDetailScreen from "../../../screens/ActDetail";
import StapperScreen from "screens/StapperScreen/StapperScreen";
import AssessmentPage from "screens/AssessmentPage/AssessmentPage";
import { Colors, Font } from "style";
import TalkAi from "screens/TalkAi/TalkAi";
import DoctorAssessment from "screens/DoctorAssessment/DoctorAssessment";
import VoiceChat from "screens/VoiceChat/VoiceChat";
import AIDoctorAssessmetNotes from "screens/AIDoctorAssessmetNotes/AIDoctorAssessmetNotes";
import AsessmentAISingleNotes from "screens/AsessmentAISingleNotes/AsessmentAISingleNotes";
import DoctorSOAPNotes from "screens/DoctorSOAPNotes/DoctorSOAPNotes";

const Stack = createStackNavigator();

const ActNavigator = (): React.ReactElement => (
  <Stack.Navigator
    initialRouteName="DoctorAssessment"
    screenOptions={{
      headerTitleStyle: {
        color: Colors.grey100,
        fontFamily: Font.FontWeight.Black,
        fontSize: Font.FontSize.H1,
      }, // Increase font size
    }}
  >
    {/* <BottomTab.Screen name="AssessmentPage" component={AssessmentPage} options={BudgetOptions} /> */}
    <Stack.Screen
      name="DoctorAssessment"
      options={DoctorAssessment.navigationOptions}
      component={DoctorAssessment}
    />
    <Stack.Screen
      name="AssessmentPage"
      options={AssessmentPage.navigationOptions}
      component={AssessmentPage}
    />

    <Stack.Screen
      name="StapperScreen"
      options={StapperScreen.navigationOptions}
      component={StapperScreen}
    />
    <Stack.Screen
      name="ActTabNavigator"
      options={ActTabNavigator.navigationOptions}
      component={ActTabNavigator}
    />
    <Stack.Screen
      name="ActDetail"
      component={ActDetailScreen}
      options={ActDetailScreen.navigationOptions}
    />
    <Stack.Screen name="VoiceChat" component={VoiceChat} options={VoiceChat.navigationOptions} />
    <Stack.Screen
      name="AIDoctorAssessmetNotes"
      component={AIDoctorAssessmetNotes}
      options={AIDoctorAssessmetNotes.navigationOptions}
    />

    <Stack.Screen
      name="AsessmentAISingleNotes"
      component={AsessmentAISingleNotes}
      options={AsessmentAISingleNotes.navigationOptions}
    />
    <Stack.Screen
      name="DoctorSOAPNotes"
      component={DoctorSOAPNotes}
      options={DoctorSOAPNotes.navigationOptions}
    />
  </Stack.Navigator>
);

export default ActNavigator;
