import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

const SavedModal = ({ isSaved, closeSave }) => {
  return (
    <Modal open={isSaved}>
      <Header content="Saved" />
      <Modal.Content>
        <p>Successfully saved!</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          aria-label="close save message"
          color="green"
          onClick={closeSave}
        >
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SavedModal;
