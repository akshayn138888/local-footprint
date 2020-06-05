import React from "react";
import { Link } from "react-router-dom";
const WelcomeScreen = props => {
  return (
    <div>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
    </div>
  );
};
export default WelcomeScreen;
