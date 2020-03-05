import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Divider, Button, Header, Icon } from "semantic-ui-react";
import TextBlock from "../component/TextBlock";
import { v4 as uuidv4 } from "uuid";
import TopicAndSubtopic from "../component/TopicAndSubtopic";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: "",
      blocks: {},
      blocksrendered: [],
      id: uuidv4(),
      blockContent: ""
    };
  }

  setArticleTitle = value => {
    this.setState({
      articleTitle: value
    });
  };

  setBlockContent = value => {
    this.setState({
      blockContent: value
    });
  };

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
    return (
      <Container>
        <Container>
          <Divider hidden />
          <Container textAlign="center">
            <Header as="h1">Editor</Header>
            <Container className="debugger">
              <TopicAndSubtopic
                id={this.state.id}
                blockContent={this.setBlockContent}
                workingArticleTitle={this.setArticleTitle}
              />
            </Container>
            <Button
              icon
              onClick={this.insertTextBlock}
              aria-label="Add Text Button"
            >
              <Icon name="text cursor" />
            </Button>
          </Container>
          <Divider hidden />
        </Container>
        <Container textAlign="center" aria-label="Main Article Container">
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
