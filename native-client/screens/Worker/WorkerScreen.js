import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";

const WorkerScreen = props => {
  const [location, setlocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(
    function () {
      if (location) {
        fetch("https://location-app-5d3d8.firebaseio.com/locations.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            latitude: `${location.coords.latitude}`,
            longitude: `${location.coords.longitude}`
          })
        })
          .then(e => e.json())
          .then(data => console.log(data));
      }
    },
    [location]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({});
        setlocation(location);
      })();
    }, 9000);
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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