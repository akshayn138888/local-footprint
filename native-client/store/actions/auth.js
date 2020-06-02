import { AsyncStorage } from "react-native";

export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";

let timer;
export const authenticate = (userId, token, expiryTime, email) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      email: email
    });
  };
};

export const login = (email, password) => {
  // console.log(1, email, password)
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoRutTZz1NSIYzdho2OIDoyDsa3zPYWnU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    if (!response.ok) {
      // console.log(response)
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong !";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found.";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid !";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
        resData.email
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      expirationDate,
      resData.email
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationDate => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate, email) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
      email: email
    })
  );
};
