import React from "react";
import { Input, Segment } from "semantic-ui-react";
import RichTextMediaBlock from "./RichTextMediaBlock";

const TopicAndSubtopic = ({ topicAndSubtopicArray, updateArticleState }) => {
  const titleChange = (value, index) => {
    topicAndSubtopicArray[index].title = value;
    updateArticleState(topicAndSubtopicArray);
  };

  return topicAndSubtopicArray.map((topicSubtopicData, topicSubtopicIndex) => {
    const { title, blockArray } = topicSubtopicData;
    const displayLabel = topicSubtopicIndex ? "SUB-TOPIC" : "TOPIC";
    const ariaLabel = topicSubtopicIndex ? "Sub-Topic Title" : "Topic Title";
    const size = topicSubtopicIndex ? "huge" : "massive";
    return (
      <Segment key={topicSubtopicIndex} aria-label="topicSubtopicContainer">
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
          blocksArray={blockArray}
          topicSubtopicIndex={topicSubtopicIndex}
        />
      </Segment>
    );
  });
};

export default TopicAndSubtopic;
