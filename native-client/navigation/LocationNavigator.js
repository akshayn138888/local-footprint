import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
//import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import WorkerScreen from "../screens/Worker/WorkerScreen";
import ReportScreen from "../screens/Worker/ReportScreen";
import AuthScreen from "../screens/Auth/AuthScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },

  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const LocationNavigator = createStackNavigator(
  {
    Work: WorkerScreen,
    Report: ReportScreen
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Worker: LocationNavigator
});

export default createAppContainer(MainNavigator);
