import React from "react";
import { Input, Segment } from "semantic-ui-react";
import RichTextMediaBlock from "./RichTextMediaBlock";

const TopicAndSubtopic = ({ topicAndSubtopicArray, updateArticleState }) => {
  const nameChange = (value, index) => {
    topicAndSubtopicArray[index].name = value;
    updateArticleState(topicAndSubtopicArray);
  };

  return topicAndSubtopicArray.map((topicSubtopicData, topicSubtopicIndex) => {
    const { name, blockArray } = topicSubtopicData;
    const label = topicSubtopicIndex ? "SUB-TOPIC" : "TOPIC";
    const size = topicSubtopicIndex ? "huge" : "massive";
    return (
      <Segment key={topicSubtopicIndex}>
        <Input
          value={name}
          fluid
          placeholder="Enter a Title.."
          label={label}
          labelPosition="right"
          size={size}
          onChange={e => nameChange(e.target.value, topicSubtopicIndex)}
        />
        <RichTextMediaBlock
          topicAndSubtopicArray={topicAndSubtopicArray}
          updateArticleState={updateArticleState}
          blocksArray={blockArray}
        />
      </Segment>
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
