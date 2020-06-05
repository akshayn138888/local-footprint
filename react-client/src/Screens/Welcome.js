import React from "react";
import { Link } from "react-router-dom";
const Welcome = props => {
  return (
    <div>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
    </div>
  );
};
export default Welcome;
