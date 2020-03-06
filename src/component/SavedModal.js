import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

const SavedModal = ({ isSaved, onHandleSave }) => {
  return (
    <Modal open={isSaved}>
      <Header content="Saved" />
      <Modal.Content>
        <p>Successfully saved!</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={onHandleSave}>
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SavedModal;
