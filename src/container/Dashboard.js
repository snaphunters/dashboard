import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./Dashboard.css";
import { Button, Container } from "semantic-ui-react";

class Dashboard extends React.Component {
  render = () => {
    const { createNewArticle } = this.props;
    return (
      <Container>
        <h1>Dashboard</h1>
        <Button onClick={createNewArticle}>+</Button>
      </Container>
    );
  };
}

export default Dashboard;
