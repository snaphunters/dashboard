import React from "react";
import { Button, Menu } from "semantic-ui-react";
const HeaderBar = ({
  saveDraft,
  addSubtopicContainer,
  topicSubtopicIndex,
  returnToDash
}) => (
  <>
    <Menu
      data-testid="HeaderBar"
      inverted
      color="teal"
      fixed="top"
      borderless
      size="large"
    >
      <Menu.Item position="right">
        <Button onClick={saveDraft} aria-label="Save Button">
          Save as Draft
        </Button>
      </Menu.Item>
      <Menu.Item aria-label="return to dashboard">
        <Button onClick={returnToDash} aria-label="Return to Dashboard">
          Back to Dashboard
        </Button>
      </Menu.Item>
    </Menu>
  </>
);
export default HeaderBar;
