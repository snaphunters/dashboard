import React from "react";
import { Input, Segment, Container, Divider, Button } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import RichTextMediaBlock from "./RichTextMediaBlock";

const TopicAndSubtopic = ({ topicAndSubtopicArray, updateArticleState }) => {
  const titleChange = (value, index) => {
    topicAndSubtopicArray[index].title = value;
    updateArticleState(topicAndSubtopicArray);
  };

  const addSubtopicContainer = index => {
    topicAndSubtopicArray.splice(index + 1, 0, {
      containerId: uuidv4(),
      title: "",
      blockArray: [""]
    });
    updateArticleState(topicAndSubtopicArray);
  };

  return topicAndSubtopicArray.map((topicSubtopicData, topicSubtopicIndex) => {
    const { title, blockArray, containerId } = topicSubtopicData;
    const displayLabel = topicSubtopicIndex ? "SUB-TOPIC" : "TOPIC";
    const ariaLabel = topicSubtopicIndex ? "Sub-Topic Title" : "Topic Title";
    const size = topicSubtopicIndex ? "huge" : "massive";
    return (
      <Container key={containerId}>
        <Divider hidden />
        <Segment aria-label="topicSubtopicContainer">
          <Input
            value={title}
            fluid
            placeholder="Enter a Title.."
            label={displayLabel}
            labelPosition="right"
            size={size}
            onChange={e => titleChange(e.target.value, topicSubtopicIndex)}
            aria-label={ariaLabel}
          />
          <RichTextMediaBlock
            topicAndSubtopicArray={topicAndSubtopicArray}
            updateArticleState={updateArticleState}
            blockArray={blockArray}
            topicSubtopicIndex={topicSubtopicIndex}
          />
        </Segment>
        <Button
          basic
          compact
          icon="plus circle"
          onClick={() => addSubtopicContainer(topicSubtopicIndex)}
          aria-label="Add subtopic container button"
        />
      </Container>
    );
  });
};

export default TopicAndSubtopic;
