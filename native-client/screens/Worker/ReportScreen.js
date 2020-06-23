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
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ModalSelector from "react-native-modal-selector";
import * as firebase from "firebase";
import Colors from "../../constants/Colors";
import ImagePicker from "../../components/ImagePicker";
import { firebaseConfig } from "../../config/fire";
import { useSelector } from "react-redux";
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const ReportScreen = props => {
  //States
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [picker, setPicker] = useState(null);
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
  const pickerHandler = (itemValue, itemIndex) => {
    setPicker(itemValue);
  };
  const saveReportHandler = async () => {
    if (titleValue && selectedImage && picker && descriptionValue) {
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
              longitude: `${location.coords.longitude}`,
              incident: `${picker}`,
              timestamp: new Date().toLocaleString()
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
      Alert.alert(
        "Incomplete Form",
        "Please ensure form is complete before submitting.",
        [
          {
            text: "Okay"
          }
        ]
      );
    }
  };
  let index = 0;
  const data = [
    { key: index++, section: true, label: "Assault" },
    { key: index++, label: "Break and Enter" },
    { key: index++, label: "General Theft" },
    { key: index++, label: "Property Damage" },
    { key: index++, label: "General Theft" },
    { key: index++, label: "Public Intoxication" },
    { key: index++, label: "Vehicle Collision" },
    { key: index++, label: "General Theft" },
    {
      key: index++,
      label: "Vehicle Theft",
      accessibilityLabel: "Tap here for cranberries"
    }
  ];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "android" ? "" : "padding"}
      keyboardVerticalOffset={80}
      style={styles.screen}
    >
      <LinearGradient
        style={styles.outsideContainer}
        colors={["#517fa4", "#243949"]}
      >
        <ScrollView>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
              <View style={styles.form}>
                <ImagePicker onImageTaken={imageTakenHandler} />
                <View
                  style={{
                    marginVertical: "7%"
                  }}
                />
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={titleChangeHandler}
                  value={titleValue}
                />
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={descriptionChangeHandler}
                  value={descriptionValue}
                  multiline={true}
                />
                <View>
                  <ModalSelector
                    style={{
                      borderColor: "white",
                      borderWidth: 1,
                      overflow: "hidden",
                      borderRadius: 6
                    }}
                    data={data}
                    initValue={picker ? picker : "Select Type of Crime"}
                    accessible={true}
                    scrollViewAccessibilityLabel={"Scrollable options"}
                    cancelButtonAccessibilityLabel={"Cancel Button"}
                    onChange={option => setPicker(option.label)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        padding: 8,
                        color: "white"
                      }}
                    >
                      {" "}
                      {picker ? picker : "Select Type of Crime"}
                    </Text>
                  </ModalSelector>
                </View>
                <View style={styles.savebtn}>
                  <Button
                    buttonStyle={{ color: "white" }}
                    title="Save Report"
                    color={Platform.OS == "android" ? "#243949" : "#2b9ff5"}
                    onPress={saveReportHandler}
                  />
                </View>
              </View>
            )}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
ReportScreen.navigationOptions = {
  headerTitle: "Add Report"
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  outsideContainer: {
    flex: 1
    // alignItems: "center",
    // justifyContent: "center",
  },
  form: {
    marginHorizontal: 30,
    marginTop: "20%"
  },
  title: {
    fontSize: 35,
    marginBottom: "7%",
    color: "white",
    textAlign: "center"
  },
  label: {
    fontSize: 17,
    marginBottom: 15,
    color: "white"
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    color: "white"
  },
  savebtn: {
    fontSize: 18,
    color: "blue",
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    marginTop: "5%",
    overflow: "hidden"
  }
});
export default ReportScreen;

///50B2C0