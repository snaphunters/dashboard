import React from "react";
import { Button, Menu } from "semantic-ui-react";
const HeaderBar = ({ saveDraft }) => (
  <Menu inverted color="teal" fixed="top" borderless size="large">
    <Menu.Item position="right">
      <Button onClick={saveDraft} aria-label="Save Button">
        Save as Draft
      </Button>
    </Menu.Item>
  </Menu>
);

export default HeaderBar;
