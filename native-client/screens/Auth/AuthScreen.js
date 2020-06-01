import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const AuthScreen = props => {
  return (
    <View>
      <Text>Auth Screen</Text>
      <Button
        title="StartWork"
        onPress={() => {
          props.navigation.navigate("Work");
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

export default AuthScreen;
