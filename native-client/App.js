import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LocationNavigator from "./navigation/LocationNavigator";

export default function App() {
  return <LocationNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
