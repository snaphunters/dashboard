import React from "react";
import { Input, Container, Divider, Button, Icon } from "semantic-ui-react";
import RichTextMediaBlock from "./RichTextMediaBlock";

const AddCKBlockButton = () => {
  return (
    <Button icon onClick={this.insertBlock} aria-label="Add SubTopic Button">
      <Icon name="plus" />
    </Button>
  );
};

export default class ArticleTopic extends React.Component() {
  render = () => {
    const { blocks } = this.props();

    return (
      <Container className="debugger">
        <Input
          size="large"
          placeholder="Enter topic here"
          value={this.props.articleTitle}
          onChange={e => this.props.workingArticleTitle(e.target.value)}
          aria-label="Article Title Input Box"
        ></Input>
        <Divider hidden />
        <RichTextMediaBlock
          value={this.props.id}
          updateInputText={this.props.blockContent}
        />
        <Divider hidden />
      </Container>
    );
  };
}
