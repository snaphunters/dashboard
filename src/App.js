import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Editor from "./container/Editor";
import Dashboard from "./container/Dashboard";

import { Container } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: false
    };
  }

  createNewArticle = () => {
    this.setState({ editor: !this.state.editor });
  };

  render = () => {
    return (
      <Container className="App">
        {this.state.editor ? (
          <Editor />
        ) : (
          <Dashboard createNewArticle={this.createNewArticle} />
        )}
      </Container>
    );
  };
}

export default App;
