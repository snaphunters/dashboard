import { Container, Button } from "semantic-ui-react";
import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";

const RichTextMediaBlock = ({
  topicAndSubtopicArray,
  updateArticleState,
  blocksArray
}) => {
  return blocksArray.map((CKString, blockArrayIndex) => {
    return (
      <Container key={blockArrayIndex}>
        <CKEditor
          editor={InlineEditor}
          data={CKString}
          onChange={(event, editor) => {
            const data = editor.getData();
          }}
        />
        <Button icon="plus circle" />
      </Container>
    );
  });
};

export default RichTextMediaBlock;
