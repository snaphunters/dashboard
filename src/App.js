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
      showEditor: false,
      articleTitle: ""
    };
  }
  createNewArticle = () => {
    this.setState({ showEditor: !this.state.showEditor });
  };
  returnToDashboard = () => {
    this.setState({
      showEditor: false,
      articleTitle: "",
      articleId: ""
    });
  };
  updateArticleTitle = e => {
    this.setState({
      articleTitle: e.target.textContent,
      showEditor: true
    });
  };
  updateArticleId = calledArticleId => {
    this.setState({
      articleId: calledArticleId
    });
  };

  render = () => {
    return (
      <Container>
        {this.state.showEditor ? (
          <Editor
            articleId={this.state.articleId}
            articleTitle={this.state.articleTitle}
            returnToDashboard={this.returnToDashboard}
            updateArticleId={this.updateArticleId}
          />
        ) : (
          <Dashboard
            createNewArticle={this.createNewArticle}
            editArticle={this.updateArticleTitle}
          />
        )}
      </Container>
    );
  };
}
export default App;
