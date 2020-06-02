import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const WorkerScreen = props => {
  const [location, setlocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  useEffect(
    function() {
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

    return () => clearInterval(interval);
  }, []);

  const logoutHandler = async () => {
    let actions = authActions.logout();
    try {
      await dispatch(actions);
      props.navigation.navigate("Auth");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

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
      <Button title="Log Out" onPress={logoutHandler} />
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
