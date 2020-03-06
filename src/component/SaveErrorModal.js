import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

const SavedErrorModal = ({ isSaveError, onHandleSaveError }) => {
  return (
    // <div> saved modellll {isSaved.toString()} </div>
    <Modal open={isSaveError}>
      <Header content="Save Error" />
      <Modal.Content>
        <p>
          Error!Your article might have the same title as an existing article no
          title available.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={onHandleSaveError}>
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SavedErrorModal;
