import React from "react";
import { Input, Container, Divider, Label } from "semantic-ui-react";
import RichTextMediaBlock from "./RichTextMediaBlock";

const TopicAndSubtopic = ({ topicAndSubtopicArray, updateArticleState }) => {
  return topicAndSubtopicArray.map((topicSubtopicData, topicSubtopicIndex) => {
    const { name, blockArray } = topicSubtopicData;
    return (
      <Container key={topicSubtopicIndex}>
        <Input value={name} />
        <RichTextMediaBlock
          topicAndSubtopicArray={topicAndSubtopicArray}
          updateArticleState={updateArticleState}
          blocksArray={blockArray}
        />
      </Container>
    );
  });

  // render() {
  //   return (
  //     <Container>
  //       <Input
  //         fluid
  //         label={
  //           <Label color="teal" pointing="right">
  //             Title
  //           </Label>
  //         }
  //         aria-label="Article Title Input Box"
  //         size="large"
  //         placeholder="Enter topic here"
  //         value={this.props.articleTitle}
  //         onChange={e => this.props.workingArticleTitle(e.target.value)}
  //       ></Input>
  //       <Divider hidden />
  //       <TextBlock
  //         value={this.props.id}
  //         updateInputText={this.props.blockContent}
  //       />
  //       <Divider hidden />
  //     </Container>
  //   );
  // }
};

export default TopicAndSubtopic;
