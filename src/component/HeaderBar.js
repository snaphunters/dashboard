import React from "react";
import { Button, Menu, Divider } from "semantic-ui-react";
const HeaderBar = ({ saveDraft, addSubtopicContainer, topicSubtopicIndex }) => (
  <>
    <Menu inverted color="teal" fixed="top" borderless size="large">
      <Menu.Item position="right">
        <Button onClick={saveDraft} aria-label="Save Button">
          Save as Draft
        </Button>
      </Menu.Item>
    </Menu>
    <Divider hidden />
    <Divider hidden />
    <Divider hidden />
    <Divider hidden />
  </>
);

export default HeaderBar;
