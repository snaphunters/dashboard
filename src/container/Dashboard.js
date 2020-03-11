import React from "react";
import { Button, Container, Header } from "semantic-ui-react";

class Dashboard extends React.Component {
  render = () => {
    const { createNewArticle } = this.props;
    return (
      <Container textAlign="center">
        <Header as="h1">Dashboard</Header>
        <Button
          onClick={createNewArticle}
          icon="plus circle"
          aria-label="Create New Article"
        ></Button>
      </Container>
    );
  };
}

export default Dashboard;
