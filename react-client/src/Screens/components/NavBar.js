import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";

const NavBar = props => {
  const [state, setState] = useState("home");
  const handleItemClick = (e, { name }) => setState({ activeItem: name });
  const { activeItem } = state;

  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          onClick={handleItemClick}
        />
      </Menu>
    </Segment>
  );
};

export default NavBar;
