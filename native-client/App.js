import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LocationNavigator from "./navigation/LocationNavigator";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';
import authReducer from './store/reducers/auth'
import reportReducer from './store/reducers/report'

const rootReducer = combineReducers({
  auth: authReducer,
  report: reportReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <LocationNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
