import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert, TextInput, Text } from "react-native";
import { useDispatch } from "react-redux"

import Colors from '../../constants/Colors'
import Card from '../../components/Card'

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
    <View>
      {errText}
      <Text>Auth Screen</Text>
      <Button
        title="StartWork"
        onPress={() => {
          props.navigation.navigate("Work");
        }}
      />
      <KeyboardAvoidingView>
        <Card>
          <ScrollView>
            <TextInput name="email" value={email} onChange={handleEmail} placeholder="Enter Your Email..." />
            <TextInput name="password" value={password} onChange={handlePassword} placeholder="Enter Your Password..." />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                  <Button
                    title={"Login"}
                    color={Colors.primary}
                    onPress={authHandler}
                  />
                )}
            </View>
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
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


// useEffect(() => {
//   if (error) {
//       Alert.alert('An Error Occured', error, [{ text: 'Okay' }])
//   }
// }, [error])