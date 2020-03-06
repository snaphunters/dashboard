import React from "react";
import { Input, Container, Divider, Label } from "semantic-ui-react";
import TextBlock from "./TextBlock";

export default class ArticleTopic extends React.Component {
  render() {
    return (
      <Container>
        <Input
          fluid
          label={
            <Label color="teal" pointing="right">
              Title
            </Label>
          }
          aria-label="Article Title Input Box"
          size="large"
          placeholder="Enter topic here"
          value={this.props.articleTitle}
          onChange={e => this.props.workingArticleTitle(e.target.value)}
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
