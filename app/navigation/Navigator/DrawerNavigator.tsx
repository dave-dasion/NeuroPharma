import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import { Colors } from "style";

import CustomDrawerContent from "./CustomDrawerContent";
import BottomTabNavigator from "./BottomTabNavigator";

// Import all screens for drawer
import DashboardScreen from "screens/Dashboard/DashboardScreen";
import LearningHubScreen from "screens/LearningHub/LearningHubScreen";
import AICopilotScreen from "screens/AICopilot/AICopilotScreen";
import DrugDiscoveryScreen from "screens/DrugDiscovery/DrugDiscoveryScreen";
import BiologyStudioScreen from "screens/BiologyStudio/BiologyStudioScreen";
import QuantumLabScreen from "screens/QuantumLab/QuantumLabScreen";
import ClinicalSimulatorScreen from "screens/ClinicalSimulator/ClinicalSimulatorScreen";
import AnnotationLabScreen from "screens/AnnotationLab/AnnotationLabScreen";
import CommTrainingScreen from "screens/CommTraining/CommTrainingScreen";
import ResearchNotebookScreen from "screens/ResearchNotebook/ResearchNotebookScreen";

const { width } = Dimensions.get("window");
const Drawer = createDrawerNavigator();

const DrawerNavigator = (): React.ReactElement => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: width * 0.82,
        },
        overlayColor: 'rgba(10, 14, 39, 0.65)',
      }}
      initialRouteName="BottomTab"
    >
      <Drawer.Screen name="BottomTab" component={BottomTabNavigator} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="LearningHub" component={LearningHubScreen} />
      <Drawer.Screen name="AICopilot" component={AICopilotScreen} />
      <Drawer.Screen name="DrugDiscovery" component={DrugDiscoveryScreen} />
      <Drawer.Screen name="BiologyStudio" component={BiologyStudioScreen} />
      <Drawer.Screen name="QuantumLab" component={QuantumLabScreen} />
      <Drawer.Screen name="ClinicalSimulator" component={ClinicalSimulatorScreen} />
      <Drawer.Screen name="AnnotationLab" component={AnnotationLabScreen} />
      <Drawer.Screen name="CommTraining" component={CommTrainingScreen} />
      <Drawer.Screen name="ResearchNotebook" component={ResearchNotebookScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
