import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert, TextInput, Text } from "react-native";
import { useDispatch } from "react-redux"

import Colors from '../../constants/Colors'
import Card from '../../components/Card'

import * as authActions from '../../store/actions/auth'

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState()
  const dispatch = useDispatch()

  function handleChange(evt) {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value
    });
  }

  const authHandler = async () => {
    const actions = authActions.login(
      formData.email,
      formData.password
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

  return (
    <View>
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
            <TextInput name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email..." />
            <TextInput name="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password..." />
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