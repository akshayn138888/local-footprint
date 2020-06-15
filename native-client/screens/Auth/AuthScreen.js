import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert, TextInput, Text, Image, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux"


import Colors from '../../constants/Colors'

import * as authActions from '../../store/actions/auth'

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState()
  const dispatch = useDispatch()


  function handleEmail(evt) {
    const email = evt.nativeEvent.text
    setEmail(email);
  }

  function handlePassword(evt) {
    const password = evt.nativeEvent.text
    setPassword(password);
  }

  const authHandler = async () => {
    const actions = authActions.login(
      email,
      password
    )
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(actions)
      props.navigation.navigate('Worker')
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  // const inputChangeHandler = useCallback(
  //   (inputIdentifier, inputValue, inputValidity) => {
  //     dispatchFormState({
  //       type: FORM_INPUT_UPDATE,
  //       value: inputValue,
  //       isValid: inputValidity,
  //       input: inputIdentifier
  //     });
  //   },
  //   [dispatchFormState]
  // );
  let errText = <Text></Text>
  if (error) {
    const errText = <Text>{error}</Text>
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#22c1c3", "#2d9afd"]} style={styles.gradient}>
        {errText}
        <Image source={require('../../assets/OwlLogo.png')} style={styles.owl} />

        <Text style={styles.title}> Local Footprint</Text>
        <Text style={styles.titleHeader}> Please Login to Continue</Text>
        <ScrollView>
          <View style={styles.authContainer}>

            <TextInput
              style={styles.textInput1}
              value={email}
              onChange={handleEmail}
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
            />
            <TextInput
              style={styles.textInput1}
              value={password}
              onChange={handlePassword}
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                  <Button
                    title={"Login"}
                    color={Platform.OS == "android" ? Colors.primary : Colors.accent}
                    onPress={authHandler}
                  />
                )}

            </View>
            <Button
              title={"Worker Screen"}
              color={Platform.OS == "android" ? Colors.primary : Colors.accent}
              onPress={() => props.navigation.navigate('Worker')}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  owl: {
    width: "30%",
    height: "23%",
    marginLeft: 0,
    marginTop: "5%"
  },
  title: {
    color: "white",
    marginTop: "10%",
    fontSize: 35

  },
  titleHeader: {
    color: "white",
    marginBottom: "8%"
  },
  authContainer: {
    flex: 1,
    width: 300,
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    borderRadius: 10,
  },
  textInput1: {
    marginBottom: "6%",
    backgroundColor: "white",
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;


// useEffect(() => {
//   if (error) {
//       Alert.alert('An Error Occured', error, [{ text: 'Okay' }])
//   }
// }, [error])