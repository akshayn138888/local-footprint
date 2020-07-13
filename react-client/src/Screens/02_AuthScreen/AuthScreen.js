import React, { useState } from "react";
import "./AuthScreen.scss";

const AuthScreen = props => {
  const [submitForm, setSubmitForm] = useState({});
  const [text1, setText1] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  function handleChange(evt) {
    const value = evt.target.value;
    setText1({
      ...text1,
      [evt.target.name]: value
    });
  }
  const handleSubmit = async e => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
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
      setError("Password or username are incorrect.");
    } else {
      const resData = await response.json();
      console.log(resData);
      console.log("logged in");
      props.history.push("/DashboardScreen");
    }
  };
  return (
    <>
      <div className="auth-div">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw"
          }}
        >
          <div className="login-form1">
            <div className="indent-a1" />
            <div className="indent-b1" />
            <div className="form-header1">
              <div className="logo-wrapper1">
                <img src="/02_Logo/OwlLogo.png" />
              </div>
              <h2 className="h2-1">Welcome Back</h2>
              {error ? (
                <h4
                  style={{ color: "red", fontWeight: "bold", margin: "0.5em" }}
                >
                  {" "}
                  {error}{" "}
                </h4>
              ) : (
                <h4 className="h4-1">Please login to continue</h4>
              )}
            </div>

            <form className="form1" onSubmit={handleSubmit}>
              <input
                name="email"
                id="email"
                type="text"
                onChange={handleChange}
                value={text1.email}
                className="form-field1"
                placeholder="Enter Email..."
              />
              <input
                name="password"
                id="password"
                type="password"
                onChange={handleChange}
                value={text1.password}
                className="form-field1"
                placeholder="Enter Password..."
              />
              <button className="form-submit1">
                <strong>Login</strong>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthScreen;
