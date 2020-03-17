import React from "react";
import {
  Input,
  Segment,
  Container,
  Divider,
  Button,
  Header
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import RichTextMediaBlock from "./RichTextMediaBlock";

const TopicAndSubtopic = ({
  isEditable,
  topicAndSubtopicArray,
  updateArticleState
}) => {
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
  const deleteSubtopicContainer = index => {
    topicAndSubtopicArray.splice(index, 1);
    updateArticleState(topicAndSubtopicArray);
  };

  return topicAndSubtopicArray.map((topicSubtopicData, topicSubtopicIndex) => {
    const { title, blockArray, containerId } = topicSubtopicData;
    const displayLabel = topicSubtopicIndex ? "SUB-TOPIC" : "TOPIC";
    const ariaLabel = topicSubtopicIndex ? "Sub-Topic Title" : "Topic Title";
    const size = topicSubtopicIndex ? "big" : "massive";
    const firstElement = topicSubtopicIndex === 0;
    return (
      <Container key={containerId}>
        <Divider hidden />
        <Segment aria-label={`topicSubtopicContainer ${topicSubtopicIndex}`}>
          {isEditable ? (
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
          ) : (
            <Segment>
              <Header
                content={title}
                size={firstElement ? "large" : "medium"}
              />
            </Segment>
          )}
          <RichTextMediaBlock
            isEditable={isEditable}
            topicAndSubtopicArray={topicAndSubtopicArray}
            updateArticleState={updateArticleState}
            blockArray={blockArray}
            topicSubtopicIndex={topicSubtopicIndex}
          />
        </Segment>
        {isEditable && (
          <Container>
            <Button
              basic
              compact
              icon="plus circle"
              onClick={() => addSubtopicContainer(topicSubtopicIndex)}
              aria-label={`Add subtopic container button ${topicSubtopicIndex}`}
            />
            {!firstElement && (
              <Button
                basic
                compact
                icon="trash"
                onClick={() => deleteSubtopicContainer(topicSubtopicIndex)}
                aria-label={`Delete subtopic container button ${topicSubtopicIndex}`}
              />
            )}
          </Container>
        )}
      </Container>
    );
  });
};

export default TopicAndSubtopic;
