import { Container, Button, Segment, Divider } from "semantic-ui-react";
import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";

const RichTextMediaBlock = ({
  topicAndSubtopicArray,
  updateArticleState,
  blocksArray
}) => {
  const blockChange = (value, index) => {
    blocksArray[index] = value;
    updateArticleState(topicAndSubtopicArray);
  }
  return blocksArray.map((CKString, blockArrayIndex) => {
    return (
      <Container key={blockArrayIndex}>
        <Divider hidden />
        <Segment aria-label="CKEditorContainer">
          <CKEditor
            editor={InlineEditor}
            data={CKString}
            onChange={(event, editor) => {
              blockChange(editor.getData(), blockArrayIndex);
            }}
          />
        </Segment>
        <Button icon="plus circle" />
      </Container>
    );
  });
};

export default RichTextMediaBlock;
