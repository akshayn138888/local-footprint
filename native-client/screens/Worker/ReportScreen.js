import React, { useState } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import * as firebase from "firebase";
// import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import ImagePicker from "../../components/ImagePicker";
import { firebaseConfig } from "../../config/fire";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const ReportScreen = props => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };
  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  const saveReportHandler = () => {
    uploadImage = async uri => {
      const response = await fetch(uri);
      const blob = await response.blob();
      let imageName = selectedImage.split("/").pop() + "$" + titleValue;

      var ref = firebase
        .storage()
        .ref()
        .child(imageName);
      return ref.put(blob, { title: titleValue });
    };
    uploadImage(selectedImage);

    console.log(selectedImage);
    console.log(titleValue);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <Button
          title="Save Report"
          color={Colors.primary}
          onPress={saveReportHandler}
        />
      </View>
    </ScrollView>
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
  }
});

export default ReportScreen;
