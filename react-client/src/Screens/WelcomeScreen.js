import React from "react";
import { Link } from "react-router-dom";
const WelcomeScreen = props => {
  return (
    <div>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
      <Link to="/IncidentMapScreen">
        <button>IncidentMapScreen</button>
      </Link>
      <Link to="/IncidentScreen">
        <button>IncidentScreen</button>
      </Link>
    </div>
  );
};
export default WelcomeScreen;
