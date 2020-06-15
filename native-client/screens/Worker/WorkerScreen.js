import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView, Platform } from "react-native";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../constants/Colors'

import Clock from '../../components/Clock'


const WorkerScreen = props => {
  const [location, setlocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const username = useSelector(state => state.auth.userId);
  const email = useSelector(state => state.auth.email);

  useEffect(
    function () {
      if (location) {
        fetch(
          `https://location-app-5d3d8.firebaseio.com/locations/${username}.json?auth=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              latitude: `${location.coords.latitude}`,
              longitude: `${location.coords.longitude}`,
              userEmail: `${email}`,
              timestamp: new Date().toLocaleString()
            })
          }
        )
          .then(e => e.json())
          .then(data => console.log(data));
      }
    },
    [location]
  );

  useEffect(() => {
    // const interval = setInterval(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setlocation(location);
    })();
    // }, 30000); ////////////////////////////////////// CHange Timing when //////////////////////// Demoing

    // return () => clearInterval(interval);
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
  let userEmail = <Text>Fetching...</Text>;
  if (email) {
    userEmail = <Text>{email}</Text>;
  }

  return (
    <LinearGradient style={styles.outsideContainer} colors={["#22c1c3", "#2d9afd"]}>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.titleHeader}>{userEmail}</Text>

        <Clock />
        <Text style={styles.work}>Time Worked</Text>



      </View>
      <View style={styles.btnWork}>
        <Button color={Platform.OS == "android" ? Colors.primary : Colors.accent} title="Finish Work" onPress={logoutHandler} />
      </View>
      {/* </ScrollView> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  oocontainer: {
    flex: 1
  },
  outsideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "white",
    marginTop: "10%",
    fontSize: 50,
    marginBottom: "3%"

  },
  titleHeader: {
    color: "white",
    marginBottom: "20%"
  },
  work: {
    color: "white",
    fontSize: 15,
  },
  btnWork: {
    marginBottom: 70,
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 15,
    padding: Platform.OS === "android" ? 0 : 12,
    overflow: "hidden"
  }

});

export default WorkerScreen;
