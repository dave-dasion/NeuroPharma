import React from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "components";
import { t } from "utils";
import { Layout, ComponentsStyle, Colors } from "style";
import StorageHelper from "utils/StorageHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
};

const navigationOptions = ({ navigation }): StackNavigationOptions => ({
    headerShown: true,
    headerStyle: {
        ...ComponentsStyle.header,
    },
    headerBackTitle: null,
    headerTitle: () => (
        <Text.Header style={Layout.androidNavTitle}>{"Admin"}</Text.Header>
    ),
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            }}
            style={{ marginLeft: 15 }}
        >
            <Image
                style={{ height: 25, width: 25, tintColor: Colors.AppColor }}
                source={require('../../../assets/images/home.png')}
            />
        </TouchableOpacity>
    ),
    headerRight: () => (
        <TouchableOpacity
            onPress={() =>
                Alert.alert("Logout", "Are you sure you want to logout?", [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    {
                        text: "Ok",
                        onPress: async () => {

                            navigation.reset({
                                index: 0,
                                routes: [{ name: "HomeScreen" }],
                            });
                            await StorageHelper.clearAll()
                            await AsyncStorage.removeItem("REFRESH_TOKEN");
                        },
                    },
                ])
            }
            style={{ marginRight: 15 }}
        >
            <Ionicons name="power-outline" size={24} color={Colors.grey100} />
        </TouchableOpacity>
    ),
});

export default navigationOptions;
