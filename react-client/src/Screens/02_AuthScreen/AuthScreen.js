import React, { useState } from "react";
import "./AuthScreen.scss";

const AuthScreen = props => {
  const [submitForm, setSubmitForm] = useState({});
  const [text1, setText1] = useState({ email: "", password: "" });
  function handleChange(evt) {
    const value = evt.target.value;
    setText1({
      ...text1,
      [evt.target.name]: value
    });
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmLsit70cUZ1cKjoXfx9UaQNjDAzjyHGE`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: text1.email,
          password: text1.password,
          returnSecureToken: true
        })
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Something Went Wrong");
    }
    const resData = await response.json();
    console.log(resData);
    console.log("logged in");
    props.history.push("/DashboardScreen");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw"
      }}
    >
      <div className="login-form">
        <div className="indent-a" />
        <div className="indent-b" />
        <div className="form-header">
          <div className="logo-wrapper">
            <img src="/02_Logo/OwlLogo.png" />
          </div>
          <h2>Welcome Back</h2>
          <h4>Please login to continue</h4>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="email"
            id="email"
            type="text"
            onChange={handleChange}
            value={text1.email}
            className="form-field"
            placeholder="Enter Email..."
          />
          <input
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
            value={text1.password}
            className="form-field"
            placeholder="Enter Password..."
          />
          <button className="form-submit">
            <strong>Login</strong>
          </button>
        </form>
        {/* <a href="#" className="forgot-link">
          Forgot Password?
    </a> */}
      </div>
    </div>
  );
};
export default AuthScreen;
