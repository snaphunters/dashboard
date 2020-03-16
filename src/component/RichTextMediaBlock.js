import { Container, Button, Segment, Divider } from "semantic-ui-react";
import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import Editor from "@enwee/ckeditor5-build-balloon-block";
import ckeditor5Config from "../utils/ckeditor5config";

const RichTextMediaBlock = ({
  isEditable,
  topicAndSubtopicArray,
  updateArticleState,
  blockArray,
  topicSubtopicIndex
}) => {
  const blockChange = (value, index) => {
    blockArray[index] = value;
    updateArticleState(topicAndSubtopicArray);
  };

  const addBlock = index => {
    blockArray.splice(index + 1, 0, "");
    updateArticleState(topicAndSubtopicArray);
  };

  const deleteBlock = index => {
    blockArray.splice(index, 1);
    updateArticleState(topicAndSubtopicArray);
  };

  return blockArray.map((CKString, blockArrayIndex) => {
    const firstElement = blockArrayIndex === 0;
    return (
      <Container key={blockArrayIndex}>
        <Divider hidden />
        <Segment aria-label={`CKEditorContainer ${blockArrayIndex} `}>
          <CKEditor
            editor={Editor}
            data={CKString}
            onChange={(event, editor) => {
              blockChange(editor.getData(), blockArrayIndex);
            }}
            config={ckeditor5Config}
            disabled={!isEditable}
          />
        </Segment>

        {isEditable && (
          <Container>
            <Button
              icon="plus circle"
              aria-label={`add topicSubtopic ${topicSubtopicIndex} block button ${blockArrayIndex}`}
              onClick={() => addBlock(blockArrayIndex)}
            />
            {!firstElement && (
              <Button
                icon="trash"
                aria-label={`delete topicSubtopic ${topicSubtopicIndex} block button ${blockArrayIndex}`}
                onClick={() => deleteBlock(blockArrayIndex)}
              />
            )}
          </Container>
        )}
      </Container>
    );
  });
};

export default RichTextMediaBlock;
