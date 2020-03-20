import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

const SavedModal = ({ showSavedModal, closeSave }) => {
  return (
    <Modal open={showSavedModal}>
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

const PublishModal = ({ showPublishedModal, closePublish }) => {
  return (
    <Modal open={showPublishedModal}>
      <Header content="Published" />
      <Modal.Content>
        <p>Successfully published!</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          aria-label="close publish message"
          color="green"
          onClick={closePublish}
        >
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export { SavedModal, PublishModal };
