import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BudgetScreen from "../../../screens/Budget";
import MontlyBudgetScreen from "../../../screens/MonthlyBudget";
import AddEmissionScreen from "../../../screens/AddEmission";
import Athlete from "screens/Athlete/Athlete";
import StapperScreen from "screens/StapperScreen/StapperScreen";
import CareScreen from "screens/CareScreen/CareScreen";
import TalkAi from "screens/TalkAi/TalkAi";
import HeadImage from "screens/HeadImage/HeadImage";
import ImagesScreen from "screens/ImagesScreen/ImagesScreen";
import ImageDetails from "screens/ImageDetails/ImageDetails";
import VoiceChat from "screens/VoiceChat/VoiceChat";
import CreateStory from "screens/CreateStory/CreateStory";
import ShowStoryTranscript from "screens/ShowStoryTranscript/ShowStoryTranscript";
import StoryTranscript from "screens/StoryTranscript/StoryTranscript";

const Stack = createStackNavigator();

const BudgetNavigator = (): React.ReactElement => (
  <Stack.Navigator initialRouteName="CareScreen">
    <Stack.Screen
      name="ImagesScreen"
      options={ImagesScreen.navigationOptions}
      component={ImagesScreen}
    />
    <Stack.Screen
      name="ImageDetails"
      options={ImageDetails.navigationOptions}
      component={ImageDetails}
    />

    <Stack.Screen name="CareScreen" options={CareScreen.navigationOptions} component={CareScreen} />
    <Stack.Screen name="Athlete" options={Athlete.navigationOptions} component={Athlete} />
    <Stack.Screen name="Budget" options={BudgetScreen.navigationOptions} component={BudgetScreen} />
    <Stack.Screen
      name="MonthlyBudget"
      options={MontlyBudgetScreen.navigationOptions}
      component={MontlyBudgetScreen}
    />
    <Stack.Screen
      name="AddEmission"
      options={AddEmissionScreen.navigationOptions}
      component={AddEmissionScreen}
    />
    <Stack.Screen
      name="StapperScreen"
      options={StapperScreen.navigationOptions}
      component={StapperScreen}
    />
    <Stack.Screen name="TalkAi" component={TalkAi} options={TalkAi.navigationOptions} />
    <Stack.Screen name="HeadImage" component={HeadImage} options={HeadImage.navigationOptions} />
    <Stack.Screen name="VoiceChat" component={VoiceChat} options={VoiceChat.navigationOptions} />
    <Stack.Screen name="CreateStory" component={CreateStory} options={CreateStory.navigationOptions} />
    <Stack.Screen name="ShowStoryTranscript" component={ShowStoryTranscript} options={ShowStoryTranscript.navigationOptions} />
    <Stack.Screen name="StoryTranscript" component={StoryTranscript} options={StoryTranscript.navigationOptions} />
    
  </Stack.Navigator>
);

export default BudgetNavigator;
