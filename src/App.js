import React from "react";
import "semantic-ui-css/semantic.min.css";
import Editor from "./container/Editor";
import Dashboard from "./container/Dashboard";
import { Container } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: "",
      showEditor: false
    };
  }

  createNewArticle = () => {
    this.setState({ showEditor: !this.state.showEditor });
  };

  render = () => {
    return (
      <Container>
        {this.state.showEditor ? (
          <Editor articleId={this.state.articleId} />
        ) : (
          <Dashboard createNewArticle={this.createNewArticle} />
        )}
      </Container>
    );
  };
}

export default App;
