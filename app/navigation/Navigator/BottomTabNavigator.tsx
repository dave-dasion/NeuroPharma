import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "style";

import DashboardScreen from "screens/Dashboard/DashboardScreen";
import SettingsNavigator from "./BottomTab/SettingsNavigator";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = (): React.ReactElement => {
  const { bottom } = useSafeAreaInsets();
  return (
    <BottomTab.Navigator
      initialRouteName={"DashboardTab"}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0a0e27',
        tabBarInactiveTintColor: '#878787',
        tabBarStyle: {
          height: isTablet ? 90 : 70 + bottom,
          paddingBottom: isTablet ? 15 : bottom + 10,
          paddingTop: 10,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          elevation: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          marginTop: -5,
          letterSpacing: 0.5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'DashboardTab') {
            iconName = focused ? 'monitor-dashboard' : 'monitor-dashboard';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'tune' : 'tune-vertical';
          }
          return <MaterialCommunityIcons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <BottomTab.Screen 
        name="DashboardTab" 
        component={DashboardScreen} 
        options={{ tabBarLabel: 'LAB' }} 
      />
      <BottomTab.Screen 
        name="SettingsTab" 
        component={SettingsNavigator} 
        options={{ tabBarLabel: 'SETTINGS' }} 
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;