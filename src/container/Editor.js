import React from "react";
import {
  Input,
  Container,
  Divider,
  Segment,
  Button,
  Header
} from "semantic-ui-react";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: ""
    };
  }

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
            ></Input>
          </Container>
          <Divider hidden />
        </Container>
        <Container textAlign="center">
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
        </Container>
      </Container>
    );
  };
}

export default Editor;
