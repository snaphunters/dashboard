import React from "react";
import { Input, Container, Divider } from "semantic-ui-react";
import TextBlock from "./TextBlock";

export default class ArticleTopic extends React.Component {
  render() {
    return (
      <Container>
        <Input
          size="large"
          placeholder="Enter topic here"
          value={this.props.articleTitle}
          onChange={e => this.props.workingArticleTitle(e.target.value)}
          aria-label="Article Title Input Box"
        ></Input>
        <Divider hidden />
        <TextBlock
          value={this.props.id}
          updateInputText={this.props.blockContent}
        />
        <Divider hidden />
      </Container>
    );
  }
}
