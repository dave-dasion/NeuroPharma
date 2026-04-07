import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SpeechSummaryScreen from "screens/SpeechSummary/SpeechSummaryScreen";
import TermsScreen from "screens/TemsScreen/Terms";
import Login from "screens/LoginScreen/index";
import ElderlyCareHome from "screens/ElderlyCareHome";
import ElderlyCareSchedule from "screens/ElderlyCareSchedule";

import SettingsScreen from "../../../screens/Settings";
import AboutScreen from "../../../screens/About";
import SupportUsScreen from "../../../screens/SupportUs";
import MyLocationScreen from "../../../screens/MyLocation";
import FaqScreen from "../../../screens/Faq";
import NotificationsScreen from "../../../screens/Notifications";
import MyData from "../../../screens/MyData";
import LanguagesScreen from "../../../screens/Languages/LanguagesScreen";
import OtherDiseases from "screens/OtherDiseases/OtherDiseases";
import ElderlyCareOptions from "screens/ElderlyCareOptions/ElderlyCareOptions";
import PerformanceScore from "screens/PerformanceScore/PerformanceScore";
import { StripeProvider } from "@stripe/stripe-react-native";
import RecoveryScreen from "screens/RecoveryScreen/RecoveryScreen";
import VoiceChat from "screens/VoiceChat/VoiceChat";
import RemainderScreen from "screens/Remainder";
import TermsOfUseScreen from "screens/TermsOfUse";
import Billing from "screens/Billing/Billing";
import BillingDetails from "screens/BillingDetails/BillingDetails";
import RequestDocument from "screens/RequestDocument/RequestDocument";

const Stack = createStackNavigator();

const SettingsNavigator = (): React.ReactElement => (
  <StripeProvider publishableKey="pk_test_51NNNthK7hXiozeP9NpfkMziWXqomQDlPHBGkPsQvlUHrrJki5q4PV2H5kNvSKUmzCu9t94Bym9ChXsRFGVh7xVPd00yL4LcToJ">
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        options={SettingsScreen.navigationOptions}
        component={SettingsScreen}
      />
      <Stack.Screen name="About" options={AboutScreen.navigationOptions} component={AboutScreen} />
      <Stack.Screen
        name="SupportUs"
        options={SupportUsScreen.navigationOptions}
        component={SupportUsScreen}
      />
      <Stack.Screen
        name="Reminder"
        options={RemainderScreen.navigationOptions}
        component={RemainderScreen}
      />
      <Stack.Screen
        name="MyLocation"
        options={MyLocationScreen.navigationOptions}
        component={MyLocationScreen}
      />
      <Stack.Screen name="Faq" options={FaqScreen.navigationOptions} component={FaqScreen} />
      <Stack.Screen
        name="Notifications"
        options={NotificationsScreen.navigationOptions}
        component={NotificationsScreen}
      />
      <Stack.Screen name="MyData" options={MyData.navigationOptions} component={MyData} />
      <Stack.Screen
        name="Languages"
        options={LanguagesScreen.navigationOptions}
        component={LanguagesScreen}
      />
      <Stack.Screen
        name="NeuroGuard"
        options={SpeechSummaryScreen.navigationOptions}
        component={SpeechSummaryScreen}
      />
      <Stack.Screen
        name="TermsScreen"
        options={TermsScreen.navigationOptions}
        component={TermsScreen}
      />
      <Stack.Screen
        name="Login"
        options={Login.navigationOptions}
        // options={{
        //   headerShown: false,
        // }}
        component={Login}
      />
      <Stack.Screen
        name="ElderlyCareHome"
        // options={LanguagesScreen.navigationOptions}
        options={{
          headerShown: false,
        }}
        component={ElderlyCareHome}
      />
      <Stack.Screen
        name="ElderlyCareSchedule"
        // options={LanguagesScreen.navigationOptions}

        options={{
          headerShown: false,
        }}
        component={ElderlyCareSchedule}
      />

      <Stack.Screen
        name="OtherDiseases"
        options={OtherDiseases.navigationOptions}
        // options={{
        //   headerShown: false,
        // }}
        component={OtherDiseases}
      />

      <Stack.Screen
        name="ElderlyCareOptions"
        options={ElderlyCareOptions.navigationOptions}
        // options={{
        //   headerShown: false,
        // }}
        component={ElderlyCareOptions}
      />

      <Stack.Screen
        name="PerformanceScore"
        options={PerformanceScore.navigationOptions}
        // options={{
        //   headerShown: false,
        // }}
        component={PerformanceScore}
      />
      <Stack.Screen
        name="RecoveryScreen"
        options={RecoveryScreen.navigationOptions}
        // options={{
        //   headerShown: false,
        // }}
        component={RecoveryScreen}
      />
      <Stack.Screen
        name="VoiceChat"
        component={VoiceChat}
        options={VoiceChat.navigationOptions}
      />

      <Stack.Screen
        name="TermsOfUseScreen"
        component={TermsOfUseScreen}
        options={TermsOfUseScreen.navigationOptions}
      />
      <Stack.Screen
        name="Billing"
        component={Billing}
        options={Billing.navigationOptions}
      />
      <Stack.Screen
        name="BillingDetails"
        component={BillingDetails}
        options={BillingDetails.navigationOptions}
      />
      <Stack.Screen
        name="RequestDocument"
        component={RequestDocument}
        options={RequestDocument.navigationOptions}
      />


    </Stack.Navigator>




  </StripeProvider>
);

export default SettingsNavigator;
