import { Container, Button, Segment, Divider } from "semantic-ui-react";
import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import Editor from "@enwee/ckeditor5-build-balloon-block";
import ckeditor5Config from "../utils/ckeditor5config";

const RichTextMediaBlock = ({
  topicAndSubtopicArray,
  updateArticleState,
  blocksArray,
  topicSubtopicIndex
}) => {
  const blockChange = (value, index) => {
    blocksArray[index] = value;
    updateArticleState(topicAndSubtopicArray);
  };

  const addBlock = index => {
    blocksArray.splice(index + 1, 0, "");
    updateArticleState(topicAndSubtopicArray);
  };

  return blocksArray.map((CKString, blockArrayIndex) => {
    return (
      <Container key={blockArrayIndex}>
        <Divider hidden />
        <Segment aria-label="CKEditorContainer">
          <CKEditor
            editor={Editor}
            data={CKString}
            onChange={(event, editor) => {
              /* istanbul ignore next line */
              blockChange(editor.getData(), blockArrayIndex);
            }}
            config={ckeditor5Config}
          />
        </Segment>
        <Button
          icon="plus circle"
          aria-label={`add topicSubtopic ${topicSubtopicIndex} block button ${blockArrayIndex}`}
          onClick={() => addBlock(blockArrayIndex)}
        />
      </Container>
    );
  });
};

export default RichTextMediaBlock;
