import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Input,
  Container,
  Divider,
  Button,
  Header,
  Icon
} from "semantic-ui-react";
import TextBlock from "../component/TextBlock";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: "",
      blocks: {},
      blocksrendered: []
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
  };

  insertTextBlock = () => {
    const index = this.state.blocksrendered.length;
    const renderArr = this.state.blocksrendered;
    renderArr.push(
      <TextBlock
        key={index}
        updateInputText={this.updateInputText}
        index={index}
      />
    );
    this.setState({ blocksrendered: renderArr });
  };

  updateInputText = (index, value) => {
    const blockobj = this.state.blocks;
    blockobj[index] = { type: "text", inputText: value };
    this.setState({ blocks: blockobj });
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
            <Divider hidden />
            <Button icon onClick={this.insertTextBlock}>
              <Icon name="text cursor" />
            </Button>
          </Container>
          <Divider hidden />
        </Container>
        <Container textAlign="center">
          <div>{this.state.blocksrendered}</div>
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
