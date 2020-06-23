import React, { useState } from "react";
import { View, Button, Image, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";
const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    setPickedImage(image.uri);
    console.log(image);
    props.onImageTaken(image.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
            <Image style={styles.image} source={{ uri: pickedImage }} />
          )}
      </View>
      <View style={styles.takeImageBtn}>
        <Button
          title="TAKE IMAGE"
          color={Platform.OS == "android" ? "#4C718e" : Colors.accent}
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  imagePicker: {
    alignItems: "center"
  },
  takeImageBtn: {
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 5,
    overflow: "hidden",
    width: "100%"
  },
  imagePreview: {
    width: "100%",
    height: 150,
    marginBottom: "3%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowColor: "#000000",
    shadowOpacity: 0.5
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
export default ImgPicker;
