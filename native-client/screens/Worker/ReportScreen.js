import React, { useState } from "react";
import * as Location from "expo-location";

import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import * as firebase from "firebase";
import Colors from "../../constants/Colors";
import ImagePicker from "../../components/ImagePicker";
import { firebaseConfig } from "../../config/fire";
import { useSelector } from "react-redux";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const ReportScreen = props => {
  //States
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Redux
  const token = useSelector(state => state.auth.token);
  const username = useSelector(state => state.auth.userId);
  const email = useSelector(state => state.auth.email);

  // Handlers
  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };
  const descriptionChangeHandler = text => {
    // you could add validation
    setDescriptionValue(text);
  };
  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  const saveReportHandler = async () => {
    if (titleValue && selectedImage) {
      uploadImage = async uri => {
        const response = await fetch(uri);
        const blob = await response.blob();
        let imageName = titleValue;
        var ref = firebase
          .storage()
          .ref()
          .child(imageName);
        await ref.put(blob);
        const fileUrl = await ref.getDownloadURL();
        console.log(fileUrl);

        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          let location = {
            coords: { latitude: "49.1197408", longitude: "-122.8888664" }
          };
        }
        let location = await Location.getCurrentPositionAsync({});

        await fetch(
          `https://location-app-5d3d8.firebaseio.com/images/${username}.json?auth=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: `${titleValue}`,
              url: `${fileUrl}`,
              userEmail: `${email}`,
              description: `${descriptionValue}`,
              latitude: `${location.coords.latitude}`,
              longitude: `${location.coords.longitude}`
            })
          }
        );
      };
      setIsLoading(true);
      uploadImage(selectedImage).then(() => {
        setIsLoading(false);
        Alert.alert("Success", "Report has been sent", [
          {
            text: "Okay",
            onPress: () => {
              props.navigation.goBack();
            }
          }
        ]);
      });
      console.log(selectedImage);
      console.log(titleValue);
    } else {
      Alert.alert("Error", "Please Add Title and Image Before Submitting", [
        {
          text: "Okay",
          onPress: () => {
            props.navigation.goBack();
          }
        }
      ]);
    }
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <View style={styles.form}>
            <ImagePicker onImageTaken={imageTakenHandler} />

            <Text style={styles.label}>Title</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={titleChangeHandler}
              value={titleValue}
            />
            <Text style={styles.label}>Description</Text>

            <TextInput
              style={styles.desciptionText}
              onChangeText={descriptionChangeHandler}
              value={descriptionValue}
            />
            <Button
              title="Save Report"
              color={Colors.primary}
              onPress={saveReportHandler}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
ReportScreen.navigationOptions = {
  headerTitle: "Add Report"
};
const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  },
  descriptionText: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: "80%"
  }
});
export default ReportScreen;
