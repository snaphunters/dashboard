import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./Editor.css";
import { Input, Container, Divider, Segment, Button } from "semantic-ui-react";

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
      <div>
        <Divider hidden />

        <Container className="ArticleTitle">
          <Container textAlign="center" className="debugger">
            <h1>Editor</h1>
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
            <Button primary big>
              Add block here
            </Button>
          </Segment>
          <Divider hidden />
          <Segment placeholder>
            <Button primary big>
              Add block here
            </Button>
          </Segment>
          <Divider hidden />
        </Container>
      </div>
    );
  };
}

export default Editor;

{
  /* <Container text textAlign="left" className="border-light padding-sm">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repellendus neque quas in facilis rerum laboriosam officiis
              ducimus aut, deleniti quidem voluptatum, sunt architecto
              perferendis asperiores modi expedita voluptas nisi. Excepturi?
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repellendus neque quas in facilis rerum laboriosam officiis
              ducimus aut, deleniti quidem voluptatum, sunt architecto
              perferendis asperiores modi expedita voluptas nisi. Excepturi?
            </p>
          </Container> */
}
