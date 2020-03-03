import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Input,
  Container,
  Divider,
  Segment,
  Button,
  Header
} from "semantic-ui-react";
import axios from "axios";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: ""
    };
  }
  publishArticle = async article => {
    const articleDetails = {
      title: this.state.title,
      categories: this.state.categories,
      subCategories: this.state.subCategories,
      blocks: this.state.blocks,
      published: this.state.published
    };
    const res = await axios.post(
      "https://snaphunt-demo-backend.herokuapp.com/articles",
      articleDetails
    );
    console.log(res);
  };

  render = () => {
    const { articleTitle } = this.state;
    return (
      <Container>
        <Container>
          <Divider hidden />
          <Container textAlign="center">
            <Header as="h1">Editor</Header>
            <Input
              label="Article Title: "
              size="large"
              placeholder="Enter title here"
              value={articleTitle}
              onChange={e => this.setState({ articleTitle: e.target.value })}
              aria-label="Article Title Input Box"
            ></Input>
          </Container>
          <Divider hidden />
        </Container>
        <Container textAlign="center" aria-label="Main Article Container">
          <Segment placeholder>
            This block is a placeholder for visualization
            <Button primary big="true">
              Add block here
            </Button>
          </Segment>
          <Divider hidden />
          <Segment placeholder>
            This block is a placeholder for visualization
            <Button primary big="true">
              Add block here
            </Button>
          </Segment>
          <Divider hidden />
          <Button onClick={article => this.publishArticle(article)}>
            Publish
          </Button>
        </Container>
      </Container>
    );
  };
}

export default Editor;
