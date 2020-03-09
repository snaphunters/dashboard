import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

const OnSaveTitleExistsErrorModal = ({
  saveTitleExistError,
  onHandleSaveTitleExistError
}) => {
  return (
    <Modal open={saveTitleExistError}>
      <Header content="Error: Saving existing article" />
      <Modal.Content>
        <h3>Your article might have the same title as an existing article.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={onHandleSaveTitleExistError}>
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
const OnSaveNoTitleErrorModal = ({ noTitleError, onHandleNoTitleError }) => {
  return (
    <Modal open={noTitleError}>
      <Header content="Error: No title available" />
      <Modal.Content>
        <h3>Title cannot be empty.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={onHandleNoTitleError}>
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export { OnSaveTitleExistsErrorModal, OnSaveNoTitleErrorModal };
