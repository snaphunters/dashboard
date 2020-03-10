import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

const ErrorModalDuplicateTitle = ({ showDuplicateTitleError, closeError }) => {
  return (
    <Modal open={showDuplicateTitleError}>
      <Header content="Error: Saving existing article" />
      <Modal.Content>
        <h3>Your article might have the same title as an existing article.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button
          aria-label="close error message"
          color="green"
          onClick={closeError}
        >
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
const ErrorModalNoTitle = ({ showNoTitleError, closeError }) => {
  return (
    <Modal open={showNoTitleError}>
      <Header content="Error: No title available" />
      <Modal.Content>
        <h3>Title cannot be empty.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button
          aria-label="close error message"
          color="green"
          onClick={closeError}
        >
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export { ErrorModalDuplicateTitle, ErrorModalNoTitle };
