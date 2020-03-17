import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

const ErrorModalDuplicateTitle = ({ showDuplicateTitleError, closeError }) => {
  return (
    <Modal open={showDuplicateTitleError}>
      <Header content="Error: Saving existing article" />
      <Modal.Content>
        <h3>
          Topic title cannot be a duplicate of existing titles. Please change
          your title.
        </h3>
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
