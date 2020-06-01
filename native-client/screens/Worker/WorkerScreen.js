import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const WorkerScreen = props => {
  return (
    <View>
      <Text>WorkerScreen</Text>
      <Button
        title="Report-Incident"
        onPress={() => {
          props.navigation.navigate("Report");
        }}
      />
      <Button
        title="StartWork"
        onPress={() => {
          props.navigation.navigate("Auth");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WorkerScreen;
