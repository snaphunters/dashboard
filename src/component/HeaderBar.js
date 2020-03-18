import React from "react";
import { Button, Menu, Container } from "semantic-ui-react";
const HeaderBar = ({
  isEditable,
  toggleEditable,
  saveDraft,
  publishTopic,
  addSubtopicContainer,
  topicSubtopicIndex,
  returnToDash,
  getTitle,
  openDeleteModal
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
      <Container>
        <Menu.Item position="left" aria-label="return to dashboard">
          <Button onClick={returnToDash} aria-label="Return to Dashboard">
            Back to Dashboard
          </Button>
        </Menu.Item>
      </Container>

      <Container>
        <Menu.Item>
          <Button
            content="Edit"
            toggle
            active={isEditable}
            onClick={() => toggleEditable(true)}
            aria-label="Edit Button"
          />
        </Menu.Item>
        <Menu.Item>
          <Button
            content="Preview"
            toggle
            active={!isEditable}
            onClick={() => toggleEditable(false)}
            aria-label="Preview Button"
          />
        </Menu.Item>
      </Container>

      <Container>
        <Menu.Item position="right">
          <Button toggle onClick={openDeleteModal} aria-label="Remove Article">
            Delete Article
          </Button>
        </Menu.Item>
        <Menu.Item position="right">
          <Button onClick={saveDraft} aria-label="Save Button">
            Save as Draft
          </Button>
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            onClick={publishTopic}
            aria-label="Publish Button"
            color="yellow"
          >
            Publish
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  </>
);
export default HeaderBar;
