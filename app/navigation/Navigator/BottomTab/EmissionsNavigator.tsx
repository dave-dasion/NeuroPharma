import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EmissionItemScreen from "../../../screens/EmissionItem";
import EmissionsScreen from "../../../screens/Emissions";
import MonthlyEmissionsScreen from "../../../screens/MonthlyEmissions";
import RecurringEmissionsScreen from "../../../screens/RecurringEmissions";
import VoiceChat from "screens/VoiceChat/VoiceChat";
import DasionConsent from "screens/DasionConsent/DasionConsent";
import RequestDocument from "screens/RequestDocument/RequestDocument";

const Stack = createStackNavigator();

const EmissionsNavigator = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen
      name="Emissions"
      options={EmissionsScreen.navigationOptions}
      component={EmissionsScreen}
    />
    <Stack.Screen
      name="EmissionItem"
      options={EmissionItemScreen.navigationOptions}
      component={EmissionItemScreen}
    />
    <Stack.Screen
      name="MonthlyEmissions"
      options={MonthlyEmissionsScreen.navigationOptions}
      component={MonthlyEmissionsScreen}
    />
    <Stack.Screen
      name="RecurringEmissions"
      options={RecurringEmissionsScreen.navigationOptions}
      component={RecurringEmissionsScreen}
    />
     <Stack.Screen
          name="VoiceChat"
          component={VoiceChat}
          options={VoiceChat.navigationOptions}
        />
          <Stack.Screen
      name="DasionConsent"
      component={DasionConsent}
      options={DasionConsent.navigationOptions}
    />
          <Stack.Screen
      name="RequestDocument"
      component={RequestDocument}
      options={RequestDocument.navigationOptions}
    />
        
  </Stack.Navigator>
);

export default EmissionsNavigator;
