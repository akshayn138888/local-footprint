import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

const tabScreenConfig = {
  Work: {
    screen: WorkerScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-person" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: "Work Tab"
    }
  },
  Report: {
    screen: ReportScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-today" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: "Create Report"
    }
  }
};

const LocationNavigator = createBottomTabNavigator(tabScreenConfig, {
  activeTintColor: "white",
  shifting: true,
  barStyle: {
    backgroundColor: Colors.primaryColor
  }
});

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Local FootPrint",
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "#09203f"
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
    }
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Worker: LocationNavigator
});

export default createAppContainer(MainNavigator);
