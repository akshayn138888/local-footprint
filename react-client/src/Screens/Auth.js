import React, { useState } from "react";

const Auth = props => {
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
    props.history.push("/MapScreen");
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="text"
            onChange={handleChange}
            value={text1.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="text"
            onChange={handleChange}
            value={text1.password}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default Auth;
